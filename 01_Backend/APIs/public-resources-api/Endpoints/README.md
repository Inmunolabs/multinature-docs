# API Public Resources

## Descripción general

La API de Public Resources gestiona recursos públicos del sistema que están disponibles para todos los usuarios autenticados. Estos recursos incluyen archivos, documentos, imágenes y otros contenidos que se muestran en diferentes páginas de la aplicación con un orden específico de visualización.

## Endpoints disponibles

### Recursos Públicos
- **[GET /public-resources](list.md)** - Listar todos los recursos públicos activos

## Reglas importantes del proyecto

### Autenticación y Autorización
- **Todos los endpoints** requieren token Bearer válido
- **Acceso público:** Una vez autenticado, cualquier usuario puede acceder a los recursos
- **Sin restricciones:** No hay validaciones de rol o permisos especiales

### Estructura de Recursos
- **Orden de visualización:** Los recursos se ordenan por `displayOrder` para controlar su presentación
- **Tipos de visualización:** Campo `displayType` para determinar cómo mostrar el recurso
- **Estado activo:** Solo se muestran recursos con `isActive = true`
- **Extensiones:** Campo `extension` para identificar el tipo de archivo
- **Páginas:** Campo `page` para asociar recursos a secciones específicas

### Consideraciones Técnicas
- **Base de datos:** Consulta directa a tabla `public_resources`
- **Filtrado:** Solo recursos activos (`is_active = true`)
- **Sin DTO:** Respuesta directa de la base de datos
- **Performance:** Consulta optimizada sin paginación

## Notas para el equipo frontend

### Campos clave para UI
- **`displayOrder`:** Para ordenar recursos en la interfaz
- **`displayType`:** Para determinar el componente de visualización
- **`page`:** Para filtrar recursos por sección específica
- **`extension`:** Para mostrar iconos o validar tipos de archivo
- **`url`:** Para acceder al contenido del recurso
- **`isActive`:** Para controlar visibilidad (siempre true en respuestas)

### Estados de autorización
- **Sin token:** No puede acceder a recursos
- **Con token:** Acceso completo a todos los recursos activos

### Manejo de errores
- **200:** Lista vacía si no hay recursos (con mensaje "Recurso público no encontrado")
- **401:** Token faltante o inválido
- **500:** Error del servidor

### Casos de uso
- **Páginas estáticas:** Recursos para secciones como "Acerca de", "Términos y condiciones"
- **Documentos legales:** Políticas de privacidad, términos de servicio
- **Contenido informativo:** Guías, manuales, recursos educativos
- **Imágenes públicas:** Logos, banners, iconos del sistema 