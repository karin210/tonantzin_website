import Link from "next/link";
import styles from "./StepSuccess.module.css";
import type { ReservationData } from "./ReservationFlow";

const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

type Props = {
  data: ReservationData;
};

export default function StepSuccess({ data }: Props): React.JSX.Element {
  const dateStr = data.date
    ? `${data.date.getDate()} de ${MONTHS[data.date.getMonth()]} de ${data.date.getFullYear()}`
    : "";
  const placeStr = data.place === "terraza" ? "Terraza" : "Interior";

  return (
    <section className={styles.step} aria-labelledby="step-success-title">
      <div className={styles.checkWrapper} aria-hidden="true">
        <svg
          className={styles.check}
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={styles.checkCircle}
            cx="26"
            cy="26"
            r="24"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            className={styles.checkMark}
            d="M14 26L22 34L38 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      <h2 id="step-success-title" className={styles.title}>
        ¡Reservación confirmada!
      </h2>
      <p className={styles.subtitle}>
        Nos vemos pronto, <em>{data.name}</em>
      </p>

      <dl className={styles.summary}>
        <div className={styles.summaryRow}>
          <dt className={styles.summaryKey}>Comensales</dt>
          <dd className={styles.summaryVal}>
            {data.guests} {data.guests === 1 ? "persona" : "personas"}
          </dd>
        </div>
        <div className={styles.summaryRow}>
          <dt className={styles.summaryKey}>Fecha</dt>
          <dd className={styles.summaryVal}>{dateStr}</dd>
        </div>
        <div className={styles.summaryRow}>
          <dt className={styles.summaryKey}>Hora</dt>
          <dd className={styles.summaryVal}>{data.time}</dd>
        </div>
        <div className={styles.summaryRow}>
          <dt className={styles.summaryKey}>Espacio</dt>
          <dd className={styles.summaryVal}>{placeStr}</dd>
        </div>
      </dl>

      <Link href="/" className={styles.homeLink}>
        Volver al inicio
      </Link>
    </section>
  );
}
