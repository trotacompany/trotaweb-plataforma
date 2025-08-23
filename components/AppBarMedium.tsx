// components/AppBarMedium.tsx
import { JSX } from "preact/jsx-runtime";

interface AppBarMediumProps extends JSX.HTMLAttributes<HTMLDivElement> {
  leading?: JSX.Element;
  trailing?: JSX.Element;
  title?: string;
  subtitle?: string;
}

export default function AppBarMedium({
  leading,
  trailing,
  title,
  subtitle,
  ...props
}: AppBarMediumProps) {
  return (
    <div class="comp-appbar medium" {...props}>
      <div class="top">
        {leading && <div class="leading">{leading}</div>}
        <div></div> {/* Espacio intermedio */}
        {trailing && <div class="trailing">{trailing}</div>}
      </div>
      
      {(title || subtitle) && (
        <div class="title-group">
          {title && <h3 class="title">{title}</h3>}
          {subtitle && <h4 class="subtitle">{subtitle}</h4>}
        </div>
      )}
    </div>
  );
}