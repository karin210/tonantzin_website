import styles from "./ProgressTimeline.module.css";
import type { Step, ReservationData } from "./ReservationFlow";

const MONTH_SHORT = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

type StepDef = {
  key: Step;
  label: string;
  getValue: (d: ReservationData) => string;
  getShortValue?: (d: ReservationData) => string;
};

const STEP_DEFS: StepDef[] = [
  {
    key: "name",
    label: "Nombre",
    getValue: (d) => d.name,
    getShortValue: (d) => d.name.split(" ")[0],
  },
  {
    key: "guests",
    label: "Personas",
    getValue: (d) =>
      d.guests ? `${d.guests} ${d.guests === 1 ? "comensal" : "comensales"}` : "",
    getShortValue: (d) => (d.guests ? `${d.guests} pers.` : ""),
  },
  {
    key: "date",
    label: "Fecha",
    getValue: (d) =>
      d.date
        ? `${d.date.getDate()} ${MONTH_SHORT[d.date.getMonth()]}`
        : "",
  },
  { key: "time", label: "Hora", getValue: (d) => d.time },
  {
    key: "place",
    label: "Lugar",
    getValue: (d) =>
      d.place === "terraza" ? "Terraza" : d.place === "interior" ? "Interior" : "",
  },
  { key: "success", label: "Confirmación", getValue: () => "" },
];

const STEP_ORDER: Step[] = ["name", "guests", "date", "time", "place", "success"];

type Props = {
  currentStep: Step;
  data: ReservationData;
  onStepClick: (step: Step) => void;
};

export default function ProgressTimeline({
  currentStep,
  data,
  onStepClick,
}: Props): React.JSX.Element {
  const currentIndex = STEP_ORDER.indexOf(currentStep);

  return (
    <nav className={styles.timeline} aria-label="Progreso de tu reservación">
      <ol className={styles.list}>
        {STEP_DEFS.map((def, i) => {
          const isCompleted = i < currentIndex;
          const isActive = def.key === currentStep;
          const value = def.getValue(data);
          const shortValue = def.getShortValue ? def.getShortValue(data) : value;
          const isLast = i === STEP_DEFS.length - 1;

          const stepClass = [
            styles.step,
            isCompleted ? styles.completed : null,
            isActive ? styles.active : null,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li key={def.key} className={stepClass}>
              <div className={styles.nodeCol}>
                <button
                  className={styles.node}
                  onClick={() => isCompleted && onStepClick(def.key)}
                  aria-label={`${def.label}${isCompleted && value ? `: ${value}` : ""}`}
                  aria-current={isActive ? "step" : undefined}
                  disabled={!isCompleted}
                >
                  {isCompleted ? (
                    <svg
                      width="12"
                      height="10"
                      viewBox="0 0 12 10"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 5L4.5 8.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span aria-hidden="true">{i + 1}</span>
                  )}
                </button>
                {!isLast && (
                  <div
                    className={[
                      styles.connector,
                      isCompleted ? styles.connectorFilled : null,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className={styles.info}>
                <span className={styles.label}>{def.label}</span>
                {isCompleted && value && (
                  <span className={styles.value}>
                    <span className={styles.valueLong}>{value}</span>
                    <span className={styles.valueShort}>{shortValue}</span>
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
