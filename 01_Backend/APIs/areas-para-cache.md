# Áreas para Implementación de Caché en el Backend

## Resumen Ejecutivo

Este documento identifica las áreas del backend donde se puede implementar caché para mejorar el rendimiento, reducir la carga en la base de datos y optimizar las respuestas de las APIs modulares.

**NOTA: ES NECESARIO REVISAR CADA MÓDULO PARA VER SI ES NECESARIO / POSIBLE APLICAR EL CACHE**

---

## 1. Datos Estáticos y Semi-Estáticos (Alta Prioridad)

### 1.1 Constants API (`apis/constants-api`)
**Archivo:** `apis/constants-api/src/services/list.js`
- **Query:** `ConstantsQueries.list`
- **Frecuencia:** Muy alta (probablemente en cada carga de la aplicación)
- **Tipo de caché:** TTL largo (24-48 horas) o invalidación manual
- **Justificación:** Los valores de constantes raramente cambian y se consultan frecuentemente

### 1.2 Specialties y Subspecialties (`apis/users-api`)
**Archivos:**
- `apis/users-api/src/services/get.js` - `getAPISettings()`
- `layers/multi-mysql-layer/src/queries/specialties.js`
- `layers/multi-mysql-layer/src/queries/subspecialties.js`

**Queries:**
- `SpecialtiesQueries.list`
- `SubspecialtiesQueries.list`
- `SubspecialtiesQueries.getByIds`

**Frecuencia:** Alta (en cada carga de configuración de la app)
**Tipo de caché:** TTL medio (6-12 horas) con invalidación en updates
**Justificación:** Datos que cambian muy poco, consultados en múltiples endpoints

### 1.3 Foods y Equivalences Groups (`apis/diets-api`)
**Archivos:**
- `apis/diets-api/src/services/list.js` - `listEquivalencesGroup()`
- `apis/diets-api/src/services/list.js` - `listFoods()`
- `layers/multi-mysql-layer/src/queries/foods.js`

**Queries:**
- `FoodsQueries.getEquivalencesGroup`
- `DietsQueries.listFoodsBySpecialistId`
- `FoodsQueries.getEquivalencesByGroup`
- `FoodsQueries.getEquivalencesByFoods`

**Frecuencia:** Alta (consultas frecuentes en generación de dietas)
**Tipo de caché:** TTL medio (2-4 horas) con invalidación por especialista
**Justificación:** Catálogo de alimentos y equivalencias que cambia poco

### 1.4 Ingredients (`apis/diets-api`)
**Archivos:**
- `apis/diets-api/src/services/list.js` - `listIngredients()`, `listAllIngredients()`
- `layers/multi-mysql-layer/src/queries/ingredients.js`

**Queries:**
- `IngredientsQueries.getAllIngredients`
- `FoodsQueries.getAllIngredients`
- `IngredientsQueries.getAllIngredientsPaginated`
- `IngredientsQueries.countAllIngredients`

**Frecuencia:** Alta (búsquedas y listados frecuentes)
**Tipo de caché:** TTL medio (4-6 horas) con invalidación en updates
**Justificación:** Catálogo de ingredientes que cambia poco

### 1.5 Products (`apis/products-api`)
**Archivos:**
- `apis/products-api/src/services/list.js` - `getProducts()`
- `layers/multi-mysql-layer/src/queries/products.js`

**Queries:**
- `ProductsQueries.list`
- `ProductsQueries.getById`
- `ProductsQueries.getByIds`

**Frecuencia:** Alta (catálogo de productos consultado frecuentemente)
**Tipo de caché:** TTL corto (1-2 horas) con invalidación en updates
**Justificación:** Productos activos consultados en múltiples endpoints

### 1.6 Exercises, Equipments, Body Parts, Muscles (`apis/routines-api`)
**Archivos:**
- `apis/users-api/src/services/get.js` - `getAPISettings()`
- `apis/routines-api/src/services/list.js` - `listExercises2()`
- `layers/multi-mysql-layer/src/queries/exercises.js`

