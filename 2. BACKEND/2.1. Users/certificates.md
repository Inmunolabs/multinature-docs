### 📄 **Obtener certificados de un especialista**

**GET** `{{userFilesHost}}/user-files/certificates/{{userId}}`  
Obtiene los certificados del especialista identificado con `userId`.

**Parámetros de ruta**:
- `userId` (string, requerido): ID del especialista.

**Respuesta exitosa** (`200 OK`):
```json
{
  "folio": "666284ae-69b7-4152-92bd-38da55e1bfdc",
  "message": "Certificates fetched successfully",
  "content": {
    "certificatesDTO": [
      {
        "id": "24214d4d-ccd0-4615-8164-f74f03632921",
        "url": "https://specialist-certificates.s3.us-east-1.amazonaws.com/_ArchitectueSoftwareDescription_A01644024.pdf",
        "name": "_Architecture Software Description_A01644024 .pdf",
        "s3_key": "58311178-ed1b-4074-8f53-fa3104ff8034/_Architecture Software Description_A01644024     .pdf"
      }
    ]
  }
}
```

---

### ➕ **Crear un nuevo certificado para un especialista**

**POST** `{{userFilesHost}}/user-files/certificates/{{userId}}`  
Crea un nuevo certificado para el especialista con `userId`.

**Parámetros de ruta**:
- `userId` (string, requerido): ID del especialista.

**Body**:  
Debe incluir los datos del archivo a subir.
```json
{
  "userId": "eb003fcf-fcf1-4da0-b003-35afd7198844",
  "url": "https://specialist-certificates.s3.us-east-1.amazonaws.com/_ArchitectueSoftwareDescription_A01644024.pdf",
  "name": "_Architecture Software Description_A01644024 .pdf",
  "s3_key": "58311178-ed1b-4074-8f53-fa3104ff8034/_Architecture Software Description_A01644024     .pdf"
}
```

**Respuesta exitosa** (`200 OK`):
```json
{
  "folio": "666284ae-69b7-4152-92bd-38da55e1bfdc",
  "message": "Certificates fetched successfully",
  "content": {
    "certificatesDTO": [
      {
        "id": "24214d4d-ccd0-4615-8164-f74f03632921",
        "url": "https://specialist-certificates.s3.us-east-1.amazonaws.com/_ArchitectueSoftwareDescription_A01644024.pdf",
        "name": "_Architecture Software Description_A01644024 .pdf",
        "s3_key": "58311178-ed1b-4074-8f53-fa3104ff8034/_Architecture Software Description_A01644024     .pdf"
      }
    ]
  }
}
```

---

### ❌ **Eliminar un certificado por ID**

**DELETE** `{{userFilesHost}}/user-files/certificates/:id`  
Elimina un certificado específico por su `id`.

**Parámetros de ruta**:
- `id` (string, requerido): ID del certificado a eliminar.

**Respuesta exitosa** (`200 OK`):
```json
{
  "folio": "666284ae-69b7-4152-92bd-38da55e1bfdc",
  "message": "Certificates fetched successfully",
  "content": {
    "certificatesDTO": [
      {
        "id": "24214d4d-ccd0-4615-8164-f74f03632921",
        "url": "https://specialist-certificates.s3.us-east-1.amazonaws.com/_ArchitectueSoftwareDescription_A01644024.pdf",
        "name": "_Architecture Software Description_A01644024 .pdf",
        "s3_key": "58311178-ed1b-4074-8f53-fa3104ff8034/_Architecture Software Description_A01644024     .pdf"
      }
    ]
  }
}
```