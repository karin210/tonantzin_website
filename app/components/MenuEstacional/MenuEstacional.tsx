import Image from "next/image";
import styles from "./MenuEstacional.module.css";
import DemoCtaButton from "./DemoCtaButton";

type Category = "Entrada" | "Plato Fuerte" | "Postre";

type Dish = {
  readonly id: string;
  readonly category: Category;
  readonly name: string;
  readonly description: string;
  readonly price: string;
};

type FavoriteDish = {
  readonly name: string;
  readonly description: string;
  readonly price: string;
};

const DISHES: readonly Dish[] = [
  {
    id: "tlayuda-negra",
    category: "Entrada",
    name: "Tlayuda Negra",
    description:
      "Totopos de maíz negro, frijoles refritos, tasajo de Oaxaca, quesillo y hoja santa fresca",
    price: "$185",
  },
  {
    id: "cannellonis",
    category: "Plato Fuerte",
    name: "Cannellonis",
    description:
      "Rollitos de pasta rellenos de carne en salsa pomodoro, gratinados con queso mozarella",
    price: "$260",
  },
  {
    id: "pechuga-parmesana",
    category: "Plato Fuerte",
    name: "Pechuga Parmesana",
    description:
      "Empanizada crujiente bañada en salsa de chipotle acompañada con espárragos",
    price: "$385",
  },
  {
    id: "chocolate-metate",
    category: "Postre",
    name: "Chocolate de Metate",
    description:
      "Cremoso de cacao veracruzano, helado de canela y crujiente de semilla de cacao.",
    price: "$145",
  },
];

const FEATURED: Readonly<{
  name: string;
  description: string;
  price: string;
  category: Category;
}> = {
  name: "Pulpo braseado",
  description:
    "Pulpo tierno braseado al carbón, con una textura exterior crujiente y un centro suave. Acompañado de papas cambray al romero y un toque de aceite de oliva infusionado con ajo y pimentón ahumado",
  price: "$350",
  category: "Plato Fuerte",
};

const FAVORITES: readonly FavoriteDish[] = [
  {
    name: "Pechuga Parmesana",
    description:
      "Empanizada crujiente bañada en salsa de chipotle acompañada con espárragos",
    price: "$240",
  },
  {
    name: "Cannellonis",
    description:
      "Rollitos de pasta rellenos de carne en salsa pomodoro, gratinados con queso mozarella",
    price: "$260",
  },
  {
    name: "Raviolis en salsa rosa",
    description: "Rellenos de queso ricotta",
    price: "$260",
  },
];

const CATEGORY_CLASS: Record<Category, string> = {
  Entrada: styles.tagEntrada,
  "Plato Fuerte": styles.tagPlatoFuerte,
  Postre: styles.tagPostre,
};

export default function MenuEstacional(): React.JSX.Element {
  return (
    <section className={styles.section} aria-labelledby="menu-estacional-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Primavera · 2026</p>
        <h2 id="menu-estacional-title" className={styles.title}>
          Menú de temporada
        </h2>
        <p className={styles.lede}>
          Cada temporada inspira una carta nueva. Ingredientes de origen local,
          técnicas ancestrales y la creatividad de nuestra cocina; reunidos en
          una experiencia especial.
        </p>
      </div>

      <div className={styles.body}>
        <aside className={styles.featuredCard}>
          <div className={styles.featuredImageWrapper}>
            <Image
              src="/pulpo.jpg"
              alt="Pulpo a la Plancha — platillo recomendado por el chef"
              fill
              sizes="(min-width: 1024px) 22rem, 100vw"
              style={{ objectFit: "cover" }}
            />
            <span className={styles.featuredBadge} aria-hidden="true">
              Recomendación del chef
            </span>
          </div>
          <div className={styles.featuredInfo}>
            <div className={styles.cardHeader}>
              <span
                className={`${styles.tag} ${CATEGORY_CLASS[FEATURED.category]}`}
              >
                {FEATURED.category}
              </span>
              <span
                className={styles.price}
                aria-label={`Precio: ${FEATURED.price}`}
              >
                {FEATURED.price}
              </span>
            </div>
            <h3 id="recomendacion-title" className={styles.dishName}>
              {FEATURED.name}
            </h3>
            <p className={styles.dishDescription}>{FEATURED.description}</p>
          </div>
        </aside>

        <aside className={styles.favorites}>
          <h4 className={styles.favoritesTitle}>Platillos favoritos</h4>
          <ul className={styles.favoritesList} aria-label="Platillos favoritos">
            {FAVORITES.map((dish) => (
              <li key={dish.name} className={styles.favoriteItem}>
                <div className={styles.favoriteHeader}>
                  <h5 className={styles.favoriteName}>{dish.name}</h5>
                  <span
                    className={styles.price}
                    aria-label={`Precio: ${dish.price}`}
                  >
                    {dish.price}
                  </span>
                </div>
                <p className={styles.dishDescription}>{dish.description}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className={styles.cta}>
        <DemoCtaButton className={styles.ctaButton}>
          Ver Menú Completo
        </DemoCtaButton>
      </div>
    </section>
  );
}
