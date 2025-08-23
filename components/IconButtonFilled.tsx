// components/IconButtonFilled.tsx
import { JSX } from "preact";
import MaterialIconFilled from "../islands/MaterialIconFilled.tsx";

interface IconButtonFilledProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  icon?: string;
}

export function IconButtonFilled({
  icon,
  children,
  class: className,
  ...props
}: IconButtonFilledProps) {
  return (
    <button
      {...props}
      class={`icon-btn filled ${className ?? ""}`.trim()}
      disabled={props.disabled}
      type={props.type ?? "button"}
    >
      {icon ? <MaterialIconFilled name={icon} /> : children}
    </button>
  );
}