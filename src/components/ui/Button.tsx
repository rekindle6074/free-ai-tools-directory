import React, { forwardRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ label, onClick, className, variant = 'primary', size = 'lg', to, href, showIcon = true, icon, ...props }, ref) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
      onClick?.(e as any);
    };

    const sizeClasses = {
      sm: "px-4 py-1.5 text-xs sm:text-sm rounded-full",
      md: "px-6 py-3 text-base rounded-xl",
      lg: "px-8 py-4 text-lg rounded-2xl"
    };

    const commonClasses = cn(
      "glow-btn font-bold text-center flex items-center justify-center gap-2",
      sizeClasses[size],
      variant === 'primary' ? "glow-btn-primary" : "glow-btn-secondary",
      className
    );

    const content = (
      <span className="flex items-center justify-center gap-1.5">
        {label}
        {showIcon && (
          <span className="opacity-80">
            {icon || <Sparkles size={size === 'sm' ? 14 : (size === 'md' ? 16 : 18)} className="ml-0.5" />}
          </span>
        )}
      </span>
    );

    if (to) {
      return (
        <Link
          to={to}
          className={commonClasses}
          onClick={handleClick as any}
          data-state={isClicked ? "clicked" : undefined}
        >
          {content}
        </Link>
      );
    }

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={commonClasses}
          onClick={handleClick as any}
          data-state={isClicked ? "clicked" : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        {...props}
        ref={ref as any}
        type="button"
        aria-label={label}
        className={commonClasses}
        onClick={handleClick}
        data-state={isClicked ? "clicked" : undefined}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
