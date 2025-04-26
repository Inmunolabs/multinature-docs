# 📊 Documentación del Endpoint de Dashboard

## 📌 Información General

- **Endpoint:** `/users/dashboard`
- **Método:** `GET`
- **Descripción:** Este endpoint proporciona datos agregados para alimentar el dashboard administrativo, incluyendo información sobre especialistas, usuarios, citas, órdenes, comisiones, productos y consumo de usuarios.

## 🔐 Autenticación

- Este endpoint requiere autenticación como administrador.

## 📤 Respuesta

```json
{
  "folio": "9f167269-c33e-4893-bfc2-b27da6cb8d94",
  "message": "Obtención de datos exitosa.",
  "content": {
    "Specialists": {
      "specialistsQuantity": 14,
      "specialistsBySpecialty": [
        {
          "name": "Entrenador",
          "total": 10
        },
        {
          "name": "Nutricionista",
          "total": 10
        }
      ],
      "specialistsPatients": [
        {
          "specialistId": "04e5e292-061c-40ab-9962-f92bdbc74a57",
          "name": "Erick Robles",
          "patientCount": 3
        },
        {
          "specialistId": "3be280e2-4354-4e4b-aa8d-acf94df12af8",
          "name": "001 Prueba Multinature",
          "patientCount": 2
        },
        {
          "specialistId": "58311178-ed1b-4074-8f53-fa3104ff8034",
          "name": "Ejemplo Prueba de update 2",
          "patientCount": 1
        },
        {
          "specialistId": "8f74e464-176c-4662-a2fc-c013da3be786",
          "name": "000 Prueba Multinature",
          "patientCount": 1
        },
        {
          "specialistId": "eb003fcf-fcf1-4da0-b003-35afd7198844",
          "name": "Samuel Prueba de update",
          "patientCount": 1
        }
      ],
      "activeSpecialists": 3
    },
    "Users": {
      "usersWithSpecialists": 7,
      "percentageUsersWithoutSpecialist": 87.1,
      "usersByProfile": {
        "Administrador General": 1,
        "Administrador de Productos": 0,
        "Administrador de Logística": 0,
        "Especialista": 14,
        "Usuario": 31
      }
    },
    "Bookings": {
      "currentPeriodBookings": 8,
      "specialistsBookingsQuantityAvg": 38,
      "mostBookingsSpecialists": [
        {
          "specialistId": "eb003fcf-fcf1-4da0-b003-35afd7198844",
          "total": 107
        },
        {
          "specialistId": "f0d8e32b-e4bb-4e08-ae48-6c9b96a3a98f",
          "total": 4
        },
        {
          "specialistId": "04e5e292-061c-40ab-9962-f92bdbc74a57",
          "total": 3
        }
      ]
    },
    "Trendings": {
      "usersGrowing": {
        "byYear": {
          "2025": {
            "monthly": [0, 1, 20, 10, 0, 0, 0, 0, 0, 0, 0, 0],
            "totals": 31
          }
        }
      },
      "specialistsGrowing": {
        "byYear": {
          "2025": {
            "monthly": [0, 2, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0],
            "totals": 14
          }
        }
      },
      "usersBookingsAverage": 38
    },
    "Orders": {
      "totalOrders": {
        "byYear": {
          "2025": {
            "monthly": [
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 7,
                "amount": 32858
              },
              {
                "count": 3,
                "amount": 14082
              },
              {
                "count": 4,
                "amount": 28223
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              }
            ],
            "totals": {
              "count": 14,
              "amount": 75163
            }
          }
        }
      },
      "ordersByStatus": {
        "Confirmando el Pago": 12,
        "Preparando el Pedido": 2,
        "Está en camino": 0,
        "Entregado": 0,
        "Cancelado": 0
      },
      "averageProductsPerOrder": {
        "byYear": {
          "2025": {
            "monthly": [0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            "totals": 6
          }
        }
      }
    },
    "Commissions": {
      "totalCommissions": {
        "byYear": {
          "2025": {
            "monthly": [
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              },
              {
                "count": 0,
                "amount": 0
              }
            ],
            "totals": {
              "count": 0,
              "amount": 0
            }
          }
        }
      },
      "commissionsByStatus": {
        "Confirmando comisión": 0,
        "Confirmando factura": 0,
        "Comisión liquidada": 0,
        "Pago pendiente": 0,
        "Comisión cancelada": 0
      },
      "averageAmountPerCommission": {
        "byYear": {
          "2025": {
            "monthly": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "totals": 0
          }
        }
      }
    },
    "Products": {
      "topProductsByRevenue": [
        {
          "productId": "6ce7ac2a-fe27-47cd-a696-8bdf1a9a1b3f",
          "product": "CREATINA MONOHIDRATADA",
          "revenue": 2945
        },
        {
          "productId": "5195f304-e1a3-4f6d-b2b6-92ea92c910d0",
          "product": "WHEY PROTEIN ISOLATE",
          "revenue": 1549
        }
      ],
      "topProductsByUnits": [
        {
          "productId": "6ce7ac2a-fe27-47cd-a696-8bdf1a9a1b3f",
          "product": "CREATINA MONOHIDRATADA",
          "unitsSold": 5
        },
        {
          "productId": "5195f304-e1a3-4f6d-b2b6-92ea92c910d0",
          "product": "WHEY PROTEIN ISOLATE",
          "unitsSold": 1
        }
      ],
      "lowSalesHighStockProducts": [
        {
          "id": "f4498a5a-3fb7-4cd2-af5a-4cb4fe30e0ad",
          "product": "Support Blend",
          "stock": 101,
          "sales": 0
        },
        {
          "id": "dfe1f481-9177-46a3-8f9e-98e407b668cb",
          "product": "Slim Complex",
          "stock": 100,
          "sales": 0
        },
        {
          "id": "87fd1bd7-7aed-489a-ba70-fd13a43197d9",
          "product": "Premium Omega-3",
          "stock": 100,
          "sales": 0
        },
        {
          "id": "eaae5914-43ae-4c6c-b50d-b2d19ecd62ec",
          "product": "Mind Rest",
          "stock": 100,
          "sales": 0
        },
        {
          "id": "f8856373-d735-4c72-a9fb-087d0019012d",
          "product": "Producto 4. Prueba Miguel",
          "stock": 100,
          "sales": 0
        }
      ]
    },
    "UserConsumption": {
      "topUsersByOrders": [
        {
          "userId": "eb003fcf-fcf1-4da0-b003-35afd7198844",
          "totalOrders": 11
        },
        {
          "userId": "f0d8e32b-e4bb-4e08-ae48-6c9b96a3a98f",
          "totalOrders": 3
        }
      ],
      "topUsersByCommissionAmount": [],
      "topUsersBySpending": [
        {
          "userId": "eb003fcf-fcf1-4da0-b003-35afd7198844",
          "totalSpent": 51634
        },
        {
          "userId": "f0d8e32b-e4bb-4e08-ae48-6c9b96a3a98f",
          "totalSpent": 23529
        }
      ],
      "topUsersByInteractions": [
        {
          "userId": "f0d8e32b-e4bb-4e08-ae48-6c9b96a3a98f",
          "name": "Samuel Usuario",
          "totalInteractions": 110
        },
        {
          "userId": "eb003fcf-fcf1-4da0-b003-35afd7198844",
          "name": "Samuel Prueba de update",
          "totalInteractions": 11
        },
        {
          "userId": "58311178-ed1b-4074-8f53-fa3104ff8034",
          "name": "Ejemplo Prueba de update 2",
          "totalInteractions": 4
        },
        {
          "userId": "8f74e464-176c-4662-a2fc-c013da3be786",
          "name": "000 Prueba Multinature",
          "totalInteractions": 3
        }
      ],
      "averageConsumptionPerUser": 1123.5
    },
    "cutOffDay": 28
  }
}
```

