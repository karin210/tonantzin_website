import { useState } from "react";
import styles from "./StepCalendar.module.css";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const WEEKDAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

type Props = {
  initialDate: Date | null;
  onComplete: (date: Date) => void;
};

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function buildGrid(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay + 6) % 7; // Convert Sunday-first to Monday-first
  const daysInMonth = getDaysInMonth(year, month);
  const grid: (number | null)[] = [];
  for (let i = 0; i < offset; i++) grid.push(null);
  for (let d = 1; d <= daysInMonth; d++) grid.push(d);
  while (grid.length % 7 !== 0) grid.push(null);
  return grid;
}

export default function StepCalendar({ initialDate, onComplete }: Props): React.JSX.Element {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(
    initialDate ? initialDate.getFullYear() : today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    initialDate ? initialDate.getMonth() : today.getMonth(),
  );
  const [selected, setSelected] = useState<Date | null>(initialDate);

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  function prevMonth(): void {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth(): void {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function handleDayClick(day: number): void {
    const date = new Date(viewYear, viewMonth, day);
    date.setHours(0, 0, 0, 0);
    if (date < today) return;
    setSelected(date);
    onComplete(date);
  }

  const grid = buildGrid(viewYear, viewMonth);

  return (
    <section className={styles.step} aria-labelledby="step-date-title">
      <p className={styles.eyebrow}>Paso 3 de 5</p>
      <h2 id="step-date-title" className={styles.title}>
        Elige una fecha
      </h2>

      <div className={styles.calendar}>
        <div className={styles.calHeader}>
          <button
            className={styles.navBtn}
            onClick={prevMonth}
            disabled={!canGoPrev}
            aria-label="Mes anterior"
          >
            ‹
          </button>
          <span className={styles.monthLabel}>
            {MONTHS[viewMonth]}{" "}
            <span className={styles.year}>{viewYear}</span>
          </span>
          <button
            className={styles.navBtn}
            onClick={nextMonth}
            aria-label="Mes siguiente"
          >
            ›
          </button>
        </div>

        <div
          className={styles.grid}
          role="grid"
          aria-label={`${MONTHS[viewMonth]} ${viewYear}`}
        >
          {WEEKDAYS.map((d) => (
            <span
              key={d}
              className={styles.weekday}
              role="columnheader"
              aria-label={d}
            >
              {d}
            </span>
          ))}

          {grid.map((day, i) => {
            if (day === null) {
              return (
                <span
                  key={`empty-${i}`}
                  className={styles.empty}
                  aria-hidden="true"
                />
              );
            }

            const date = new Date(viewYear, viewMonth, day);
            date.setHours(0, 0, 0, 0);
            const isPast = date < today;
            const isToday = date.getTime() === today.getTime();
            const isSelected =
              selected !== null &&
              selected.getFullYear() === viewYear &&
              selected.getMonth() === viewMonth &&
              selected.getDate() === day;

            const dayClass = [
              styles.day,
              isPast ? styles.dayPast : null,
              isToday ? styles.dayToday : null,
              isSelected ? styles.daySelected : null,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={day}
                className={dayClass}
                onClick={() => handleDayClick(day)}
                disabled={isPast}
                aria-label={`${day} de ${MONTHS[viewMonth]} de ${viewYear}`}
                aria-selected={isSelected}
                role="gridcell"
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