**Queries:**
- `ExercisesQueries.listEquipments`
- `ExercisesQueries.listBodyParts`
- `ExercisesQueries.listMuscles`
- `RoutinesQueries.listExercisesBySpecialistId`
- `Exercises2Queries.buildListExercises2Query`

**Frecuencia:** Alta (configuración y búsquedas de ejercicios)
**Tipo de caché:** TTL medio (6-12 horas) con invalidación en updates
**Justificación:** Catálogos de ejercicios que cambian poco

---

## 2. Consultas Complejas y Agregaciones (Alta Prioridad)

### 2.1 Dashboard (`apis/users-api`)
**Archivo:** `apis/users-api/src/services/dashboard.js`
**Query Layer:** `layers/multi-mysql-layer/src/queries/dashboard.js`

**Queries ejecutadas en paralelo (29 queries):**
- `DashboardQueries.specialistsQuantity`
- `DashboardQueries.specialistsBySpecialty`
- `DashboardQueries.specialistsPatients`
- `DashboardQueries.activeSpecialists`
- `DashboardQueries.usersQuantity`
- `DashboardQueries.usersWithSpecialists`
- `DashboardQueries.percentageUsersWithoutSpecialist`
- `DashboardQueries.usersByProfile`
- `DashboardQueries.currentPeriodBookings`
- `DashboardQueries.specialistsBookingsQuantityAvg`
- `DashboardQueries.mostBookingsSpecialists`
- `DashboardQueries.usersGrowing`
- `DashboardQueries.specialistsGrowing`
- `DashboardQueries.usersBookingsAverage`
- `DashboardQueries.totalOrders`
- `DashboardQueries.ordersByStatus`
- `DashboardQueries.averageProductsPerOrder`
- `DashboardQueries.totalCommissions`
- `DashboardQueries.commissionsByStatus`
- `DashboardQueries.averageAmountPerCommission`
- `DashboardQueries.topProductsByRevenue`
- `DashboardQueries.topProductsByUnits`
- `DashboardQueries.lowSalesHighStockProducts`
- `DashboardQueries.topUsersByOrders`
- `DashboardQueries.topUsersByCommissionAmount`
- `DashboardQueries.topUsersBySpending`
- `DashboardQueries.topUsersByInteractions`
- `DashboardQueries.averageConsumptionPerUser`

**Frecuencia:** Media-Alta (dashboard administrativo)
**Tipo de caché:** TTL corto (5-15 minutos) con invalidación por fecha/rango
**Justificación:** Consultas complejas con múltiples JOINs y agregaciones que consumen muchos recursos

### 2.2 API Settings (`apis/users-api`)
**Archivo:** `apis/users-api/src/services/get.js` - `getAPISettings()`

**Queries ejecutadas en paralelo:**
- `SpecialtiesQueries.list`
- `SubspecialtiesQueries.list`
- `FoodsQueries.getEquivalencesGroup`
- `ExercisesQueries.listEquipments`
- `ExercisesQueries.listBodyParts`
- `ExercisesQueries.listMuscles`

**Frecuencia:** Muy Alta (probablemente en cada carga inicial de la app)
**Tipo de caché:** TTL medio (1-2 horas) con invalidación en updates
**Justificación:** Endpoint crítico que combina múltiples catálogos estáticos

### 2.3 Today Info (`apis/users-api`)
**Archivo:** `apis/users-api/src/services/get.js` - `buildTodayInfo()`

**Queries ejecutadas en paralelo:**
- `DietsQueries.getTodayFoods`
- `RoutinesQueries.getLatestRoutinesByDate`
- `UserActionReplacementsQueries.getReplacementsByDay`
- `BookingsQueries.findByDateAndUser`
- `FormsQueries.getConceptsStats`
- `ActivitiesQueries.getActiveRoutineExercisesByRoutineIdAndWeekday`

**Frecuencia:** Muy Alta (probablemente en cada carga del dashboard del usuario)
**Tipo de caché:** TTL muy corto (1-5 minutos) con invalidación por usuario y fecha
**Justificación:** Endpoint crítico que se consulta frecuentemente, datos específicos por usuario y fecha

