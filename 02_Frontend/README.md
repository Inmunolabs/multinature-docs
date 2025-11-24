# 02 Frontend

Documentación del frontend de Multinature, incluyendo stack tecnológico, estructura del proyecto, guías de desarrollo e integración con el backend.

---

## 📑 Secciones

## Archivos

---

## 🎨 Stack Tecnológico

- **Framework**: Next.js 13+ (App Router)
- **UI Library**: React 18+
- **Styling**: Material-UI (Materio Template)
- **State Management**: React Context API / Zustand
- **API Client**: Axios / Fetch API
- **Authentication**: JWT (tokens almacenados en localStorage)

---

## 🗂️ Estructura del Proyecto

```
frontend/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Rutas protegidas
│   ├── (auth)/            # Rutas de autenticación
│   └── api/               # API Routes (si aplica)
├── components/            # Componentes reutilizables
├── hooks/                 # Custom hooks
├── services/              # API calls
├── utils/                 # Utilidades
└── public/                # Assets estáticos
```

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start
```

---

## 🔗 Enlaces Útiles

### Recursos de Diseño

- [Template Materio](https://drive.google.com/drive/folders/1s18xBtu_Lr_UXC78rAHNnpBERNfTjTBR) - Template base del proyecto
- [Material-UI Documentation](https://mui.com/) - Documentación oficial de Material-UI

### Integración con Backend

- **API Base URL**: Ver `NEXT_PUBLIC_API_URL` en `.env.local`
- **Documentación de APIs**: [Backend APIs](../01_Backend/APIs/README.md)

---

## 📚 Guías Pendientes

> **Nota**: Esta sección está en desarrollo. Se agregarán guías detalladas sobre:
> - Estructura de componentes
> - Gestión de estado
> - Integración con APIs
> - Patrones de diseño
> - Testing

---

- **Última actualización:** 2025-11-24
- **Total de archivos:** 0
