// components/NavRailItem.tsx
import MaterialIcon from "../islands/MaterialIcon.tsx";
import { JSX } from "preact/jsx-runtime";

interface NavRailItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
  icon: string;
  text?: string;
}
export default function NavRailItem({
  icon,
  text,
  children,
  ...props
}: NavRailItemProps) {
  return (
    <>
      <div {...props} class={`item ${props.class}`}>
        <button type="button">
          <div class="icon">
            <MaterialIcon name={icon}></MaterialIcon>
          </div>{" "}
          <span class="text">{text || children}</span>
        </button>
      </div>
    </>
  );
}
