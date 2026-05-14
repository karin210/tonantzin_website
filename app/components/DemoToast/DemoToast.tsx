"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DemoToast.module.css";

export default function DemoToast(): React.JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const show = (_: Event): void => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(true);
      timerRef.current = setTimeout(() => setVisible(false), 2500);
    };
    document.addEventListener("demo:unavailable", show);
    return () => {
      document.removeEventListener("demo:unavailable", show);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <p role="status" aria-live="polite" className={styles.toast}>
      Página no disponible
    </p>
  );
}
