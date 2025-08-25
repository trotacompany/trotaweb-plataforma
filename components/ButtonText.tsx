// components/ButtonText.tsx
import { JSX } from "preact";
import MaterialIconFilled from "../islands/MaterialIconFilled.tsx";

interface ButtonTextProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  icon?: string;  // Prop opcional para el nombre del icono
}

export function ButtonText({
  icon,
  children,
  class: className,  // Renombramos class para evitar conflictos
  ...props
}: ButtonTextProps) {
  return (
    <button
      {...props}
      className={`btn text ${className ?? ""}`.trim()}  // Manejo más seguro de clases
      disabled={props.disabled}
      type={props.type ?? "button"}
    >
      {icon && <MaterialIconFilled name={icon} />}  {/* Icono opcional */}
      {children}  {/* Contenido del botón */}
    </button>
  );
}