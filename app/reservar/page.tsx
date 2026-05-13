import type { Metadata } from "next";
import Header from "../components/Header/Header";
import ReservationFlow from "../components/Reservar/ReservationFlow";

export const metadata: Metadata = {
  title: "Reservar — Tonantzin Cocina Mestiza",
};

export default function ReservarPage(): React.JSX.Element {
  return (
    <>
      <Header />
      <ReservationFlow />
    </>
  );
}
