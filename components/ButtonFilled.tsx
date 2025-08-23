// components/ButtonFilled.tsx
import { JSX } from "preact";
import MaterialIconFilled from "../islands/MaterialIconFilled.tsx";

interface ButtonFilledProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  icon?: string;
  text?: string;
}

export function ButtonFilled({
  icon,
  text,
  children,
  ...props
}: ButtonFilledProps) {
  return (
    <button
      {...props}
      class={`btn filled ${props.class ?? ""}`}
      disabled={props.disabled}
      type={props.type ?? "button"}
    >
      {icon && <MaterialIconFilled name={icon} />}
      {text || children}
    </button>
  );
}