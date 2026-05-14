"use client";

interface Props {
  readonly className?: string;
  readonly children: React.ReactNode;
}

export default function DemoCtaButton({ className, children }: Props): React.JSX.Element {
  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent("demo:unavailable"));
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