### 2.4 Patient Detail (`apis/users-api`)
**Archivo:** `apis/users-api/src/services/get.js` - `buildPatientDetail()`, `buildSummary()`

**Queries:**
- `UsersQueries.getUserInfo`
- `BookingsQueries.getNextBooking`
- `FormsQueries.getGraphablesPro`
- `UserSpecialistsQueries.existSpecialistUser`
- `DietsQueries.getDietSnapshotsAllByUser`
- `DietsQueries.getDietSnapshotsAllByUserBySpecialist`
- `RoutinesQueries.getRoutineSnapshotsAllByUser`
- `RoutinesQueries.getRoutineSnapshotsAllByUserBySpecialist`
- `UserActionReplacementsQueries.getReplacementsByDate`
- `BookingsQueries.getBookingsByDate`
- `BookingsQueries.getBookingsByDateBySpecialist`

**Frecuencia:** Alta (vista de detalle de paciente)
**Tipo de caché:** TTL corto (5-10 minutos) con invalidación por usuario y rango de fechas
**Justificación:** Consultas complejas con múltiples snapshots y filtros por fecha

---

## 3. Listados y Búsquedas Frecuentes (Media Prioridad)

### 3.1 List Users (`apis/users-api`)
**Archivo:** `apis/users-api/src/services/list.js` - `listUsers()`

**Queries:**
- `UsersQueries.list`
- `buildUserStatsContext()` (múltiples queries internas)

**Frecuencia:** Media-Alta (listados administrativos)
**Tipo de caché:** TTL corto (2-5 minutos) con invalidación por rango de fechas
**Justificación:** Listados con paginación que pueden beneficiarse de caché

### 3.2 List Specialists (`apis/users-api`)
**Archivo:** `apis/users-api/src/services/list.js` - `listSpecialist()`

**Queries:**
- `UsersSpecialtiesQueries.countSpecialists`
- `UsersSpecialtiesQueries.fetchSpecialistsData`
- `SpecialistReviewsQueries.getLastestSpecialistReviews`

**Frecuencia:** Alta (búsqueda y listado de especialistas)
**Tipo de caché:** TTL corto (5-10 minutos) con invalidación en updates
**Justificación:** Listado con reviews que se consulta frecuentemente

### 3.3 List Orders (`apis/orders-api`)
**Archivo:** `apis/orders-api/src/services/list.js`

**Queries:**
- `OrdersQueries.list`
- `OrdersQueries.count`
- `OrdersQueries.listByUserId`
- `OrdersQueries.countByUserId`

**Frecuencia:** Media-Alta (listados de pedidos)
**Tipo de caché:** TTL muy corto (1-3 minutos) con invalidación en updates
**Justificación:** Datos que cambian frecuentemente pero se consultan mucho

### 3.4 List Products Reviews (`apis/products-api`)
**Archivo:** `apis/products-api/src/services/list.js` - `listProductReviews()`

**Queries:**
- `ProductsReviewsQueries.countReviewsByProductId`
- `ProductsReviewsQueries.getTotalReviews`
- `ProductsReviewsQueries.getUserReview`
- `ProductsReviewsQueries.getReviewsByProductId`

**Frecuencia:** Alta (reviews de productos)
**Tipo de caché:** TTL corto (5-10 minutos) con invalidación en nuevos reviews
**Justificación:** Reviews consultadas frecuentemente, cambios moderados

### 3.5 List Menus (`apis/diets-api`)
**Archivo:** `apis/diets-api/src/services/list.js` - `listMenus()`

**Queries anidadas (N+1 problem potencial):**
- `MenusQueries.getWeeklyMenusByDietId`
- `MenusQueries.getEquivalencesByMealId` (por cada meal)
- `MenusQueries.getFoodById` (por cada dish)
- `MenusQueries.getIngredientById` (por cada dish)

**Frecuencia:** Alta (menús semanales de dietas)
**Tipo de caché:** TTL corto (10-15 minutos) con invalidación por dieta
**Justificación:** Consultas anidadas que pueden generar N+1, datos relativamente estables

---

## 4. Consultas por Usuario/Especialista (Media Prioridad)

