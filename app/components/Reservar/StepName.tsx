import { useState } from "react";
import styles from "./StepName.module.css";

type Props = {
  initialValue: string;
  onComplete: (name: string) => void;
};

export default function StepName({ initialValue, onComplete }: Props): React.JSX.Element {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(): void {
    const trimmed = value.trim();
    if (trimmed) onComplete(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <section className={styles.step} aria-labelledby="step-name-title">
      <p className={styles.eyebrow}>Paso 1 de 5</p>
      <h1 id="step-name-title" className={styles.title}>
        Reserva tu mesa
      </h1>
      <p className={styles.subtitle}>¿Cómo te llamas?</p>

      <div className={styles.fieldWrapper}>
        <label htmlFor="guest-name" className={styles.label}>
          Nombre completo
        </label>
        <input
          id="guest-name"
          type="text"
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tu nombre"
          autoComplete="given-name"
            autoFocus
        />
      </div>

      <button
        className={styles.btn}
        onClick={handleSubmit}
        disabled={!value.trim()}
      >
        Continuar
      </button>
    </section>
  );
}
