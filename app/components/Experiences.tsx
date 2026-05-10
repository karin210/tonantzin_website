import styles from "./Experiences.module.css";

type Accent = "green" | "terracotta" | "gold";

type Experience = {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly accent: Accent;
};

const EXPERIENCES: readonly Experience[] = [
  {
    id: "sala-juntas",
    eyebrow: "Reuniones",
    title: "Sala de Juntas",
    description:
      "Un espacio íntimo para sesiones ejecutivas o jornadas completas, con paquetes a la medida que incluyen mobiliario, equipo audiovisual y acompañamiento de cocina.",
    accent: "green",
  },
  {
    id: "eventos-privados",
    eyebrow: "Renta del lugar",
    title: "Eventos Privados",
    description:
      "Tonantzin a tu disposición. Bodas íntimas, celebraciones familiares, presentaciones — el restaurante completo, ambientado para tu ocasión.",
    accent: "terracotta",
  },
  {
    id: "talleres",
    eyebrow: "Talleres y catas",
    title: "Experiencias",
    description:
      "Decoración de pasteles con manga pastelera, cata de mezcal y otras vivencias guiadas por nuestro equipo. Aprende, prueba y celebra la mesa mexicana.",
    accent: "gold",
  },
];

const ACCENT_CLASS: Record<Accent, string> = {
  green: styles.accentGreen,
  terracotta: styles.accentTerracotta,
  gold: styles.accentGold,
};

export default function Experiences(): React.JSX.Element {
  return (
    <section
      className={styles.section}
      aria-labelledby="experiences-title"
    >
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Más allá de la mesa</p>
        <h2 id="experiences-title" className={styles.title}>
          Experiencias
        </h2>
        <p className={styles.lede}>
          Nuestra cocina es solo el principio. Tonantzin también abre sus puertas
          para reuniones, eventos privados y experiencias guiadas que celebran
          la cultura mexicana.
        </p>
      </div>

      <ul className={styles.grid}>
        {EXPERIENCES.map((exp) => (
          <li key={exp.id} id={exp.id} className={styles.card}>
            <div
              className={`${styles.cardImage} ${ACCENT_CLASS[exp.accent]}`}
              aria-hidden="true"
            />
            <div className={styles.cardBody}>
              <p className={styles.cardEyebrow}>{exp.eyebrow}</p>
              <h3 className={styles.cardTitle}>{exp.title}</h3>
              <p className={styles.cardDescription}>{exp.description}</p>
              <span className={styles.cardBadge}>Próximamente</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
