import type { WorkoutLog } from '../types';
import type { SessionId, Weekday, WeeklyPlanEntry } from '../types/planning';

export const WEEKDAY_ORDER: Weekday[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const VALID_SESSION_IDS: SessionId[] = ['A', 'B', 'C', 'D', 'E', 'F'];

export const DEFAULT_WEEKLY_PLAN: WeeklyPlanEntry[] = [
  { day: 'Lunes', sessionId: 'E' },
  { day: 'Martes', sessionId: 'A' },
  { day: 'Miércoles', sessionId: 'F' },
  { day: 'Jueves', sessionId: null },
  { day: 'Viernes', sessionId: 'B' },
  { day: 'Sábado', sessionId: 'C' },
  { day: 'Domingo', sessionId: 'D' },
];

function isValidSessionId(value: unknown): value is SessionId {
  return typeof value === 'string' && VALID_SESSION_IDS.includes(value as SessionId);
}

function isWeekday(value: unknown): value is Weekday {
  return typeof value === 'string' && WEEKDAY_ORDER.includes(value as Weekday);
}

export function getDefaultWeeklyPlan() {
  return DEFAULT_WEEKLY_PLAN.map((entry) => ({ ...entry }));
}

export function normalizeWeeklyPlan(value: unknown): WeeklyPlanEntry[] {
  const fallback = new Map<Weekday, SessionId | null>(getDefaultWeeklyPlan().map((entry) => [entry.day, entry.sessionId]));

  if (Array.isArray(value)) {
    value.forEach((entry) => {
      if (!entry || typeof entry !== 'object') return;
      const candidate = entry as Record<string, unknown>;
      if (!isWeekday(candidate.day)) return;
      fallback.set(candidate.day, isValidSessionId(candidate.sessionId) ? candidate.sessionId : null);
    });
  }

  return WEEKDAY_ORDER.map((day) => ({ day, sessionId: fallback.get(day) ?? null }));
}

export function getWeekdayFromDate(date: Date): Weekday {
  const map = [6, 0, 1, 2, 3, 4, 5];
  return WEEKDAY_ORDER[map[date.getDay()]];
}

export function getWeekdayShortLabel(day: Weekday) {
  return day.slice(0, 3);
}

export function getAssignedDaysForSession(plan: WeeklyPlanEntry[], sessionId: SessionId) {
  return normalizeWeeklyPlan(plan).filter((entry) => entry.sessionId === sessionId).map((entry) => entry.day);
}

function isSameLocalDate(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getDateForWeekday(reference: Date, day: Weekday) {
  const start = new Date(reference);
  const weekdayIndex = start.getDay();
  const offsetToMonday = weekdayIndex === 0 ? -6 : 1 - weekdayIndex;
  start.setDate(start.getDate() + offsetToMonday);
  start.setHours(0, 0, 0, 0);
  const date = new Date(start);
  date.setDate(start.getDate() + WEEKDAY_ORDER.indexOf(day));
  return date;
}

function wasSessionCompletedOnDate(logs: WorkoutLog[], sessionId: SessionId, target: Date) {
  return logs.some((log) => log.sessionId === sessionId && isSameLocalDate(new Date(log.date), target));
}

export function getPlannedSessionsThisWeek(plan: WeeklyPlanEntry[]) {
  return normalizeWeeklyPlan(plan).filter((entry) => entry.sessionId).length;
}

export function countCompletedPlannedSessionsThisWeek(plan: WeeklyPlanEntry[], logs: WorkoutLog[], reference = new Date()) {
  return normalizeWeeklyPlan(plan).reduce((count, entry) => {
    if (!entry.sessionId) return count;
    const targetDate = getDateForWeekday(reference, entry.day);
    return count + (wasSessionCompletedOnDate(logs, entry.sessionId, targetDate) ? 1 : 0);
  }, 0);
}

export function getNextPlannedEntry(plan: WeeklyPlanEntry[], logs: WorkoutLog[], reference = new Date()) {
  const normalized = normalizeWeeklyPlan(plan);

  for (let offset = 0; offset < 7; offset += 1) {
    const candidateDate = new Date(reference);
    candidateDate.setHours(0, 0, 0, 0);
    candidateDate.setDate(reference.getDate() + offset);
    const day = getWeekdayFromDate(candidateDate);
    const entry = normalized.find((item) => item.day === day);
    if (!entry?.sessionId) continue;
    if (offset === 0 && wasSessionCompletedOnDate(logs, entry.sessionId, candidateDate)) continue;
    return { ...entry, offsetDays: offset };
  }

  const firstPlanned = normalized.find((entry) => entry.sessionId);
  return firstPlanned ? { ...firstPlanned, offsetDays: 0 } : null;
}

export function getWeeklyPlanStatus(plan: WeeklyPlanEntry[], logs: WorkoutLog[], reference = new Date()) {
  return normalizeWeeklyPlan(plan).map((entry) => {
    const targetDate = getDateForWeekday(reference, entry.day);
    return {
      ...entry,
      completed: entry.sessionId ? wasSessionCompletedOnDate(logs, entry.sessionId, targetDate) : false,
    };
  });
}
