import Image from "next/image";
import styles from "./MenuEstacional.module.css";

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
      "Totopos de maíz negro, frijoles refritos, tasajo de Oaxaca, quesillo y hoja santa fresca.",
    price: "$185",
  },
  {
    id: "pato-mole-negro",
    category: "Plato Fuerte",
    name: "Pato en Mole Negro",
    description:
      "Pato confitado bañado en mole negro de temporada, arroz rojo y plátano macho asado.",
    price: "$420",
  },
  {
    id: "camarones-mole-amarillo",
    category: "Plato Fuerte",
    name: "Camarones en Mole Amarillo",
    description:
      "Camarón de altamar, chayote, ejotes tiernos y chepiche en mole amarillo oaxaqueño.",
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
  name: "Pulpo a la Plancha",
  description:
    "Pulpo del Pacífico asado a la plancha, recado negro yucateco, puré de coliflor ahumada y aceite de epazote.",
  price: "$445",
  category: "Plato Fuerte",
};

const FAVORITES: readonly FavoriteDish[] = [
  {
    name: "Ceviche de Robalo",
    description:
      "Robalo fresco marinado en limón real, pepino, chile serrano y leche de tigre.",
    price: "$265",
  },
  {
    name: "Chiles en Nogada",
    description:
      "Chile poblano relleno de picadillo mestizo, nogada cremosa y granada de temporada.",
    price: "$395",
  },
  {
    name: "Costilla en Mole Coloradito",
    description:
      "Costilla de res braseada 12 horas en mole coloradito con cilantro criollo.",
    price: "$460",
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
        <aside className={styles.aside} aria-labelledby="recomendacion-title">
          <div className={styles.featuredCard}>
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
          </div>

          <div className={styles.favorites}>
            <h4 className={styles.favoritesTitle}>Platillos favoritos</h4>
            <ul
              className={styles.favoritesList}
              aria-label="Platillos favoritos"
            >
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
          </div>
        </aside>
      </div>

      <div className={styles.cta}>
        <a href="/menu" className={styles.ctaButton}>
          Ver Menú Completo
        </a>
      </div>
    </section>
  );
}
