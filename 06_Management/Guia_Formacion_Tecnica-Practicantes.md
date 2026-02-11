# Guía de Formación Técnica para Practicantes

## Multinature -- Plan Base de Ingeniería

------------------------------------------------------------------------

# 1. Fundamentos Web -- HTTP / REST / Auth

## Entender

* Qué es HTTP y cómo funciona request/response.
* Métodos: GET, POST, PUT, PATCH, DELETE.
* Status codes comunes (200, 201, 204, 400, 401, 403, 404, 409, 422, 500).
* Headers importantes (Content-Type, Authorization, Accept).
* JSON como contrato.
* REST: recursos, idempotencia.
* JWT vs sesión.

## Preguntas (debe poder responder sin leer)

* ¿Qué diferencia hay entre PUT y PATCH?
* ¿Cuándo usarías 401 vs 403?
* ¿Qué significa que un endpoint sea idempotente?
* ¿Qué pasa si el backend cambia el shape de un JSON sin avisar?
* ¿Dónde viaja el JWT normalmente y por qué?

------------------------------------------------------------------------

# 2. Git y Colaboración

## Entender

* clone, status, add, commit, push, pull.
* Branches y flujo de PR.
* Conflictos y cómo resolverlos.
* Diferencia conceptual entre merge y rebase.
* .gitignore y manejo de secretos.

## Preguntas

* ¿Qué pasa si haces pull sin haber hecho commit?
* ¿Por qué no se debe subir un .env?
* ¿Qué problema resuelve un pull request?
* ¿Qué es un conflicto y por qué ocurre?
* ¿Cuándo preferirías rebase sobre merge?

------------------------------------------------------------------------

# 3. Terminal y Entorno

## Entender

* Navegación básica en terminal.
* Variables de entorno.
* Manejo de procesos/puertos.
* Uso básico de VS Code (Cursor) para debug.

## Preguntas

* ¿Cómo sabes qué proceso está ocupando un puerto?
* ¿Qué diferencia hay entre variable global y variable de entorno?
* ¿Por qué no debes hardcodear credenciales?

------------------------------------------------------------------------

# 4. JavaScript / TypeScript

## Entender

* Event loop y asincronía.
* async/await.
* Manejo de errores.
* Tipos básicos en TypeScript.

## Preguntas

* ¿Qué pasa si no manejas un error en una promesa?
* ¿Qué diferencia hay entre any y unknown?
* ¿Qué es el event loop en términos simples?
* ¿Por qué no deberías abusar de any?

------------------------------------------------------------------------

# 5. Node.js + Express

## Entender

* Estructura típica: routes/controllers/services.
* Middleware.
* Validación de inputs.
* Manejo correcto de errores async.
* Logging estructurado.

## Preguntas

* ¿Qué pasa si no validas un request body?
* ¿Qué hace un middleware?
* ¿Dónde debería vivir la lógica de negocio?
* ¿Por qué es mala práctica poner SQL en el controller?

------------------------------------------------------------------------

# 6. Bases de Datos (MySQL)

## Entender

* SELECT, JOIN, WHERE, GROUP BY.
* Índices (concepto).
* Transacciones (concepto).
* PK y FK.

## Preguntas

* ¿Qué problema resuelve una foreign key?
* ¿Qué pasa si haces un DELETE sin WHERE?
* ¿Qué es un índice y qué mejora?
* ¿Qué es una transacción?

------------------------------------------------------------------------

# 7. APIs y Herramientas

## Entender

* Uso de Bruno.
* Environments.
* Leer OpenAPI/Swagger.

## Preguntas

* ¿Cómo reproducirías un bug de API?
* ¿Qué información mínima necesitas para debuggear un request?

------------------------------------------------------------------------

# 8. Testing

## Entender

* Unit vs Integration.
* Qué testear y qué no.

## Preguntas

* ¿Qué diferencia hay entre test unitario e integración?
* ¿Qué es un edge case?
* ¿Qué es una regresión?

------------------------------------------------------------------------

# 9. Seguridad Básica

## Entender

* Sanitización.
* Manejo de secretos.
* CORS (concepto).

## Preguntas

* ¿Qué es una inyección SQL?
* ¿Por qué no debes loggear tokens?
* ¿Qué problema resuelve CORS?

------------------------------------------------------------------------

# 10. AWS (Alto Nivel)

## Entender

* Qué es Lambda.
* Qué es RDS.
* Concepto de IAM.
* Logs en CloudWatch.

## Preguntas

* ¿Qué es un cold start?
* ¿Por qué no debes abrir permisos IAM al mundo?
* ¿Qué pasa si una Lambda no cierra conexiones a DB?

------------------------------------------------------------------------

# 11. Frontend (React/Next)

## Entender

* Componentes.
* Hooks básicos.
* Fetch de datos.
* Manejo de loading/error.

## Preguntas

* ¿Qué es un estado en React?
* ¿Qué pasa si haces un fetch infinito?
* ¿Dónde debería manejarse el error de una API?

------------------------------------------------------------------------

# Cierre de cada módulo

Antes de cerrar cada punto debe:

1.  Responder correctamente las preguntas sin apoyo.
2.  Explicar el tema en voz alta como si enseñara a alguien más.
