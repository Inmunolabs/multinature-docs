# Preguntas sobre dietocalculo de Nutrición

## Cálculo de masa magra (Masa libre de grasa)

1. ¿Las siguientes ecuaciones son correctas para estimar la masa magra?

   **Hombre:** `base = 79.5 − 0.24 × peso − 0.15 × edad`

   **Mujere:** `base = 69.8 − 0.26 × peso − 0.12 × edad`

   `Masa libre de grasa (kg) = (base × peso) / 73.2`

2. En caso contrario, ¿Es adecuado usar la ecuación de Hume para estimar Masa libre de grasa?

---

# Fórmulas de gasto energético

Queremos validar que las **fórmulas de gasto energético** que utilizamos son correctas desde el enfoque nutricional y clínico.

La intención es asegurar que:

- Las fórmulas sean las adecuadas según **tipo de población**
- Su implementación sea correcta (variables, unidades, rangos)
- No estemos mezclando enfoques que generen resultados inconsistentes

## Fórmulas para población general

### Harris-Benedict

**Hombre:** `GEB = 66.5 + (13.75 × peso kg) + (5 × talla cm) − (6.78 × edad)`

**Mujer:** `GEB = 655.1 + (9.56 × peso kg) + (5 × talla cm) − (6.78 × edad)`

### Institute of Medicine (IOM)

**Hombre y mujer:** `GEB = 247 − (2.637 × edad) + [401.5 × talla (m)] + [18.6 × peso (kg)]`

### Mifflin–St Jeor (de 19 a 78 años)

**Hombre:** `GEB = (10 × peso kg) + (6.25 × talla cm) − (5 × edad) + 5`

**Mujer:** `GEB = (10 × peso kg) + (6.25 × talla cm) − (5 × edad) + 61`

### American Gastroenterological Association (AGA)

La AGA sugiere rangos calóricos diarios en función del IMC:

| IMC   | kcal/día | Mínimo | Máximo |
| ----- | -------- | ------ | ------ |
| <15   | 35–40    | 1810   | 2068   |
| 16–19 | 30–35    | 1551   | 1810   |
| 20–29 | 20–25    | 1034   | 1293   |
| >30   | 15–20    | 776    | 1034   |

> Nota: Esta referencia **entrega directamente calorías recomendadas**, no parte de una fórmula de gasto basal.

### FAO / OMS

Resultados por grupos de edad:

**Hombres:**

- 18 a 29 años: `(15.3 × peso) + 679 → ~1470 kcal/día`
- 30 a 59 años: `(11.6 × peso) + 879 → ~1479 kcal/día`
- Mayores de 60: `(13.5 × peso) + 987 → ~1685 kcal/día`

**Mujeres:**

- 18 a 29 años: `(14.7 × peso) + 496 → ~1256 kcal/día`
- 30 a 59 años: `(8.7 × peso) + 829 → ~1279 kcal/día`
- Mayores de 60: `(10.5 × peso) + 596 → ~1139 kcal/día`

3. Estas fórmulas requieren posteriormente multiplicarse por factor de actividad o estrés. ¿Esto es correcto? y de ser así ¿Cómo se haría?

---

## Fórmulas orientadas a deportistas

### Health Canada

Hombres: `EER = 662 − (9.53 × edad) + PA × [15.91 × peso + 539.6 × altura]`
Mujeres: `EER = 354 − (6.91 × edad) + PA × [9.36 × peso + 726 × altura]`

4. ¿Es correcto que la fórmula de Health Canada para el Requerimiento Energético Estimado (EER) tenga dos ecuaciones distintas según el sexo?

### Cunningham

`GER = 500 + (22 × masa libre de grasa)`

### Cunningham ajustado (hombre y mujer)

`GER = (11.936 × peso) + (587.728 × talla) − (8.129 × edad) + (191.027 × sexo) + 29.279`

### Katch–McArdle

`GER = 370 + (21.6 × masa libre de grasa)`

5. ¿Esta fórmula es válida para ambos sexos?
6. ¿Existe o es válida la variación `GER= 483.264 + 22.771 × Masa libre de grasa (kg)`?

### Owen

**Hombre:** `GER = 879 + (10.2 × peso)`

**Mujer:** `GER = 795 + (7.18 × peso)`

7. Detectamos que en algunas fuentes solo aparece fórmula para un sexo. Queremos confirmar si esto es correcto o si existe la contraparte correspondiente.
8. ¿Esta es una fórmula general `GER = 290 + 22.3 × Masa libre de grasa (kg)`? ¿Existe?

---

9. ¿Agregarías o eliminarías alguna fórmula del listado?

---

10. ¿El factor calórico asociado a la meta del paciente (bajar, mantener o subir de peso) debe aplicarse multiplicando el Gasto Energético Total (GET) obtenido a partir de cualquiera de las fórmulas?
