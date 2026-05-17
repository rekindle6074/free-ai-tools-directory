import { cn } from "../../lib/utils";
import { ReactNode } from "react";

interface GridBackgroundProps {
  children?: ReactNode;
  className?: string;
}

export const GridBackground = ({ children, className }: GridBackgroundProps) => {
  return (
    <div className={cn("min-h-screen w-full relative overflow-hidden", className)}>
      {/* Magenta Orb Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "white",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
