import Image from "next/image";

// A prototype screenshot with light and dark variants; CSS shows the one for the current theme.
export function Shot({
  name,
  alt,
  width = 2880,
  height = 1800,
  sizes = "(min-width: 1200px) 1100px, 100vw",
  priority = false,
  className = "",
}: {
  name: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const common = { width, height, sizes, priority, quality: 85 };
  return (
    <>
      <Image src={`/shots/light-${name}.webp`} alt={alt} {...common} className={`only-light h-auto w-full ${className}`} />
      <Image src={`/shots/dark-${name}.webp`} alt={alt} {...common} className={`only-dark h-auto w-full ${className}`} />
    </>
  );
}

// Glass edge around a screenshot; the screenshots already carry the app's own header and window controls.
export function WindowFrame({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={`glass-window overflow-hidden rounded-[12px] p-1 sm:rounded-[20px] sm:p-1.5 [&_img]:rounded-[8px] sm:[&_img]:rounded-[14px] ${className}`}
    >
      {children}
    </div>
  );
}