### 4.1 User Get (`apis/users-api`)
**Archivo:** `apis/users-api/src/services/get.js` - `get()`

**Queries:**
- `userToDTO()` (múltiples queries internas)
- `getCutoffDate()`
- `getNumberOfPurchases()`

**Frecuencia:** Muy Alta (perfil de usuario)
**Tipo de caché:** TTL muy corto (1-2 minutos) con invalidación por usuario
**Justificación:** Datos del usuario que cambian poco pero se consultan mucho

### 4.2 Specialist Details (`apis/users-api`)
**Archivo:** `apis/users-api/src/services/get.js` - `getSpecialistDetails()`

**Queries:**
- `UsersSpecialtiesQueries.specialistDetails`
- `SpecialistReviewsQueries.getLastestSpecialistReviews`

**Frecuencia:** Alta (perfil de especialista)
**Tipo de caché:** TTL corto (5-10 minutos) con invalidación en updates
**Justificación:** Perfil consultado frecuentemente, reviews cambian moderadamente

### 4.3 Exercises by Specialist (`apis/routines-api`)
**Archivo:** `apis/routines-api/src/services/list.js` - `listExercisesBySpecialistId()`

**Queries:**
- `RoutinesQueries.listExercisesBySpecialistId`

**Frecuencia:** Media-Alta (ejercicios del especialista)
**Tipo de caché:** TTL medio (15-30 minutos) con invalidación por especialista
**Justificación:** Catálogo de ejercicios que cambia poco

---

## 5. Llamadas a APIs Externas (Media Prioridad)

### 5.1 OpenPay API (`apis/openpay-api`)
**Archivos:** Servicios de OpenPay
**Frecuencia:** Media (operaciones de pago)
**Tipo de caché:** TTL muy corto (30 segundos - 2 minutos) solo para consultas, NO para transacciones
**Justificación:** Reducir llamadas a APIs externas, pero NO cachear operaciones críticas

### 5.2 Wire4 API (`apis/payment-methods-api`)
**Archivo:** `apis/payment-methods-api/src/services/wire4.js`
**Frecuencia:** Baja-Media (webhooks y confirmaciones)
**Tipo de caché:** NO cachear (operaciones críticas)
**Justificación:** Webhooks y transacciones no deben cachearse

### 5.3 Integraciones Externas (`apis/integrations-api`)
**Archivo:** `apis/integrations-api/src/services/googleoauth.js`
**Frecuencia:** Baja (autenticación OAuth)
**Tipo de caché:** TTL corto (5-10 minutos) solo para tokens válidos
**Justificación:** Reducir llamadas de validación de tokens

---

## 6. Consultas con N+1 Problem (Alta Prioridad)

### 6.1 List Menus con Macros (`apis/diets-api`)
**Archivo:** `apis/diets-api/src/services/list.js` - `listMenus()`

**Problema identificado:**
- Loop anidado que ejecuta queries por cada meal y dish
- `MenusQueries.getEquivalencesByMealId` (por cada meal)
- `MenusQueries.getFoodById` (por cada dish tipo 'food')
- `MenusQueries.getIngredientById` (por cada dish tipo 'ingredient')

**Solución:** Caché de alimentos e ingredientes por ID
**Tipo de caché:** TTL medio (2-4 horas) con invalidación en updates
**Justificación:** Los mismos alimentos/ingredientes se consultan repetidamente

### 6.2 Specialist Reviews (`apis/users-api`)
**Archivo:** `apis/users-api/src/services/list.js` - `listSpecialistReviews()`

**Problema identificado:**
- `SubspecialtiesQueries.getByIds` ejecutado en loop para cada review

**Solución:** Caché de subspecialties por IDs
**Tipo de caché:** TTL medio (1-2 horas) con invalidación en updates
**Justificación:** Mismas subspecialties consultadas repetidamente

---

## 7. Recomendaciones de Implementación

### 7.1 Estrategia de Caché por Capa

#### Capa de Datos (Layer)
**Ubicación:** `layers/multi-mysql-layer`
- Implementar wrapper de caché en `mysql.connector.js` o crear módulo separado
- Cachear queries frecuentes a nivel de capa de datos
- Invalidación automática basada en TTL

