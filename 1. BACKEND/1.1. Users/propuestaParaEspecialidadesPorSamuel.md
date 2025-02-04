# Propuesta para especialidades por Samuel

- Api general de recetario de especialistas (dietas o rutinas)
- Tipos de especialistas en base de datos
- "Receta" guardada en general para cualquier especialidad (con FK de especialidad)
- Los permisos solo quedarían en consumidor y especialista
- Tabla de relaciones de usuario y especialidad, cuando es especialista, se interpretan como especialidades, cuando es consumidor o afiliado, se interpretan como los especialistas que tienen
- Tabla de relaciones entre usuarios y especialistas, relación y atributo de la especialidad a la que se adquirió
- Para definir las cosas que se hacen por especialidad, tener un crud con las especialidades y lo que se necesite extra (como textos para google sheets, mensajes a los usuarios, etc...) tener una tabla para eso (o en la tabla donde se dan las ids de las especialidades)
- Tabla general de schedules
- Para lo que es routinesExercises y dietPortions, se me ocurren dos opciones:

1. Hacer una tabla para cada campo:

```SQL
CREATE TABLE scheduleDetails (
    id VARCHAR(36),
    scheduleId VARCHAR(36),
    attribute VARCHAR(50) NOT NULL,  'food', 'portion', 'exercise', 'repetitions', etc..
    value VARCHAR,

    FOREIGN KEY (scheduleId) REFERENCES schedules(id)
);
```

Este implica que por cada campo se haría un registro, por ejemplo en una dieta se hace un registro para comida y otro para porción.

1. Tabla unificada
   Una sola tabla, que pueda usarse como si fuera una db NOSQL y que tenga los campos normal de las Schedules, el tipo y los campos como JSON:

```SQL
CREATE TABLE schedules (
    id VARCHAR(36),
    type ENUM('diet', 'routine') NOT NULL,
    date DATE NOT NULL,
    timeDATE NOT NULL,
    campo1 VARCHAR(255),  -- Campos comunes
    campo2 VARCHAR(255),
    additional JSON,        -- Datos adicionales en formato JSON
);
```

Para este faltaría la lógica para saber los datos del JSON de forma automática sin hacer código.
