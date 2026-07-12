# Modelo de dominio

Diagrama de clases UML (modelo de datos) en formato Mermaid. Incluye las
entidades ya implementadas en el MVP y las planeadas para las próximas
épicas (marcadas como `<<planned>>`).

```mermaid
classDiagram
    class Exercise {
        +string id
        +string name
        +ExerciseCategory category
        +Equipment equipment
        +Difficulty difficulty
        +number sets
        +string reps
        +number restSeconds
        +string[] instructions
        +string[] techniqueTips
        +string[] commonMistakes
        +string breathing
        +string[] safetyNotes
        +string easierVariation
        +string harderVariation
        +AnimationType animationType
        +string[] musclesWorked
        +string warning
    }

    class WarmupStep {
        +string id
        +string name
        +number seconds
        +string cue
    }

    class WorkoutSession {
        +string id
        +string name
        +string dayLabel
        +string estimatedMinutes
        +string[] exerciseIds
    }

    class CompletedSet {
        +string exerciseId
        +number setNumber
        +string repsTarget
        +string completedAt
    }

    class WorkoutLog {
        +string id
        +string date
        +string sessionId
        +string[] completedExercises
        +CompletedSet[] completedSets
        +number durationSeconds
        +number[] rests
        +number effort
        +string notes
    }

    class UserSettings {
        +string[] trainingDays
        +number restAdjustmentSeconds
        +boolean soundEnabled
        +boolean vibrationEnabled
        +string theme
        +string textSize
        +boolean showRecommendations
    }

    class ActiveWorkoutState {
        +string sessionId
        +number startedAt
        +number currentExerciseIndex
        +number currentSet
        +CompletedSet[] completedSets
        +string[] skippedExerciseIds
        +number[] rests
    }

    class MuscleGroup {
        <<planned>>
        +string id
        +string name
        +string description
    }

    class PracticeAttempt {
        <<planned>>
        +string id
        +string exerciseId
        +string date
        +number accuracyScore
        +string feedback
    }

    class Product {
        <<planned>>
        +string id
        +string name
        +string category
        +number price
        +string currency
        +string vendorUrl
        +boolean shipsToUserZone
    }

    WorkoutSession "1" --> "*" Exercise : incluye
    WorkoutLog "1" --> "*" CompletedSet : registra
    WorkoutLog --> WorkoutSession : pertenece a
    ActiveWorkoutState --> WorkoutSession : sesión activa
    ActiveWorkoutState --> CompletedSet : progreso parcial
    Exercise --> MuscleGroup : trabaja
    Exercise "1" --> "*" PracticeAttempt : se practica en
    Exercise "*" --> "*" Product : requiere equipo
```

## Notas

- `MuscleGroup` formaliza lo que hoy es solo el campo de texto
  `ExerciseCategory`, para poder cubrir más grupos musculares además de
  brazos (épica "Expandir a otros grupos musculares").
- `PracticeAttempt` respalda el modo de práctica interactivo tipo juego:
  guarda cada intento simulado y su retroalimentación (épica "Modo de
  práctica interactivo").
- `Product` respalda el perfilado de equipo recomendado con precio y envío
  (épica "Recomendación de productos").
