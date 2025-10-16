# 📱 Documentación del Frontend - Multinature

**Última actualización**: 2025-10-16

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

## 🔗 Enlaces Útiles

### Recursos de Diseño

1. [Template Materio](https://drive.google.com/drive/folders/1s18xBtu_Lr_UXC78rAHNnpBERNfTjTBR) - Template base del proyecto
2. Material-UI Documentation - [https://mui.com/](https://mui.com/)

### Backend Integration

- API Base URL: Ver `NEXT_PUBLIC_API_URL` en `.env.local`
- Documentación de APIs: `../2. BACKEND/2.1-endpoints/`

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

## 📚 Guías Pendientes

> **Nota**: Esta sección está en desarrollo. Se agregarán guías detalladas sobre:
> - Estructura de componentes
> - Gestión de estado
> - Integración con APIs
> - Patrones de diseño
> - Testing

---

**Mantenido por**: Equipo Frontend - Multinature