### 🧑‍⚕️ Specialists

Contiene información sobre los especialistas registrados en el sistema.

- `specialistsQuantity` (number): Total de especialistas registrados.
- `specialistsBySpecialty` (array): Distribución de especialistas por especialidad.
  - `name` (string): Nombre de la especialidad.
  - `total` (number): Cantidad de especialistas en esa especialidad.
- `specialistsPatients` (array): Número de pacientes asignados a cada especialista.
  - `specialistId` (string): ID del especialista.
  - `name` (string): Nombre del especialista.
  - `patientCount` (number): Cantidad de pacientes asignados.
- `activeSpecialists` (number): Cantidad de especialistas activos (con citas recientes).

### 👥 Users

Información sobre los usuarios y su relación con los especialistas.

- `usersWithSpecialists` (number): Total de usuarios con un especialista asignado.
- `percentageUsersWithoutSpecialist` (number): Porcentaje de usuarios sin especialista asignado.
- `usersByProfile` (object): Distribución de usuarios por tipo de rol.
  - Claves: "Administrador General", "Administrador de Productos", "Administrador de Logística", "Especialista", "Usuario".
  - Valores: Cantidad de usuarios por rol.

### 📅 Bookings

Datos relacionados con las citas agendadas.

- `currentPeriodBookings` (number): Total de citas agendadas en el periodo actual.
- `specialistsBookingsQuantityAvg` (number): Promedio de citas por especialista.
- `mostBookingsSpecialists` (array): Especialistas con más citas.
  - `specialistId` (string): ID del especialista.
  - `name` (string): ID del especialista.
  - `total` (number): Total de citas agendadas por el especialista.

