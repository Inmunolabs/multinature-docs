# POST /users/login

Inicia sesión de un usuario con email y contraseña.

---

## Método, ruta y autorización
- **Método:** POST
- **Ruta:** `/users/login`
- **Autorización:** No requiere autenticación

---

## Explicación funcional
Permite a un usuario autenticarse en el sistema usando su email y contraseña. Si las credenciales son válidas, devuelve un token JWT válido por 30 días y la información del usuario. Si la cuenta no está verificada o el usuario no tiene ID de OpenPay, se devuelven errores específicos.

---

## Body esperado (JSON)
```json
{
  "email": "usuario@ejemplo.com",    // (obligatorio) Email del usuario
  "password": "contraseña123"        // (obligatorio) Contraseña del usuario
}
```

---

## Ejemplo de respuesta exitosa (200 OK)
```json
{
  "user": {
    "id": "uuid",
    "firstName": "Juan",
    "lastName": "Pérez",
    "phone": "+525512345678",
    "email": "usuario@ejemplo.com",
    "birthdate": "1990-01-01",
    "gender": "M",
    "profile": "Paciente",
    "openpayUserId": "openpay-user-id",
    "recommender": {
      "id": "uuid",
      "name": "María López",
      "email": "maria@ejemplo.com"
    },
    "specialists": {
      "Nutrición": [
        {
          "id": "uuid",
          "name": "Dra. Ana García",
          "email": "ana@ejemplo.com",
          "settings": {
            "chargeAdvancePayment": 250,
            "chargePerConsultation": 500,
            "monthlyCharge": 1000
          },
          "clinics": [
            {
              "id": "uuid",
              "street": "Av. Reforma 123",
              "city": "Guadalajara"
            }
          ],
          "reviews": [
            {
              "id": "uuid",
              "rating": 5,
              "review": "Excelente especialista",
              "urlImages": [],
              "subspecialtyIds": []
            }
          ]
        }
      ]
    },
    "specialties": ["Nutrición", "Fitness"],
    "subspecialties": ["Nutrición Deportiva"],
    "specialistSettings": {
      "chargeAdvancePayment": 0,
      "chargePerConsultation": 0,
      "monthlyCharge": 0
    },
    "antiquity": "2 meses",
    "hasPlan": false,
    "isValid": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 401    | Credenciales inválidas          | Email o contraseña incorrectos        |
| 404    | Usuario no encontrado           | El email no existe en el sistema      |
| 404    | No hay usuario OpenPay          | El usuario no tiene ID de OpenPay     |
| 428    | Cuenta no verificada            | La cuenta requiere verificación       |
| 500    | Error interno                   | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **Token JWT:** El token expira en 30 días, guardarlo de forma segura.
- **Verificación:** Si la cuenta no está verificada, mostrar mensaje para completar verificación.
- **OpenPay:** Los usuarios no-admin deben tener ID de OpenPay para poder hacer login.
- **Perfil:** Usar el campo `profile` para mostrar opciones específicas según el tipo de usuario.
- **Especialistas:** El campo `specialists` contiene los especialistas agrupados por especialidad.
- **Configuraciones:** Los especialistas tienen configuraciones de pago en `specialistSettings`.
- **Antigüedad:** Mostrar la antigüedad del usuario para funcionalidades de fidelización. 