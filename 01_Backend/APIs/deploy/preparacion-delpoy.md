# Preparación de Deploy

## Pasos para hacer el deploy

### 1. Identificar el tipo de API

Para esto habrá que ver qué tipo de arquitectura maneja la API. La guía para cada caso es muy similar.

---

## API de ECS

Para esto se tuvo que haber tomado como base cualquier API que haya sido hecha con ECS (se identificarán generalmente con TypeScript, Bun y Dockerfile).

### Pasos para deploy de API ECS

1. **Revisar variables de entorno en GitHub Actions**
   - Ir a `Settings` → `Secrets and variables` → `Actions` → `New repository secret`
   - Revisar todas las variables de entorno necesarias

2. **Añadir variables necesarias**
   - Estando en los secretos, añadir todas las variables necesarias

3. **Verificar permisos en AWS IAM**
   - Corroborar que el usuario de deploy dev o deploy prod en AWS (revisar desde el IAM) tenga acceso al service de ECS
   - En los permisos `Policies` → `actions-prod` / `actions-dev`
   - Debe de quedar algo como:

```json
{
  "Effect": "Allow",
  "Action": [
    "ecs:UpdateService",
    "ecs:DescribeServices"
  ],
  "Resource": "arn:aws:ecs:us-east-1:559878150643:service/*nombre-del-cluster-en-ecs*/*nombre-del-service-en-ecs*"
}
```

4. **Configuración inicial en ECS**
   - En ECS no se puede hacer el auto deploy desde un principio, por lo que de momento hay que crear las cosas manualmente por primera vez
   - Para esto se tiene que acceder a AWS y buscar ECR

5. **Crear repositorio en ECR**
   - Crear el repositorio con la nueva imagen de la API respetando la estructura del nombre

6. **Crear servicio en ECS**
   - Entrar a ECS → Crear un nuevo cluster (verificar que esto sea necesario, posiblemente se puedan reutilizar los clusters) → Crear servicio con el express mode

7. **Configurar Express Mode**
   - Seleccionar la imagen y el tag correspondiente (hay que verificar que se esté siguiendo el tag, por defecto se sigue la id única de la imagen)
   - Seleccionar la VPC, el SG, las subnets (siempre elegir las públicas que están en cada subnet)
   - Configurar el CPU (por defecto está 1 CPU y 2GB de memoria, considerar usar 0.5 de CPU para ambientes de desarrollo)
   - Siempre dejar los recursos con tags de dev / prod cuando se pueda asignar

8. **Esperar a que se haga el deploy**

9. **Ajustar variables de entorno en GitHub Actions**
   - Ajustar las demás variables de entorno con el nuevo cluster y el nuevo service

---

## API de Lambda

### Pasos para deploy de API Lambda

1. **Actualizar archivos de serverless**
   - Actualizar los archivos de serverless de dev y prod del config deploy con las credenciales necesarias, nombre de stack y las layers que se requieran

2. **Actualizar variables de entorno**
   - Actualizar el repositorio con las variables de entorno que necesite el Workflow de deploy

3. **Hacer push**
   - Hacer push a master o dev

---

## Notas importantes

- Siempre antes de hacer un deploy a producción, actualizar primero la base de datos, después ir actualizando de una API en una API para asegurar que no fallen todas en casos de fallos en las layers en entornos de producción.