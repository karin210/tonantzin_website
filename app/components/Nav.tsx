"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointer = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const close = (): void => setIsOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navegación principal">
        <Link href="/" aria-label="Inicio — Tonantzin Cocina Mestiza">
          <Image
            src="/Tonantzin_logo_black.png"
            alt="Tonantzin Cocina Mestiza"
            width={200}
            height={80}
            className={styles.logo}
            priority
          />
        </Link>
        <ul className={styles.navList}>
          <li>
            <a href="#nosotros">Nosotros</a>
          </li>
          <li>
            <a href="#menu">Menú</a>
          </li>
          <li className={styles.dropdown} ref={dropdownRef}>
            <button
              type="button"
              className={styles.dropdownTrigger}
              aria-haspopup="true"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((v) => !v)}
            >
              Experiencias
              <span aria-hidden="true" className={styles.caret}>
                ▾
              </span>
            </button>
            <ul
              className={`${styles.dropdownMenu} ${isOpen ? styles.dropdownMenuOpen : ""}`}
              role="menu"
            >
              <li role="none">
                <a role="menuitem" href="#sala-juntas" onClick={close}>
                  Sala de Juntas
                </a>
              </li>
              <li role="none">
                <a role="menuitem" href="#eventos-privados" onClick={close}>
                  Eventos Privados
                </a>
              </li>
              <li role="none">
                <a role="menuitem" href="#talleres" onClick={close}>
                  Talleres y Catas
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#reservaciones">Reservaciones</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
