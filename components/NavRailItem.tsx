// components/NavRailItem.tsx
import { JSX } from "preact/jsx-runtime";
import MaterialIcon from "../islands/MaterialIcon.tsx";

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
            <MaterialIcon name={icon} title={text} />
          </div>{" "}
          <span class="text">{text || children}</span>
        </button>
      </div>
    </>
  );
}
