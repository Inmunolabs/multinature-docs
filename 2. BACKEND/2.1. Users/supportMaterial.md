
# 📁 Endpoints - Support Material

## 🔍 GET `/user-files/support-material/:id`

**Descripción:**  
Obtiene los materiales de apoyo del especialista con el ID proporcionado. Solo pueden acceder el propio especialista, administradores o pacientes del especialista.

**Parámetros de ruta:**  
- `:id` → ID del especialista (UUID)

**Respuesta Exitosa (200 OK):**
```json
{
  "folio": "06d5c148-a028-4f61-b0ca-b1641b52dfe0",
  "message": "Support Material fetched successfully",
  "content": {
    "supportMaterials": [
      {
        "id": "65167d90-eaa1-482f-aab8-d2ecd1b5f293",
        "specialist_id": "eb003fcf-fcf1-4da0-b003-35afd7198844",
        "name": "M6 Session 2 - React_ Fetching & Managing Data (Rodrigo).pdf",
        "notes": "This is a practice tests",
        "url": "https://us-east-1.console.aws.amazon.com/s3/object/specialist-support-materials?region=us-east-1&bucketType=general&prefix=M6+Session+2+-+React_+Fetching+%26+Managing+Data+%28Rodrigo%29.pdf",
        "s3_key": "58311178-ed1b-4074-8f53-fa3104ff8034/_Architecture Software Description_A01644024     .pdf"
      }
    ]
  }
}
```

---

## 🆕 POST `/user-files/support-material/:id`

**Descripción:**  
Crea un nuevo material de apoyo para el especialista con el ID proporcionado.

**Parámetros de ruta:**  
- `:id` → ID del especialista (UUID)

**Respuesta Exitosa (200 OK):**  
_Misma estructura de respuesta que el endpoint GET_

---

## ❌ DELETE `/user-files/support-material/:id`

**Descripción:**  
Elimina el material de apoyo con el ID proporcionado.

**Parámetros de ruta:**  
- `:id` → ID del material de apoyo a eliminar (UUID)

**Respuesta Exitosa (200 OK):**  
_Misma estructura de respuesta que el endpoint GET_
