"use client";

import { useRef, useState } from "react";
import styles from "./Perfil.module.css";

type SpecialDate = {
  id: string;
  label: string;
  date: string;
};

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  allergies: string[];
  restrictions: string[];
  specialDates: SpecialDate[];
  photoUrl: string;
};

const INITIAL_DATA: ProfileData = {
  name: "Valentina Reyes Mendoza",
  email: "valentina.reyes@correo.mx",
  phone: "+52 55 1234 5678",
  allergies: ["Nueces", "Mariscos"],
  restrictions: ["Sin gluten"],
  specialDates: [
    { id: "1", label: "Cumpleaños", date: "15 de marzo" },
    { id: "2", label: "Aniversario", date: "20 de junio" },
  ],
  photoUrl: "",
};

const LAST_RESERVATION = {
  date: "Martes 28 de abril de 2026",
  time: "20:30",
  table: "Mesa del Jardín",
  guests: 2,
};

const LAST_DISH = "Mole Negro con Codorniz Asada";

export default function PerfilClient(): React.JSX.Element {
  const [data, setData] = useState<ProfileData>(INITIAL_DATA);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileData>(INITIAL_DATA);
  const [newAllergy, setNewAllergy] = useState("");
  const [newRestriction, setNewRestriction] = useState("");
  const [newDateLabel, setNewDateLabel] = useState("");
  const [newDateValue, setNewDateValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startEditing = (): void => {
    setDraft(data);
    setEditing(true);
  };

  const cancelEditing = (): void => {
    setEditing(false);
    setNewAllergy("");
    setNewRestriction("");
    setNewDateLabel("");
    setNewDateValue("");
  };

  const saveChanges = (): void => {
    setData(draft);
    setEditing(false);
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev): void => {
      const result = ev.target?.result;
      if (typeof result === "string") {
        setDraft((prev) => ({ ...prev, photoUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const addAllergy = (): void => {
    const val = newAllergy.trim();
    if (!val) return;
    setDraft((prev) => ({ ...prev, allergies: [...prev.allergies, val] }));
    setNewAllergy("");
  };

  const removeAllergy = (i: number): void => {
    setDraft((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((_, idx) => idx !== i),
    }));
  };

  const addRestriction = (): void => {
    const val = newRestriction.trim();
    if (!val) return;
    setDraft((prev) => ({
      ...prev,
      restrictions: [...prev.restrictions, val],
    }));
    setNewRestriction("");
  };

  const removeRestriction = (i: number): void => {
    setDraft((prev) => ({
      ...prev,
      restrictions: prev.restrictions.filter((_, idx) => idx !== i),
    }));
  };

  const addDate = (): void => {
    const label = newDateLabel.trim();
    const date = newDateValue.trim();
    if (!label || !date) return;
    setDraft((prev) => ({
      ...prev,
      specialDates: [
        ...prev.specialDates,
        { id: Date.now().toString(), label, date },
      ],
    }));
    setNewDateLabel("");
    setNewDateValue("");
  };

  const removeDate = (id: string): void => {
    setDraft((prev) => ({
      ...prev,
      specialDates: prev.specialDates.filter((d) => d.id !== id),
    }));
  };

  const activeData = editing ? draft : data;

  const initials = activeData.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");

  const dispatchDemo = (): void => {
    document.dispatchEvent(new CustomEvent("demo:unavailable"));
  };

  return (
    <main className={styles.container}>
      {/* ── Hero ─────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.avatarWrapper}>
          {activeData.photoUrl ? (
            // Regular <img>: runtime data URL cannot be optimized by next/image
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activeData.photoUrl}
              alt={`Foto de ${activeData.name}`}
              className={styles.avatarImage}
            />
          ) : (
            <span className={styles.avatarInitials} aria-hidden="true">
              {initials}
            </span>
          )}
          {editing && (
            <>
              <button
                type="button"
                className={styles.avatarEditBtn}
                onClick={() => fileInputRef.current?.click()}
                aria-label="Cambiar foto de perfil"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handlePhoto}
                aria-label="Seleccionar foto de perfil"
              />
            </>
          )}
        </div>

        {editing ? (
          <input
            className={styles.nameInput}
            value={draft.name}
            onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
            aria-label="Nombre completo"
          />
        ) : (
          <h1 className={styles.name}>{data.name}</h1>
        )}

        <p className={styles.memberSince}>Miembro desde enero de 2024</p>
      </div>

      {/* ── Edit controls ────────────────────── */}
      <div className={styles.actions}>
        {editing ? (
          <>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={saveChanges}
            >
              Guardar cambios
            </button>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={cancelEditing}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            type="button"
            className={styles.btnOutline}
            onClick={startEditing}
          >
            Editar perfil
          </button>
        )}
      </div>

      {/* ── Cards grid ───────────────────────── */}
      <div className={styles.grid}>
        {/* Personal info */}
        <section className={styles.card} aria-labelledby="info-heading">
          <h2 id="info-heading" className={styles.cardTitle}>
            Información Personal
          </h2>
          <dl className={styles.fieldList}>
            <div className={styles.field}>
              <dt className={styles.fieldLabel}>Correo electrónico</dt>
              {editing ? (
                <dd>
                  <input
                    type="email"
                    className={styles.fieldInput}
                    value={draft.email}
                    onChange={(e) =>
                      setDraft((p) => ({ ...p, email: e.target.value }))
                    }
                    aria-label="Correo electrónico"
                  />
                </dd>
              ) : (
                <dd className={styles.fieldValue}>{data.email}</dd>
              )}
            </div>
            <div className={styles.field}>
              <dt className={styles.fieldLabel}>Teléfono</dt>
              {editing ? (
                <dd>
                  <input
                    type="tel"
                    className={styles.fieldInput}
                    value={draft.phone}
                    onChange={(e) =>
                      setDraft((p) => ({ ...p, phone: e.target.value }))
                    }
                    aria-label="Teléfono"
                  />
                </dd>
              ) : (
                <dd className={styles.fieldValue}>{data.phone}</dd>
              )}
            </div>
          </dl>
        </section>

        {/* Dietary restrictions */}
        <section className={styles.card} aria-labelledby="diet-heading">
          <h2 id="diet-heading" className={styles.cardTitle}>
            Restricciones Alimentarias
          </h2>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Alergias</h3>
            <ul className={styles.tagList}>
              {activeData.allergies.map((a, i) => (
                <li key={i} className={styles.tag}>
                  {a}
                  {editing && (
                    <button
                      type="button"
                      className={styles.tagRemove}
                      onClick={() => removeAllergy(i)}
                      aria-label={`Quitar alergia: ${a}`}
                    >
                      ×
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {editing && (
              <div className={styles.addRow}>
                <input
                  className={styles.fieldInput}
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addAllergy()}
                  placeholder="Agregar alergia…"
                  aria-label="Nueva alergia"
                />
                <button
                  type="button"
                  className={styles.btnAdd}
                  onClick={addAllergy}
                  aria-label="Agregar alergia"
                >
                  +
                </button>
              </div>
            )}
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Otras restricciones</h3>
            <ul className={styles.tagList}>
              {activeData.restrictions.map((r, i) => (
                <li key={i} className={`${styles.tag} ${styles.tagGreen}`}>
                  {r}
                  {editing && (
                    <button
                      type="button"
                      className={styles.tagRemove}
                      onClick={() => removeRestriction(i)}
                      aria-label={`Quitar restricción: ${r}`}
                    >
                      ×
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {editing && (
              <div className={styles.addRow}>
                <input
                  className={styles.fieldInput}
                  value={newRestriction}
                  onChange={(e) => setNewRestriction(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addRestriction()}
                  placeholder="Agregar restricción…"
                  aria-label="Nueva restricción"
                />
                <button
                  type="button"
                  className={styles.btnAdd}
                  onClick={addRestriction}
                  aria-label="Agregar restricción"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Special dates */}
        <section className={styles.card} aria-labelledby="dates-heading">
          <h2 id="dates-heading" className={styles.cardTitle}>
            Fechas Especiales
          </h2>
          <ul className={styles.dateList}>
            {activeData.specialDates.map((d) => (
              <li key={d.id} className={styles.dateItem}>
                <span className={styles.dateIcon} aria-hidden="true">
                  ◆
                </span>
                <div className={styles.dateText}>
                  <span className={styles.dateLabel}>{d.label}</span>
                  <span className={styles.dateValue}>{d.date}</span>
                </div>
                {editing && (
                  <button
                    type="button"
                    className={styles.dateRemove}
                    onClick={() => removeDate(d.id)}
                    aria-label={`Quitar fecha: ${d.label}`}
                  >
                    ×
                  </button>
                )}
              </li>
            ))}
          </ul>
          {editing && (
            <div className={styles.addDateRow}>
              <input
                className={styles.fieldInput}
                value={newDateLabel}
                onChange={(e) => setNewDateLabel(e.target.value)}
                placeholder="Ocasión (ej. Aniversario)"
                aria-label="Etiqueta de fecha especial"
              />
              <input
                className={styles.fieldInput}
                value={newDateValue}
                onChange={(e) => setNewDateValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addDate()}
                placeholder="Fecha (ej. 15 de julio)"
                aria-label="Fecha especial"
              />
              <button
                type="button"
                className={styles.btnAdd}
                onClick={addDate}
                aria-label="Agregar fecha especial"
              >
                +
              </button>
            </div>
          )}
        </section>

        {/* Last visit */}
        <section className={styles.card} aria-labelledby="last-visit-heading">
          <h2 id="last-visit-heading" className={styles.cardTitle}>
            Última Visita
          </h2>
          <dl className={styles.fieldList}>
            <div className={styles.field}>
              <dt className={styles.fieldLabel}>Reservación</dt>
              <dd className={styles.fieldValue}>
                {LAST_RESERVATION.date} · {LAST_RESERVATION.time} hrs
              </dd>
            </div>
            <div className={styles.field}>
              <dt className={styles.fieldLabel}>Comensales</dt>
              <dd className={styles.fieldValue}>
                {LAST_RESERVATION.guests} personas
              </dd>
            </div>
            <div className={styles.field}>
              <dt className={styles.fieldLabel}>Último platillo ordenado</dt>
              <dd className={styles.fieldValueAccent}>{LAST_DISH}</dd>
            </div>
          </dl>

          <div className={styles.visitBtns}>
            <button
              type="button"
              className={styles.btnOutline}
              onClick={dispatchDemo}
            >
              Ver detalle de reservación
            </button>
            <button
              type="button"
              className={styles.btnOutline}
              onClick={dispatchDemo}
            >
              Historial de pedidos
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
