# [11] Users

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- [11012] Crear endpoint para que un especialista de de alta a un usuario

  Contexto: De momento esta funcionalidad solo incluye la creación de un nuevo usuario
  Tags: back
  Assignee: Samuel Reveles

- [11013] Revisar todos los endpoints del users-api

  Contexto: Asegurarse de que todos los endpoints del users-api funcionan. Si se encuentran errores agregarlos en los mensajes de esta tarea taggeando a @Miguel y corregirlos desde la rama con nombre de esta tarea
  Tags: back
  Assignee: Samuel Reveles

- [11014] Crear red de usuarios de prueba

  Contexto: Crear diferentes usuarios para "tejer" una red de usuarios con una estructura definida para diferentes pruebas.
  La red de usuarios debe ser tal cual como la de la [documentación]()
  Los usuarios deben ser creados con datos como los del 000@multi.com

  ```js
  {
    "email": "000@multi.com",
    "password": "12345678",
    "firstName": "000 Prueba",
    "lastName": "Multinature",
    ...
  }
  ```

  Tags: back
  Assignee: Erick Robles
