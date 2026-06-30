import Image from "next/image";

type LogoProps = {
  className?: string;
  showText?: boolean;
};

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm border border-gold/30 bg-black">
        <Image
          src="/logo.svg"
          alt="Bella Roca General Contractors logo"
          fill
          className="object-contain p-1"
          priority
        />
      </div>
      {showText && (
        <div className="leading-tight">
          <p className="font-display text-lg tracking-[0.2em] text-white uppercase">
            Bella Roca
          </p>
          <p className="text-[10px] tracking-[0.25em] text-gold uppercase">
            General Contractors
          </p>
        </div>
      )}
    </div>
  );
}
