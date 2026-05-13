import { useState } from "react";
import styles from "./StepGuests.module.css";

const MAX = 8;
const MIN = 1;

type Props = {
  initialValue: number;
  onComplete: (guests: number) => void;
};

export default function StepGuests({ initialValue, onComplete }: Props): React.JSX.Element {
  const [count, setCount] = useState(Math.max(MIN, Math.min(initialValue, MAX)));

  return (
    <section className={styles.step} aria-labelledby="step-guests-title">
      <p className={styles.eyebrow}>Paso 2 de 5</p>
      <h2 id="step-guests-title" className={styles.title}>
        Comensales
      </h2>
      <p className={styles.subtitle}>¿Cuántas personas vendrán?</p>

      <div
        className={styles.counter}
        role="group"
        aria-label="Número de comensales"
      >
        <button
          className={styles.counterBtn}
          onClick={() => setCount((c) => Math.max(MIN, c - 1))}
          aria-label="Reducir un comensal"
          disabled={count <= MIN}
        >
          −
        </button>

        <div
          className={styles.countDisplay}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className={styles.countNum}>{count}</span>
          <span className={styles.countLabel}>
            {count === 1 ? "comensal" : "comensales"}
          </span>
        </div>

        <button
          className={styles.counterBtn}
          onClick={() => setCount((c) => Math.min(MAX, c + 1))}
          aria-label="Agregar un comensal"
          disabled={count >= MAX}
        >
          +
        </button>
      </div>

      <p className={styles.hint}>Máximo {MAX} personas por reservación</p>

      <button className={styles.btn} onClick={() => onComplete(count)}>
        Continuar
      </button>
    </section>
  );
}
