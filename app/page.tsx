import Image from "next/image";
import Header from "./components/Header/Header";
import Experiences from "./components/Experiences";
import styles from "./page.module.css";

export default function Home(): React.JSX.Element {
  return (
    <>
      <Header />

      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          {/* Vertical crop — shown on narrow viewports */}
          <div className={`${styles.heroImageWrapper} ${styles.heroVertical}`}>
            <Image
              src="/Tonantzin_terraza_1_vertical.jpg"
              alt="Terraza de Tonantzin Cocina Mestiza iluminada con luces y decoración floral"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>

          {/* Horizontal crop — shown on wide viewports */}
          <div className={`${styles.heroImageWrapper} ${styles.heroHorizontal}`}>
            <Image
              src="/Tonantzin_terraza_1_horizontal.jpg"
              alt="Terraza de Tonantzin Cocina Mestiza iluminada con luces y decoración floral"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>

          <div className={styles.heroOverlay} aria-hidden="true" />

          <div className={styles.heroContent}>
            <h1 id="hero-title" className={styles.heroTitle}>
              <span className={styles.heroTitleMain}>Tonantzin</span>
              <span className={styles.heroTitleSub}>Cocina Mestiza</span>
            </h1>
            <p className={styles.heroTagline}>
              Una experiencia culinaria que celebra las raíces de México
            </p>
            <a href="#reservaciones" className={styles.heroButton}>
              Reservar Mesa
            </a>
          </div>
        </section>

        <Experiences />
      </main>
    </>
  );
}
