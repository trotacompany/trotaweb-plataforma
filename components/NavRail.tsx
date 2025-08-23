// components/NavRail.tsx
import { IconButtonStandard } from "./IconButtonStandard.tsx";
import { JSX } from "preact/jsx-runtime";

interface AppBarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  header?: JSX.Element;
  items?: JSX.Element;
}
export default function NavRail({
  header,
  items,
  ...props
}: AppBarProps) {
  return (
    <>
      <div class="comp-navrail" {...props}>
        <div>
          <IconButtonStandard icon="menu"></IconButtonStandard>
        </div>
        {header && <div class="">{header}</div>}
        {items && <div class="">{items}</div>}
      </div>
    </>
  );
}
