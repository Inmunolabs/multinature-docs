# POST /addresses/:id

Crea una nueva dirección para un usuario.

---

## Método, ruta y autorización
- **Método:** POST
- **Ruta:** `/addresses/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite crear una nueva dirección para un usuario. Si es la primera dirección del usuario, se marca automáticamente como dirección de envío (isShippingAddress = true). Las direcciones pueden ser residenciales o clínicas según el tipo de usuario.

---

## Parámetros de ruta
- `id` (obligatorio): UUID del usuario que tendrá la dirección.

---

## Body esperado (JSON)
```json
{
  "street": "Calle de Miguel",           // (obligatorio) Nombre de la calle
  "extNumber": "456",                    // (obligatorio) Número exterior
  "intNumber": "02",                     // (opcional) Número interior
  "neighborhood": "El Secreto",          // (obligatorio) Colonia
  "city": "Zapopan",                    // (obligatorio) Ciudad
  "federalEntity": "Jalisco",           // (obligatorio) Entidad federativa
  "zipCode": "45138",                   // (obligatorio) Código postal
  "country": "México",                  // (obligatorio) País
  "refer": "2da dirección ingresada"    // (opcional) Referencias
}
```

---

## Ejemplo de respuesta exitosa (201 Created)
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "street": "Calle de Miguel",
    "extNumber": "456",
    "intNumber": "02",
    "neighborhood": "El Secreto",
    "city": "Zapopan",
    "federalEntity": "Jalisco",
    "zipCode": "45138",
    "country": "México",
    "refer": "2da dirección ingresada",
    "isShippingAddress": true,
    "isClinic": false
  }
]
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 400    | Datos inválidos                | Faltan campos obligatorios            |
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 404    | Usuario no encontrado          | El ID del usuario no existe           |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **Primera dirección:** Si es la primera dirección del usuario, se marca automáticamente como dirección de envío.
- **Tipos:** Las direcciones pueden ser residenciales o clínicas según el perfil del usuario.
- **Validación:** Validar formato de código postal y campos obligatorios.
- **Colonias:** Usar el endpoint de colonias para autocompletar según código postal.
- **Envíos:** Las direcciones marcadas como `isShippingAddress` se usan para productos físicos.
- **Citas:** Las direcciones marcadas como `isClinic` se usan para citas presenciales. 