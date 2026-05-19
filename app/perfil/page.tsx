import type { Metadata } from "next";
import Header from "../components/Header/Header";
import PerfilClient from "../components/Perfil/PerfilClient";

export const metadata: Metadata = {
  title: "Mi Perfil — Tonantzin Cocina Mestiza",
};

export default function PerfilPage(): React.JSX.Element {
  return (
    <>
      <Header />
      <PerfilClient />
    </>
  );
}