### 📈 Trendings

Tendencias en el crecimiento de usuarios y especialistas, así como el promedio de citas por usuario.

- `usersGrowing` (object): Crecimiento de usuarios por año.
  - `byYear` (object): Datos agrupados por año.
    - `monthly` (array): Cantidad de nuevos usuarios por mes.
    - `totals` (number): Total de nuevos usuarios en el año.
- `specialistsGrowing` (object): Crecimiento de especialistas por año.
  - `byYear` (object): Datos agrupados por año.
    - `monthly` (array): Cantidad de nuevos especialistas por mes.
    - `totals` (number): Total de nuevos especialistas en el año.
- `usersBookingsAverage` (number): Promedio de citas por usuario.

### 🛒 Orders

Información sobre las órdenes realizadas en el sistema.

- `totalOrders` (object): Total de órdenes realizadas por año.
  - `byYear` (object): Datos agrupados por año.
    - `monthly` (array): Lista de objetos con `count` y `amount` por mes.
    - `totals` (object): Totales anuales de `count` y `amount`.
- `ordersByStatus` (object): Cantidad de órdenes por estado.
  - Claves: "Confirmando el Pago", "Preparando el Pedido", "Está en camino", "Entregado", "Cancelado" [estatus de las órdenes].
  - Valores: Cantidad de órdenes en cada estado.
- `averageProductsPerOrder` (object): Promedio de productos por orden por año.
  - `byYear` (object): Datos agrupados por año.
    - `monthly` (array): Promedio mensual de productos por orden.
    - `totals` (number): Promedio anual de productos por orden.

### 👛 Commissions

Datos relacionados con las comisiones generadas.

- `totalCommissions` (object): Total de comisiones por año.
  - `byYear` (object): Datos agrupados por año.
    - `monthly` (array): Lista de objetos con `count` y `amount` por mes.
    - `totals` (object): Totales anuales de `count` y `amount`.
- `commissionsByStatus` (object): Cantidad de comisiones por estado.
  - Claves posibles: "Confirmando comisión", "Confirmando factura", "Comisión liquidada", "Pago pendiente", "Comisión cancelada".
- `averageAmountPerCommission`: Este objeto muestra el promedio de monto por comisión agrupado por año.
  - `monthly`(object): Lista con 12 números que representan el promedio mensual de comisiones en cada mes del año.
  - `totals`(number): Promedio total de comisiones en el año correspondiente.

### 🛍️ Products

Información detallada de productos destacados o con bajo rendimiento.

- `topProductsByRevenue` (array): Lista de productos con mayor ingreso generado.
    - `productId` (string): ID del producto.
    - `product` (string): Nombre del producto.
    - `revenue` (number): Ingreso total generado.

- `topProductsByUnits` (array): Lista de productos más vendidos por número de unidades.
    - `productId` (string): ID del producto.
    - `product` (string): Nombre del producto.
    - `unitsSold` (number): Cantidad de unidades vendidas.

- `lowSalesHighStockProducts` (array): Productos con muchas existencias pero pocas ventas.
    - `id` (string): ID del producto.
    - `product` (string): Nombre del producto.
    - `stock` (number): Existencias actuales.
    - `sales` (number): Ventas realizadas.

---

## 👤 UserConsumption

Resumen de comportamiento y consumo de usuarios.

- `topUsersByOrders` (array): Usuarios con más órdenes realizadas.
    - `userId` (string): ID del usuario.
    - `name` (string): Nombre del usuario.
    - `totalOrders` (number): Total de órdenes realizadas.

- `topUsersBySpending` (array): Usuarios que más dinero han gastado.
    - `userId` (string): ID del usuario.
    - `name` (string): Nombre del usuario.
    - `totalSpent` (number): Total gastado por el usuario.

- `topUsersByCommissionAmount` (array): Usuarios con más comisiones generadas.
    - `userId` (string): ID del usuario.
    - `name` (string): Nombre del usuario.
    - `amount` (number): Total de comisiones generadas.

- `topUsersByInteractions` (array): Usuarios con más interacciones (citas y compras).
    - `userId` (string): ID del usuario.
    - `name` (string): Nombre del usuario.
    - `totalInteractions` (number): Total de interacciones realizadas.

- `averageConsumptionPerUser` (number): Promedio del gasto por usuario.

---

## 📅 cutOffDay

Día del mes en que se hace el corte de estadísticas.

- `cutOffDay` (number): Día del mes.