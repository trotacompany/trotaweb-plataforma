import { JSX } from "preact/jsx-runtime";

interface Props {
  name: string;
  size?: number;
  className?: string;
  title?: string;
  ariaHidden?: boolean;
}

export const MaterialIconFilled = ({
  name,
  className = "",
  size = 24,
  title,
  ariaHidden = false,
}: Props): JSX.Element => {
  const classes = `material-icons fill material-symbols-rounded ${className}`.trim();
  
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

export default MaterialIconFilled;