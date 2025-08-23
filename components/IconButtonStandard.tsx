// components/IconButtonStandard.tsx
import { JSX } from "preact";
import MaterialIconFilled from "../islands/MaterialIconFilled.tsx";

interface IconButtonStandardProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  icon?: string;
}

export function IconButtonStandard({
  icon,
  children,
  class: className,
  ...props
}: IconButtonStandardProps) {
  return (
    <button
      {...props}
      class={`icon-btn standard ${className ?? ""}`.trim()}
      disabled={props.disabled}
      type={props.type ?? "button"}
    >
      {icon ? <MaterialIconFilled name={icon} /> : children}
    </button>
  );
}