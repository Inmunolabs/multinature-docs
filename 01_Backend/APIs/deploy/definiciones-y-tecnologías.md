# Definiciones de Servicios

Esta guía contiene las definiciones de los servicios y tecnologías utilizadas en la arquitectura de las APIs de Multinature.

---

## Servicios de AWS

### API Gateway

API Gateway es un servicio de AWS que actúa como punto de entrada único para todas las solicitudes HTTP dirigidas a nuestras APIs. Funciona como intermediario entre los clientes y los servicios backend (Lambdas o contenedores ECS), gestionando el enrutamiento, autenticación, limitación de velocidad y transformación de solicitudes. En nuestra arquitectura, API Gateway recibe todas las peticiones HTTP y las redirige al servicio correspondiente (SOLO Lambda, no aplica para las APIs de ECS), y devuelve las respuestas al cliente.

### Lambda

Es una función que, en nuestra arquitectura ejecuta un servidor de express por medio del handler que recibe los eventos desde API Gateway. Esta lambda responde por medio de API Gateway solo por medio de las peticiones HTTP.

### Layer

Son librerías compartidas de todas las APIs, estas tienen instaladas las librerías comunes de todas las APIs, esto quiere decir que las librerías están en las layers, además de eso, una lambda tiene las dependencias que sean específicas de la API.

### Elastic Container Service (ECS)

Este es un servicio de AWS que permite crear contenedores con imágenes (generalmente creadas con docker). La manera en la que lo usamos en Multinature es con el servicio de Fargate, este lo que nos ayuda es que siempre haya disponible un escalado horizontal en el momento que se sature un contendor, nosotros definimos cuánto procesamiento y memoria tiene cada servidor, y nosotros NO gestionamos nada internamente al servidor, solo es la imagen generada ejecutándose.

El proceso de despliegue en ECS tarda aproximadamente 10 minutos. Durante este tiempo, ECS mantiene activo el contenedor con la versión anterior mientras despliega el nuevo contenedor con la nueva imagen. Esto garantiza que la API siga disponible sin interrupciones durante el proceso de actualización.

### Task Definition

Una Task Definition es un archivo JSON que describe uno o más contenedores que forman parte de una aplicación. En ECS, la Task Definition funciona como una plantilla que define cómo deben ejecutarse los contenedores, incluyendo: qué imagen Docker usar, cuántos recursos de CPU y memoria asignar, qué variables de entorno configurar, qué puertos exponer, y otras configuraciones de la aplicación. Cuando necesitamos actualizar variables de entorno, configuraciones o cambiar la imagen a usar, creamos una nueva revisión de la Task Definition, y ECS utiliza esta nueva revisión para desplegar los contenedores actualizados.

### Elastic Container Registry (ECR)

Es un repositorio de imágenes en donde tenemos las versiones de la API de la que hablemos, solo sirve como almacenamiento de imágenes.

---

## Tecnologías y Herramientas

### Docker

Docker es una plataforma de contenedores que permite empaquetar una aplicación junto con todas sus dependencias, librerías y configuración en un contenedor ligero y portable. En nuestra arquitectura, Docker se utiliza para crear imágenes de nuestras APIs que luego se ejecutan en ECS. Los archivos `Dockerfile` definen cómo se construyen estas imágenes, especificando el sistema operativo base, las dependencias necesarias y los comandos para ejecutar la aplicación.

### Imagen

Una imagen Docker es un paquete inmutable que contiene todo lo necesario para ejecutar una aplicación: código fuente, runtime, herramientas del sistema, librerías y configuraciones. Las imágenes son versionadas y almacenadas en ECR. Cada vez que desplegamos una nueva versión de una API, se crea una nueva imagen que puede ser utilizada por ECS para crear y ejecutar contenedores. Las imágenes permiten garantizar que la aplicación se ejecute de manera consistente en diferentes entornos, es decir, igual que en local.

### GitHub Actions

