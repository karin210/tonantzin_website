"use client";

import { useState } from "react";
import styles from "./ReservationFlow.module.css";
import ProgressTimeline from "./ProgressTimeline";
import StepName from "./StepName";
import StepGuests from "./StepGuests";
import StepCalendar from "./StepCalendar";
import StepTime from "./StepTime";
import StepPlace from "./StepPlace";
import StepSuccess from "./StepSuccess";

export type Step = "name" | "guests" | "date" | "time" | "place" | "success";
export type Place = "terraza" | "interior";

export type ReservationData = {
  name: string;
  guests: number;
  date: Date | null;
  time: string;
  place: Place | null;
};

const STEP_ORDER: Step[] = ["name", "guests", "date", "time", "place", "success"];

export default function ReservationFlow(): React.JSX.Element {
  const [currentStep, setCurrentStep] = useState<Step>("name");
  const [data, setData] = useState<ReservationData>({
    name: "",
    guests: 2,
    date: null,
    time: "",
    place: null,
  });

  function handleName(name: string): void {
    setData((d) => ({ ...d, name }));
    setCurrentStep("guests");
  }

  function handleGuests(guests: number): void {
    setData((d) => ({ ...d, guests }));
    setCurrentStep("date");
  }

  function handleDate(date: Date): void {
    setData((d) => ({ ...d, date }));
    setCurrentStep("time");
  }

  function handleTime(time: string): void {
    setData((d) => ({ ...d, time }));
    setCurrentStep("place");
  }

  function handlePlace(place: Place): void {
    setData((d) => ({ ...d, place }));
    setCurrentStep("success");
  }

  function handleTimelineClick(step: Step): void {
    const clickIndex = STEP_ORDER.indexOf(step);
    const curIndex = STEP_ORDER.indexOf(currentStep);
    if (clickIndex < curIndex) setCurrentStep(step);
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles.stepWrapper} key={currentStep}>
          {currentStep === "name" && (
            <StepName initialValue={data.name} onComplete={handleName} />
          )}
          {currentStep === "guests" && (
            <StepGuests initialValue={data.guests} onComplete={handleGuests} />
          )}
          {currentStep === "date" && (
            <StepCalendar initialDate={data.date} onComplete={handleDate} />
          )}
          {currentStep === "time" && (
            <StepTime initialTime={data.time} onComplete={handleTime} />
          )}
          {currentStep === "place" && <StepPlace onComplete={handlePlace} />}
          {currentStep === "success" && <StepSuccess data={data} />}
        </div>
      </div>

      {currentStep !== "success" && (
        <ProgressTimeline
          currentStep={currentStep}
          data={data}
          onStepClick={handleTimelineClick}
        />
      )}
    </main>
  );
}
