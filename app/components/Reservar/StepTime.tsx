import { useState, useEffect, useLayoutEffect, useRef } from "react";
import styles from "./StepTime.module.css";

function useDragScroll(ref: React.RefObject<HTMLUListElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startY = 0;
    let startScrollTop = 0;
    let dragging = false;

    function onPointerDown(e: PointerEvent) {
      dragging = true;
      startY = e.clientY;
      startScrollTop = el!.scrollTop;
      el!.setPointerCapture(e.pointerId);
      el!.style.cursor = "grabbing";
    }

    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      el!.scrollTop = startScrollTop + (startY - e.clientY);
    }

    function onPointerUp(e: PointerEvent) {
      if (!dragging) return;
      dragging = false;
      el!.releasePointerCapture(e.pointerId);
      el!.style.cursor = "";
    }

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [ref]);
}

const HOURS = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
const MINUTES = ["00", "15", "30", "45"];
const VOID_COUNT = 2;
const ITEM_HEIGHT = 44; // px — must match CSS

function parseInitialTime(time: string): { hour: number; minute: string } {
  if (!time) return { hour: HOURS[0], minute: MINUTES[0] };
  const [h, m] = time.split(":");
  const hour = Number(h);
  if (!HOURS.includes(hour) || !MINUTES.includes(m)) {
    return { hour: HOURS[0], minute: MINUTES[0] };
  }
  return { hour, minute: m };
}

type Props = {
  initialTime: string;
  onComplete: (time: string) => void;
};

export default function StepTime({ initialTime, onComplete }: Props): React.JSX.Element {
  const { hour: initHour, minute: initMinute } = parseInitialTime(initialTime);
  const [currentHour, setCurrentHour] = useState(initHour);
  const [currentMinute, setCurrentMinute] = useState(initMinute);

  const hourContainerRef = useRef<HTMLUListElement>(null);
  const minuteContainerRef = useRef<HTMLUListElement>(null);
  const hourItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const minuteItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Scroll drums to initial position before first paint
  useLayoutEffect(() => {
    const hourIdx = HOURS.indexOf(initHour);
    const minIdx = MINUTES.indexOf(initMinute);
    if (hourContainerRef.current && hourIdx !== -1) {
      hourContainerRef.current.scrollTop = hourIdx * ITEM_HEIGHT;
    }
    if (minuteContainerRef.current && minIdx !== -1) {
      minuteContainerRef.current.scrollTop = minIdx * ITEM_HEIGHT;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // IntersectionObserver tracks which item is centered in each drum
  useEffect(() => {
    if (!hourContainerRef.current) return;
    const items = hourItemRefs.current.filter((el): el is HTMLLIElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const h = Number(entry.target.textContent?.trim());
            if (!isNaN(h) && HOURS.includes(h)) setCurrentHour(h);
          }
        });
      },
      {
        root: hourContainerRef.current,
        rootMargin: `-${ITEM_HEIGHT * 2}px 0px -${ITEM_HEIGHT * 2}px 0px`,
        threshold: 1.0,
      },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!minuteContainerRef.current) return;
    const items = minuteItemRefs.current.filter((el): el is HTMLLIElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const m = entry.target.textContent?.trim() ?? "";
            if (MINUTES.includes(m)) setCurrentMinute(m);
          }
        });
      },
      {
        root: minuteContainerRef.current,
        rootMargin: `-${ITEM_HEIGHT * 2}px 0px -${ITEM_HEIGHT * 2}px 0px`,
        threshold: 1.0,
      },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useDragScroll(hourContainerRef);
  useDragScroll(minuteContainerRef);

  const formattedTime = `${currentHour}:${currentMinute}`;

  return (
    <section className={styles.step} aria-labelledby="step-time-title">
      <p className={styles.eyebrow}>Paso 4 de 5</p>
      <h2 id="step-time-title" className={styles.title}>
        Elige una hora
      </h2>
      <p className={styles.subtitle}>Horario disponible: 13:00 – 22:00</p>

      <div className={styles.drumsWrapper}>
        {/* Hour drum */}
        <div className={styles.drumCol}>
          <span className={styles.drumLabel} aria-hidden="true">
            H
          </span>
          <ul
            className={styles.drum}
            ref={hourContainerRef}
            aria-label="Hora"
          >
            {Array.from({ length: VOID_COUNT }, (_, i) => (
              <li key={`hv-a-${i}`} className={styles.void} aria-hidden="true" />
            ))}
            {HOURS.map((h, i) => (
              <li
                key={h}
                ref={(el) => {
                  hourItemRefs.current[i] = el;
                }}
                className={[
                  styles.drumItem,
                  h === currentHour ? styles.drumItemActive : null,
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={`${h} horas`}
              >
                {h}
              </li>
            ))}
            {Array.from({ length: VOID_COUNT }, (_, i) => (
              <li key={`hv-b-${i}`} className={styles.void} aria-hidden="true" />
            ))}
          </ul>
        </div>

        {/* Colon separator — same column structure for alignment */}
        <div className={styles.colonCol} aria-hidden="true">
          <span className={styles.drumLabel}>&nbsp;</span>
          <span className={styles.colon}>:</span>
        </div>

        {/* Minute drum */}
        <div className={styles.drumCol}>
          <span className={styles.drumLabel} aria-hidden="true">
            Min
          </span>
          <ul
            className={styles.drum}
            ref={minuteContainerRef}
            aria-label="Minutos"
          >
            {Array.from({ length: VOID_COUNT }, (_, i) => (
              <li key={`mv-a-${i}`} className={styles.void} aria-hidden="true" />
            ))}
            {MINUTES.map((m, i) => (
              <li
                key={m}
                ref={(el) => {
                  minuteItemRefs.current[i] = el;
                }}
                className={[
                  styles.drumItem,
                  m === currentMinute ? styles.drumItemActive : null,
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={`${m} minutos`}
              >
                {m}
              </li>
            ))}
            {Array.from({ length: VOID_COUNT }, (_, i) => (
              <li key={`mv-b-${i}`} className={styles.void} aria-hidden="true" />
            ))}
          </ul>
        </div>
      </div>

      <p className={styles.preview} aria-live="polite" aria-atomic="true">
        {formattedTime}
      </p>

      <button className={styles.btn} onClick={() => onComplete(formattedTime)}>
        Continuar
      </button>
    </section>
  );
}
