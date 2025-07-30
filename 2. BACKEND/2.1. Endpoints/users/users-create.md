# POST /users

Crea un nuevo usuario en el sistema.

---

## Método, ruta y autorización
- **Método:** POST
- **Ruta:** `/users`
- **Autorización:** No requiere autenticación

---

## Explicación funcional
Permite registrar un nuevo usuario en el sistema. El usuario se crea con perfil "Paciente" por defecto y se asigna a un recomendador. Se genera un código de verificación que se envía por email. El usuario OpenPay se crea hasta que se complete la verificación de la cuenta.

---

## Body esperado (JSON)
```json
{
  "email": "usuario@ejemplo.com",           // (obligatorio) Email del usuario
  "password": "contraseña123",              // (obligatorio) Contraseña del usuario
  "recommenderId": "uuid",                  // (obligatorio) ID del usuario que lo recomendó
  "birthdate": "1990-01-01",               // (obligatorio) Fecha de nacimiento
  "firstName": "Juan",                      // (obligatorio) Nombre del usuario
  "lastName": "Pérez",                     // (obligatorio) Apellido del usuario
  "gender": "Hombre"                       // (obligatorio) Género del usuario
}
```

---

## Ejemplo de respuesta exitosa (201 Created)
```json
{
  "id": "uuid",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "",
  "email": "usuario@ejemplo.com",
  "birthdate": "1990-01-01",
  "gender": "Hombre",
  "profile": "Paciente",
  "openpayUserId": "",
  "recommender": {
    "id": "uuid",
    "name": "María López",
    "email": "maria@ejemplo.com"
  },
  "specialists": {},
  "specialties": [],
  "subspecialties": [],
  "specialistSettings": {
    "chargeAdvancePayment": 0,
    "chargePerConsultation": 0,
    "monthlyCharge": 0
  },
  "antiquity": "0 meses",
  "hasPlan": false,
  "isValid": false
}
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 400    | Datos inválidos                | Faltan campos obligatorios            |
| 400    | Email ya existe                | El email ya está registrado           |
| 404    | Recomendador no encontrado     | El ID del recomendador no existe      |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **Verificación:** El usuario se crea pero requiere verificación por email.
- **Recomendador:** Es obligatorio especificar un usuario que lo recomendó.
- **Perfil:** Por defecto se crea como "Paciente".
- **OpenPay:** El ID de OpenPay se crea después de la verificación.
- **Validación:** El campo `isValid` será `false` hasta completar la verificación.
- **Email:** Se envía un código de verificación al email registrado. 