interface MaterialIconProps {
  name: string;
  size?: number;
  className?: string;
}
export default function MaterialIconFilled({ name,className, size = 24 }: MaterialIconProps) {
  return (
    
    <span class={`material-icons fill material-symbols-rounded ${className || ''}`}
      style={{
        fontSize: `${size}px`,
        width: `${size}px`,
        height: `${size}px`,
        userSelect: "none",
      }}>
      {name}
    </span>
  );
}
