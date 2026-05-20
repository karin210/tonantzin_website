"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handlePointer = (event: MouseEvent): void => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeAll = (): void => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const demoClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    closeAll();
    document.dispatchEvent(new CustomEvent("demo:unavailable"));
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navegación principal">
        <Link
          href="/"
          aria-label="Inicio — Tonantzin Cocina Mestiza"
          onClick={closeAll}
        >
          <Image
            src="/Tonantzin_logo_black.png"
            alt="Tonantzin Cocina Mestiza"
            width={200}
            height={80}
            className={styles.logo}
            priority
          />
        </Link>

        <button
          type="button"
          className={styles.hamburger}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="main-nav-list"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barTop : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barMid : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barBot : ""}`} />
        </button>

        {menuOpen && (
          <div
            className={styles.backdrop}
            aria-hidden="true"
            onClick={closeAll}
          />
        )}

        <ul
          id="main-nav-list"
          className={`${styles.navList} ${menuOpen ? styles.navListOpen : ""}`}
        >
          <li className={styles.closeItem} role="none">
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Cerrar menú"
              onClick={closeAll}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                width="1.25rem"
                height="1.25rem"
              >
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </li>
          <li>
            <Link href="/reservar" onClick={closeAll}>
              Reservaciones
            </Link>
          </li>
          <li>
            <a href="#menu" onClick={demoClick}>
              Menú
            </a>
          </li>

          <li className={styles.dropdown} ref={dropdownRef}>
            <button
              type="button"
              className={styles.dropdownTrigger}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen((v) => !v)}
            >
              Servicios
              <span aria-hidden="true" className={styles.caret}>
                ▾
              </span>
            </button>
            <ul
              className={`${styles.dropdownMenu} ${dropdownOpen ? styles.dropdownMenuOpen : ""}`}
              role="menu"
            >
              <li role="none">
                <a role="menuitem" href="#sala-juntas" onClick={demoClick}>
                  Sala de Juntas
                </a>
              </li>
              <li role="none">
                <a role="menuitem" href="#eventos-privados" onClick={demoClick}>
                  Eventos Privados
                </a>
              </li>
              <li role="none">
                <a role="menuitem" href="#talleres" onClick={demoClick}>
                  Actividades
                </a>
              </li>
            </ul>
          </li>
          <a href="#nosotros" onClick={demoClick}>
            Nosotros
          </a>
          <li>
            <a href="#nosotros" onClick={demoClick}>
              Trabaja con nosotros
            </a>
          </li>
          <li className={styles.accountItem}>
            <Link href="/perfil" onClick={closeAll}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <span className={styles.accountLabel}>Mi cuenta</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