GitHub Actions es una plataforma de integración y despliegue continuo (CI/CD) que automatiza los procesos de construcción, prueba y despliegue de nuestras APIs. En nuestra arquitectura, utilizamos GitHub Actions para automatizar el despliegue a entorno de desarrollo cuando se realiza un push a la rama `develop`; y un despliegue a el entorno de producción cuando se aplica un push a la rama `master`.

#### Para APIs con ECS

Los workflows de GitHub Actions para APIs que se ejecutan en ECS realizan dos trabajos principales:

1. **Build and Push**: Construye la imagen Docker de la API, la etiqueta con la versión correspondiente y la sube al repositorio ECR. Este proceso incluye la configuración de credenciales de AWS, el login a ECR y el uso de Docker Buildx para construir y publicar la imagen.

2. **Update ECS**: Una vez que la imagen está disponible en ECR, actualiza el servicio ECS forzando un nuevo despliegue con la imagen más reciente, lo que permite que ECS descargue y ejecute la nueva versión de la API. Este proceso tarda aproximadamente 10 minutos, durante los cuales ECS mantiene activo el contenedor con la versión anterior mientras despliega el nuevo.

#### Para APIs con Lambda

Los workflows para APIs que utilizan Lambda realizan el proceso de construcción y despliegue del código directamente. Estos workflows:

1. Obtienen las versiones más recientes de las layers (multi-mysql-layer y multi-commons-layer) desde AWS Lambda.
2. Construyen el código de la API y ejecutan el despliegue utilizando Serverless Framework.
3. Pasan las versiones de las layers como parámetros al despliegue para asegurar que se utilicen las versiones correctas.

Los workflows pueden omitirse utilizando comandos especiales en los mensajes de commit (`#omit-deploy` para omitir el build y `#omit-update` para omitir la actualización del servicio).

---

## Problemas Comunes y Soluciones

Esta sección documenta problemas que se han encontrado durante el despliegue y mantenimiento de las APIs, junto con sus soluciones. De cualquier manera, siempre se recomienda hacer el proceso de despliegue de 1 o 2 APIs a la vez, esto permitirá que en caso de que llegue a fallar alguna layer o un tema compartido entre APIs, pueda ser solucionado con anticipación a las demás APIs en producción, provocando una caída parcial y no una caída total del problema.

#### Problema: Falta de credenciales

**Descripción**: Cuando el backend dice que falta una variable de entorno o alguna variable es undefined, sabiendo que esa variable se refiere a alguna librería de terceros.

**Solución**: Identificar la variable y agregarla al lugar correspondiente: si es una lamdba, en el serverless-prod.yaml (para prod) o serverless.yaml (para dev). Para el caso de ECS, se va a la parte de Amazon Elastic Container Service -> Task definitions -> default-multinature-diet-agent-cluster (para dev, revisar cuál es el de prod) -> Revision (La más actual o bien el número más alto) -> Containers. Después crear una nueva Task Definition, aquí se pone la nueva variable de entorno, en ese momento se empezará a desplegar el nuevo ECS.

**Ejemplo**:
```
A la librería de OPEN AI le falta el API Key o se cambió por uno nuevo, pero el ECS actualmente tiene uno viejo y la API dice que se superó el límite de consumo de la cuenta, para eso, se cambia la nueva credencial.
```

#### Problema: Query not found

**Descripción**: Cuando una API no tiene la versión más actualizada de la layer y no encuentra una tabla.

**Solución**: Si ya está desplegada la layer, actualizarla manualmente. Actualizar desde Lambda -> Functions -> multi-public-resources-dev-api -> Edit layers

#### Problema: Column / Table not found

**Descripción**: Cuando la base de datos en producción no tiene los cambios más recientes de dev y ya se desplegó.

**Solución**: Entrar con la VPN a la base de datos de producción por medio de la URL directa la URL está en Aurora and RDS -> Databases -> multi-prod. En la sección Connectivity & security -> Endpoint & port. Posteriormente actualizar manualmente los cambios que estén desde la hoja en donde se mencionan todos los cambios hechos a la base de datos. Actualizar a partir del último despliegue y dejar la nota de que se hizo el deploy hasta cierto archivo y cierta fecha.

---