#### Capa de Servicios (APIs)
**Ubicación:** Cada `apis/*-api/src/services/`
- Cachear resultados de funciones de servicio completas
- Invalidación más granular por dominio
- Cachear respuestas DTO completas cuando sea posible

### 7.2 Tecnología Recomendada

1. **ElastiCache (AWS)**
   - Si están en AWS, usar ElastiCache con Redis
   - Escalable y gestionado

### 7.3 Patrones de Caché

1. **Cache-Aside (Lazy Loading)**
   - Verificar caché antes de consultar BD
   - Si no existe, consultar BD y guardar en caché
   - Útil para la mayoría de casos

2. **Write-Through**
   - Escribir en BD y caché simultáneamente
   - Útil para datos que se actualizan frecuentemente

3. **Write-Behind (Write-Back)**
   - Escribir en caché primero, luego en BD
   - Útil para operaciones de alta frecuencia

### 7.4 Estrategia de Keys

**Formato recomendado:** `{api}:{domain}:{operation}:{params}`

Ejemplos:
- `constants:list:all`
- `specialties:list:all`
- `users:get:123`
- `diets:menu:456:2024-01-15`
- `dashboard:stats:2024-01:2024-01-31`

### 7.5 Invalidación

1. **TTL Automático:** Para datos que cambian poco
2. **Invalidación Manual:** En operaciones UPDATE/DELETE
3. **Invalidación por Tags:** Agrupar keys relacionadas
4. **Invalidación por Patrón:** Invalidar múltiples keys con wildcards

---

## 8. Priorización de Implementación

### Fase 1 (Impacto Alto, Esfuerzo Bajo)
1. Constants API
2. Specialties/Subspecialties
3. API Settings (combinación de catálogos)
4. Foods/Equivalences Groups

### Fase 2 (Impacto Alto, Esfuerzo Medio)
1. Dashboard (consultas complejas)
2. Today Info (endpoint crítico)
3. Products
4. Exercises/Equipments/BodyParts/Muscles

### Fase 3 (Impacto Medio, Esfuerzo Medio)
1. Ingredients
2. List Menus (resolver N+1)
3. Patient Detail
4. List Specialists

### Fase 4 (Impacto Medio, Esfuerzo Alto)
1. List Users
2. List Orders
3. Product Reviews
4. Specialist Reviews (resolver N+1)

### Fase 5 (Optimizaciones)
1. Llamadas a APIs externas
2. Caché por usuario/especialista
3. Invalidación avanzada

---

## 9. Métricas a Monitorear

1. **Hit Rate:** Porcentaje de requests servidos desde caché
2. **Miss Rate:** Porcentaje de requests que requieren BD
3. **Latency:** Tiempo de respuesta con/sin caché
4. **Database Load:** Reducción en queries a BD
5. **Cache Size:** Uso de memoria/almacenamiento
6. **Invalidation Rate:** Frecuencia de invalidaciones

---

## 10. Consideraciones Adicionales

### 10.1 Datos Sensibles
- NO cachear datos sensibles sin encriptación
- NO cachear tokens de autenticación por largos períodos
- Considerar caché encriptado para datos de usuarios

### 10.2 Consistencia
- Balancear entre consistencia y rendimiento
- Usar TTL apropiado según criticidad de datos
- Invalidar caché en operaciones críticas

### 10.3 Escalabilidad
- Usar caché distribuido (Redis) para múltiples instancias
- Considerar límites de memoria
- Implementar estrategias de eviction (LRU, LFU)

### 10.4 Testing
- Probar comportamiento con caché vacío
- Probar invalidación correcta
- Probar TTLs y expiración
- Probar bajo carga

---

## Conclusión

La implementación de caché en las áreas identificadas puede resultar en:
- **Reducción significativa** en carga de base de datos
- **Mejora en tiempos de respuesta** (especialmente en consultas complejas)
- **Mejor escalabilidad** del sistema
- **Reducción de costos** en infraestructura

Se recomienda implementar de forma incremental, comenzando con las áreas de mayor impacto y menor esfuerzo.
