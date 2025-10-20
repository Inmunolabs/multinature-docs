# Funcionalidad de Compra Mensual

## Vista general

Esta sección permite al usuario **actualizar su compra mensual** mediante la selección de productos y posterior ejecución de una de las siguientes acciones: **Guardar**, **Pagar**, o **Pagar con compra recurrente**.

### Elementos interactivos relevantes

- `GUARDAR`: Botón que permite almacenar la selección de productos sin procesar ningún pago.
- `PAGAR`: Botón que inicia el flujo de pago.
- `Hacer compra recurrente`: Checkbox que indica si se desea activar una domiciliación mensual.

---

## Comportamiento funcional de la interfaz

### 1. Guardar (sin pagar)

- El usuario puede presionar el botón **GUARDAR**, con o sin el checkbox de **Hacer compra recurrente** seleccionado.
- Al hacerlo:
  - Se almacena la selección de artículos como una **compra mensual preconfigurada**, similar a un carrito.
  - **No se realiza ningún cobro ni se genera una orden de compra**.
  - **No se crea ninguna suscripción en Openpay**.

### 2. Pagar (sin compra recurrente)

- Si el usuario presiona **PAGAR** y **NO selecciona** el checkbox de compra recurrente:

  - Se realiza una compra **única**.
  - Se consulta el endpoint del backend para **crear una orden de compra**:

    ```
    POST {{ordersHost}}/orders/{{userId}}
    ```

  - No se crea plan de pagos ni suscripción en Openpay.

### 3. Pagar con compra recurrente

- Si el usuario selecciona el checkbox de **Hacer compra recurrente** y luego presiona **PAGAR**:
  - Se guarda la configuración como una **compra mensual recurrente**.
  - El backend debe:
    - Crear el **primer pedido inmediato**.
    - Crear un **plan y una suscripción en Openpay** para futuras domiciliaciones automáticas.

---

## Ejecución mensual automatizada

- Cada mes, cuando Openpay realice el cobro automático:
  - El backend debe estar suscrito al webhook correspondiente o contar con una tarea programada.
  - Al detectarse el cobro:
    - Crear una nueva orden basada en la compra mensual recurrente del usuario.
    - Registrar la orden con sus artículos, dirección y estatus.

---

## Consideraciones adicionales

- Es importante validar que el método de pago seleccionado soporte domiciliaciones.
- Se debe permitir al usuario editar o cancelar su compra recurrente desde su perfil.
- El backend debe manejar correctamente los errores en la creación de suscripciones para evitar cargos sin órdenes registradas.
