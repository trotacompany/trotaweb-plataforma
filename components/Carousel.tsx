// components/Carousel.tsx
import { JSX } from "preact/jsx-runtime";

interface CarouselProps extends JSX.HTMLAttributes<HTMLDivElement> {
  items?: JSX.Element;
}

export default function Carousel({
  items,
  ...props
}: CarouselProps) {
  return (
    <div class="comp-carousel" {...props}>
        {items && <>{items}</>}
    </div>
  );
}