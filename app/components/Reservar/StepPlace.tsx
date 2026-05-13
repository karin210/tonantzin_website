import Image from "next/image";
import styles from "./StepPlace.module.css";
import type { Place } from "./ReservationFlow";

type PlaceOption = {
  key: Place;
  label: string;
  description: string;
  src: string;
  alt: string;
};

const OPTIONS: PlaceOption[] = [
  {
    key: "terraza",
    label: "Terraza",
    description: "Ambiente al aire libre",
    src: "/Tonantzin_terraza_1_horizontal.jpg",
    alt: "Terraza de Tonantzin Cocina Mestiza, mesas al aire libre iluminadas con luces cálidas",
  },
  {
    key: "interior",
    label: "Interior",
    description: "Salón climatizado",
    src: "/adobe_wall_1.jpg",
    alt: "Interior del restaurante Tonantzin, paredes de adobe con iluminación acogedora",
  },
];

type Props = {
  onComplete: (place: Place) => void;
};

export default function StepPlace({ onComplete }: Props): React.JSX.Element {
  return (
    <section className={styles.step} aria-labelledby="step-place-title">
      <p className={styles.eyebrow}>Paso 5 de 5</p>
      <h2 id="step-place-title" className={styles.title}>
        Elige tu espacio
      </h2>

      <ul className={styles.cards} aria-label="Opciones de espacio">
        {OPTIONS.map((opt) => (
          <li key={opt.key} className={styles.cardItem}>
            <button
              className={styles.card}
              onClick={() => onComplete(opt.key)}
              aria-label={`Elegir ${opt.label} — ${opt.description}`}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={opt.src}
                  alt={opt.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 90vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div className={styles.overlay} aria-hidden="true" />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.placeLabel}>{opt.label}</span>
                <span className={styles.placeDesc}>{opt.description}</span>
                <span className={styles.elegirBtn} aria-hidden="true">
                  Elegir
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
