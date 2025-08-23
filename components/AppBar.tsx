// components/AppBar.tsx
import { JSX } from "preact/jsx-runtime";

interface AppBarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  leading?: JSX.Element;
  trailing?: JSX.Element;
  titulo?: string;
  subtitulo?: string;
}

export default function AppBar({
  leading,
  trailing,
  titulo,
  subtitulo,
  ...props
}: AppBarProps) {
  return (
    <div class="comp-appbar" {...props}>
      {leading && <div class="leading">{leading}</div>}
      
      {(titulo || subtitulo) && (
        <div class="title-group">
          {titulo && <h3 class="title">{titulo}</h3>}
          {subtitulo && <h4 class="subtitle">{subtitulo}</h4>}
        </div>
      )}
      
      {trailing && <div class="trailing">{trailing}</div>}
    </div>
  );
}