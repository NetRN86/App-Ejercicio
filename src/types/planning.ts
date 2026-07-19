export type SessionId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type Weekday = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

export interface WeeklyPlanEntry {
  day: Weekday;
  sessionId: SessionId | null;
}
