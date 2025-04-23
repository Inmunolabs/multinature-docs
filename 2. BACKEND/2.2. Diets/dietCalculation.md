# 📊 Documentación del Endpoint de Diet Calculation

## 📌 Información General

- **Endpoint:** `/diets/diet-calculations/:id`
- **Método:** `POST`
- **Descripción:** Este endpoint calcula el gasto energético total (GET) de un paciente utilizando diferentes fórmulas y parámetros proporcionados. El paciente debe tener previamente registrado su peso y estatura mediante un formulario.

## 🔐 Autenticación

- Este endpoint requiere autenticación de especialista.

## 📥 Parámetros de Entrada

### Path Parameters
- `id` (string): ID del paciente para el cual se realizará el cálculo.

### Body Parameters
- `formulas` (array): Lista de fórmulas a utilizar para el cálculo. Las fórmulas disponibles son:
  - `harrisBenedict`: Harris Benedict.
  - `IOM`: IOM.
  - `mifflinStJeor`: Mifflin-St Jeor.
  - `AGA`: AGA.
  - `FAO`: FAO/OMS.
  - `healthCanada`: Health Canada.
  - `cunningham`: Cunningham.
  - `cunninghamAdjusted`: Cunningham Adjusted.
  - `catchMcArdle`: Catch-McArdle Equation.
  - `catchMcArdleSpecific`: Catch-McArdle Equation Specific.
  - `owenGeneral`: Owen General.
  - `owenSpecific`: Owen Specific.
- `CAF` (number): Coeficiente de actividad física (CAF), que representa el nivel de actividad física del paciente.
- `ETA` (number): Efecto térmico de los alimentos (ETA), que es el porcentaje de calorías adicionales consumidas debido a la digestión y absorción de alimentos.
- `AF` (number): Actividad física (AF), que es el porcentaje de calorías adicionales consumidas debido a la actividad física.

## 📤 Respuesta

La respuesta incluye los resultados del cálculo energético total y los resultados individuales de cada fórmula utilizada.

### Respuesta Exitosa
```json
{
  "GET": 2157.32,
  "ETACalories": 172.59,
  "AFCalories": 258.88,
  "averageCalories": 1725.86,
  "formulaResults": [
    {
      "name": "Harris Benedict",
      "result": 1816.62
    },
    {
      "name": "Mifflin-St Jeor",
      "result": 1733.75
    },
    {
      "name": "Cunningham",
      "result": 1803.07
    },
    {
      "name": "AGA",
      "result": {
        "min": 1480,
        "max": 1850
      }
    },
    {
      "name": "Owen General",
      "result": 1610.84
    }
  ]
}