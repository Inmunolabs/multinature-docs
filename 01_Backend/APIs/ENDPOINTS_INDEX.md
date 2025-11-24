# Índice de Endpoints - Multinature Backend

Índice centralizado de todos los endpoints de todas las APIs del backend de Multinature.

---

## 📋 APIs Disponibles

- [addresses-api](#addresses-api)
- [bookings-api](#bookings-api)
- [cart-api](#cart-api)
- [chatbot](#chatbot)
- [commissions-api](#commissions-api)
- [constants-api](#constants-api)
- [diets-api](#diets-api)
- [forms-api](#forms-api)
- [monthly-purchases-api](#monthly-purchases-api)
- [notifications-api](#notifications-api)
- [orders-api](#orders-api)
- [payment-methods-api](#payment-methods-api)
- [products-api](#products-api)
- [public-resources-api](#public-resources-api)
- [routines-api](#routines-api)
- [specialists-api](#specialists-api)
- [users-api](#users-api)

---

## addresses-api

**Documentación completa:** [addresses-api/README.md](./addresses-api/README.md)

### Endpoints

- [POST /addresses/:id](./addresses-api/Endpoints/create.md)
- [DELETE /addresses/:id](./addresses-api/Endpoints/delete.md)
- [GET /addresses/:id](./addresses-api/Endpoints/get.md)
- [GET /addresses/user/:id](./addresses-api/Endpoints/list-by-user.md)
- [GET /addresses/neighborhoods/:zipCode](./addresses-api/Endpoints/neighborhoods.md)
- [PATCH /addresses/shippingAddress/:id](./addresses-api/Endpoints/shipping-update.md) // TODO Cambiar url ("/addresses/shippingAddress/:id" => "/addresses/shipping-address/:id")
- [PATCH /addresses/:id](./addresses-api/Endpoints/update.md)

---

## bookings-api

**Documentación completa:** [bookings-api/README.md](./bookings-api/README.md)

### Endpoints

- [DELETE /monthly-services/](./bookings-api/Endpoints/cancel-monthly.md)
- [POST /bookings](./bookings-api/Endpoints/create.md)
- [DELETE /bookings/:id](./bookings-api/Endpoints/delete.md)
- [GET /bookings/user/:userId](./bookings-api/Endpoints/get-by-user-id.md)
- [GET /bookings/:id](./bookings-api/Endpoints/get.md)
- [GET /](./bookings-api/Endpoints/healthcheck.md)
- [POST /bookings/liquidate/:id](./bookings-api/Endpoints/liquidate.md)
- [POST /monthly-services/](./bookings-api/Endpoints/pay-monthly.md)
- [POST (WEBHOOK) /service-payment/confirm](./bookings-api/Endpoints/service-payment-confirm.md)
- [PATCH /bookings/:id](./bookings-api/Endpoints/update.md)

### Subsecciones

- [working-hours](./bookings-api/Endpoints/working-hours/README.md)

---

## cart-api

**Documentación completa:** [cart-api/README.md](./cart-api/README.md)

### Endpoints

- [GET /cart/:id](./cart-api/Endpoints/get.md)
- [GET /](./cart-api/Endpoints/healthcheck.md)
- [PATCH /cart/:id](./cart-api/Endpoints/update.md)

### Subsecciones

- [recommendations](./cart-api/Endpoints/recommendations/README.md)

---

## chatbot

**Documentación completa:** [chatbot/README.md](./chatbot/README.md)

### Archivos

- [Chatbot Context](./chatbot/chatbotContext.md)

---

## commissions-api

**Documentación completa:** [commissions-api/README.md](./commissions-api/README.md)

### Endpoints

- [GET /](./commissions-api/Endpoints/healthcheck.md)
- [POST /commissions/liquidate](./commissions-api/Endpoints/liquidate.md)
- [GET /commissions/user/:id](./commissions-api/Endpoints/list-by-user.md)
- [GET /commissions](./commissions-api/Endpoints/list.md)

---

## constants-api

**Documentación completa:** [constants-api/README.md](./constants-api/README.md)

### Endpoints

- [GET /](./constants-api/Endpoints/healthcheck.md)
- [GET /constants](./constants-api/Endpoints/list.md)
- [PATCH /constants/:constantId](./constants-api/Endpoints/update.md)

---

## diets-api

**Documentación completa:** [diets-api/README.md](./diets-api/README.md)

### Endpoints

- [POST /diets/diet-calculations/:id](./diets-api/Endpoints/diet-calculations.md)
- [POST /diets/recommend-formulas - Recomendar Fórmulas](./diets-api/Endpoints/recommend-formulas.md)
- [GET /diets/equivalences/group](./diets-api/Endpoints/equivalences-group.md)
- [GET /diets/foods](./diets-api/Endpoints/foods.md)
- [POST /diets/generate-automatic - Generar Dieta Automática](./diets-api/Endpoints/generate-automatic.md)
- [GET /diets/:id](./diets-api/Endpoints/get.md)
- [GET /](./diets-api/Endpoints/healthcheck.md)
- [GET /diets/ingredients/:id](./diets-api/Endpoints/ingredients-by-food.md)
- [GET /diets/ingredients/](./diets-api/Endpoints/ingredients.md)
- [GET /diets/specialist/:id](./diets-api/Endpoints/list-by-specialist.md)
- [GET /diets/user/:id](./diets-api/Endpoints/list-by-user.md)

### Subsecciones

- [menus](./diets-api/Endpoints/menus/README.md)
- [smae](./diets-api/Endpoints/smae/README.md) // TODO Completar la documentación de los endpoints de SMAE

---

## forms-api

**Documentación completa:** [forms-api/README.md](./forms-api/README.md)

### Endpoints

- [PUT /forms/fill](./forms-api/Endpoints/form-fill.md)
- [GET /](./forms-api/Endpoints/healthcheck.md)
- [GET /forms/:id](./forms-api/Endpoints/patient-forms-list.md)

### Subsecciones

- [concepts](./forms-api/Endpoints/concepts/README.md)
- [templates](./forms-api/Endpoints/templates/README.md)

---

## monthly-purchases-api

**Documentación completa:** [monthly-purchases-api/README.md](./monthly-purchases-api/README.md)

### Endpoints

- [DELETE /monthly-purchase/cancel/:id](./monthly-purchases-api/Endpoints/cancel.md)
- [GET /monthly-purchase/:id](./monthly-purchases-api/Endpoints/get-by-user-id.md)
- [GET /](./monthly-purchases-api/Endpoints/healthcheck.md)
- [PATCH /monthly-purchase/shipping-address/:id](./monthly-purchases-api/Endpoints/update-shipping-address.md)
- [PATCH /monthly-purchase](./monthly-purchases-api/Endpoints/upsert.md)

---

## notifications-api

**Documentación completa:** [notifications-api/README.md](./notifications-api/README.md)

### Endpoints

- [POST /notifications](./notifications-api/Endpoints/create.md)
- [GET /notifications/:id](./notifications-api/Endpoints/get-by-user-id.md)
- [GET /](./notifications-api/Endpoints/healthcheck.md)
- [PATCH /notifications/:id/read](./notifications-api/Endpoints/mark-as-read.md)

---

## orders-api

**Documentación completa:** [orders-api/README.md](./orders-api/README.md)

### Endpoints

- [PATCH /orders/cancel/:id](./orders-api/Endpoints/cancel.md)
- [DELETE /orders/cleanup](./orders-api/Endpoints/cleanup.md)
- [POST /confirm/mercado-pago](./orders-api/Endpoints/confirm-payment-mercadopago.md)
- [POST /confirm](./orders-api/Endpoints/confirm-payment-openpay.md)
- [POST /orders/:id](./orders-api/Endpoints/create.md)
- [DELETE /orders/:id](./orders-api/Endpoints/delete.md)
- [GET /orders/:id](./orders-api/Endpoints/get-by-id.md)
- [GET /](./orders-api/Endpoints/healthcheck.md)
- [GET /orders/user/:id](./orders-api/Endpoints/list-by-user-id.md)
- [GET /orders](./orders-api/Endpoints/list.md)
- [GET /orders/logistics](./orders-api/Endpoints/logistics.md)
- [PATCH /orders/process-commissions/:openpayId](./orders-api/Endpoints/process-commissions.md)
- [PATCH /orders/:id](./orders-api/Endpoints/update.md)

---

## payment-methods-api

**Documentación completa:** [payment-methods-api/README.md](./payment-methods-api/README.md)

### Endpoints

- [POST /payment-methods/:id](./payment-methods-api/Endpoints/create.md)
- [DELETE /payment-methods/:id](./payment-methods-api/Endpoints/delete.md)
- [GET /payment-methods/:id](./payment-methods-api/Endpoints/get-by-id.md)
- [GET /](./payment-methods-api/Endpoints/healthcheck.md)
- [GET /payment-methods/user/:id](./payment-methods-api/Endpoints/list-by-user-id.md)
- [PATCH /payment-methods/shippingPayment/:id](./payment-methods-api/Endpoints/update-shipping-payment.md)
- [PATCH /payment-methods/:id](./payment-methods-api/Endpoints/update.md)

---

## products-api

**Documentación completa:** [products-api/README.md](./products-api/README.md)

### Endpoints

- [POST /products](./products-api/Endpoints/create.md)
- [DELETE /products/:id](./products-api/Endpoints/delete.md)
- [GET /products/:id](./products-api/Endpoints/get-by-id.md)
- [GET /](./products-api/Endpoints/healthcheck.md)
- [GET /products](./products-api/Endpoints/list.md)
- [GET /products/s3Upload](./products-api/Endpoints/s3-upload.md)
- [PATCH /products/:id](./products-api/Endpoints/update.md)

### Subsecciones

- [reviews](./products-api/Endpoints/reviews/README.md)

---

## public-resources-api

**Documentación completa:** [public-resources-api/README.md](./public-resources-api/README.md)

### Endpoints

- [GET /](./public-resources-api/Endpoints/healthcheck.md)
- [GET /public-resources](./public-resources-api/Endpoints/list.md)

---

## routines-api

**Documentación completa:** [routines-api/README.md](./routines-api/README.md)

### Endpoints

- [GET /routines/:id](./routines-api/Endpoints/get-by-id.md)
- [GET /routines/specialist/:id](./routines-api/Endpoints/get-by-specialist-id.md)
- [GET /routines/user/:id](./routines-api/Endpoints/get-by-user-id.md)
- [GET /routines/:id](./routines-api/Endpoints/get.md)
- [GET /](./routines-api/Endpoints/healthcheck.md)
- [POST /routines](./routines-api/Endpoints/upsert.md)

### Subsecciones

- [exercises](./routines-api/Endpoints/exercises/README.md)

---

## specialists-api

**Documentación completa:** [specialists-api/README.md](./specialists-api/README.md)

### Endpoints

- [GET /specialists/:id](./specialists-api/Endpoints/get-by-id.md)
- [GET /specialists/patients/:id/summary/age](./specialists-api/Endpoints/get-patients-summary-age.md)
- [GET /specialists/patients/:id/summary/antiquity](./specialists-api/Endpoints/get-patients-summary-antiquity.md)
- [GET /specialists/patients/:id/summary/consultation](./specialists-api/Endpoints/get-patients-summary-consultation.md)
- [GET /specialists/patients/:id/summary/date](./specialists-api/Endpoints/get-patients-summary-date.md)
- [GET /specialists/patients/:id/summary/gender](./specialists-api/Endpoints/get-patients-summary-gender.md)
- [GET /specialists/patients/:id/summary/month](./specialists-api/Endpoints/get-patients-summary-month.md)
- [GET /specialists/patients/:id/summary/plan](./specialists-api/Endpoints/get-patients-summary-plan.md)
- [GET /specialists/patients/:id/summary/quarter](./specialists-api/Endpoints/get-patients-summary-quarter.md)
- [GET /specialists/patients/:id/summary/range](./specialists-api/Endpoints/get-patients-summary-range.md)
- [GET /specialists/patients/:id/summary/specialty-date](./specialists-api/Endpoints/get-patients-summary-specialty-date.md)
- [GET /specialists/patients/:id/summary/specialty-subspecialty](./specialists-api/Endpoints/get-patients-summary-specialty-subspecialty.md)
- [GET /specialists/patients/:id/summary/specialty](./specialists-api/Endpoints/get-patients-summary-specialty.md)
- [GET /specialists/patients/:id/summary/status](./specialists-api/Endpoints/get-patients-summary-status.md)
- [GET /specialists/patients/:id/summary/subspecialty](./specialists-api/Endpoints/get-patients-summary-subspecialty.md)
- [GET /specialists/patients/:id/summary/today](./specialists-api/Endpoints/get-patients-summary-today.md)
- [GET /specialists/patients/:id/summary/week](./specialists-api/Endpoints/get-patients-summary-week.md)
- [GET /specialists/patients/:id/summary/year](./specialists-api/Endpoints/get-patients-summary-year.md)
- [GET /specialists/patients/:id/summary](./specialists-api/Endpoints/get-patients-summary.md)
- [GET /specialists/patients/:id](./specialists-api/Endpoints/get-patients.md)
- [GET /specialists/settings/:id](./specialists-api/Endpoints/get-settings.md)
- [PATCH /specialists/:id](./specialists-api/Endpoints/update.md)
- [POST /specialists/settings](./specialists-api/Endpoints/upsert-settings.md)

---

## users-api

**Documentación completa:** [users-api/README.md](./users-api/README.md)

### Endpoints

- [GET /api/config](./users-api/Endpoints/api-config.md)
- [POST /specialists/patient](./users-api/Endpoints/create-patient.md)
- [POST /](./users-api/Endpoints/create.md)
- [GET /dashboard](./users-api/Endpoints/dashboard.md)
- [GET /data-user](./users-api/Endpoints/data-user.md)
- [DELETE /:id](./users-api/Endpoints/delete.md)
- [GET /:id](./users-api/Endpoints/get-by-id.md)
- [GET /](./users-api/Endpoints/healthcheck.md)
- [GET /specialists](./users-api/Endpoints/list-specialists.md)
- [GET /](./users-api/Endpoints/list.md)
- [POST /login](./users-api/Endpoints/login.md)
- [PATCH /:id](./users-api/Endpoints/update.md)
- [POST /verification-code](./users-api/Endpoints/verification-code.md)
- [GET /verify-account](./users-api/Endpoints/verify-account.md)

### Subsecciones

- [specialists](./users-api/Endpoints/specialists/README.md)
- [summary](./users-api/Endpoints/summary/README.md)
- [teamworks](./users-api/Endpoints/teamworks/README.md)

---

## 📊 Estadísticas

- **Total de APIs:** 17
- **Total de endpoints:** 150+
- **Última actualización:** 2025-11-24

---

## 🔗 Ver También

- [README.md](./README.md) - Documentación completa de todas las APIs
- [Convenciones de Documentación](./CONVENTIONS.md) - Reglas para documentar endpoints
- [Guía de Diseño de Rutas REST](./ROUTES_GUIDE.md) - Convenciones para diseño de rutas

