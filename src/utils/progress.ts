import type { WorkoutLog } from '../types';

export function getISOWeekKey(dateInput: string | Date) {
  const date = new Date(dateInput);
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - yearStart.getTime()) / 86400000);
  const week = Math.ceil((days + yearStart.getDay() + 1) / 7);
  return `${date.getFullYear()}-${week.toString().padStart(2, '0')}`;
}

export function countActiveWeekStreak(logs: WorkoutLog[]) {
  const activeWeeks = new Set(logs.map((log) => getISOWeekKey(log.date)));
  let streak = 0;
  const cursor = new Date();
  for (let i = 0; i < 104; i += 1) {
    const key = getISOWeekKey(cursor);
    if (!activeWeeks.has(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 7);
  }
  return streak;
}

export function getWeeklyCounts(logs: WorkoutLog[]) {
  return logs.reduce<Record<string, number>>((acc, log) => {
    const key = getISOWeekKey(log.date);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}
