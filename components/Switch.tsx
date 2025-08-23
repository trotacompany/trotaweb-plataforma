// components/Switch.tsx
import { JSX } from "preact";

interface SwitchProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  OnChange?: (selected: boolean) => void;
}

export function Switch({
  selected = false,
  OnChange,
  class: className,
  ...props
}: SwitchProps) {
  const handleClick = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    OnChange?.(!selected);
    // Permite seguir usando onClick si es necesario
    props.onClick?.(e);
  };

  return (
    <button
      {...props}
      class={`comp-switch ${selected ? 'selected' : ''} ${className ?? ''}`.trim()}
      aria-checked={selected}
      role="switch"
      type="button"
      onClick={handleClick}
    >
      <div class="handle" />
    </button>
  );
}