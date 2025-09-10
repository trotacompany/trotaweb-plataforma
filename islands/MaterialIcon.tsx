import { JSX } from "preact/jsx-runtime";

interface MaterialIconProps {
  name: string;
  size?: number;
  className?: string;
  title?: string;
  ariaHidden?: boolean;
}

export const MaterialIcon = ({
  name,
  className = "",
  size = 24,
  title,
  ariaHidden = false,
}: MaterialIconProps): JSX.Element => {
  const classes = `material-icons material-symbols-rounded ${className}`.trim();
  
  const style = {
    fontSize: `${size}px`,
    width: `${size}px`,
    height: `${size}px`,
    userSelect: "none" as const,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <span
      class={classes}
      style={style}
      role="img"
      aria-hidden={ariaHidden}
      aria-label={title || name}
      title={title}
    >
      {name}
    </span>
  );
};

export default MaterialIcon;