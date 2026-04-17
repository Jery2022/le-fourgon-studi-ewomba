import React from "react";

// ══════════════════════════════════════════════
//  Design System — Le Fourgon
//  Composants UI de base
// ══════════════════════════════════════════════

// ── Button ──

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-fourgon-vert-foret text-white hover:bg-fourgon-vert-prairie active:bg-fourgon-vert-foret focus-visible:ring-fourgon-vert-prairie",
  secondary:
    "bg-fourgon-vert-clair text-fourgon-vert-foret hover:bg-fourgon-vert-menthe active:bg-fourgon-vert-clair focus-visible:ring-fourgon-vert-foret",
  outline:
    "border-2 border-fourgon-vert-foret text-fourgon-vert-foret hover:bg-fourgon-vert-clair active:bg-fourgon-vert-menthe focus-visible:ring-fourgon-vert-foret",
  ghost:
    "text-fourgon-vert-foret hover:bg-fourgon-vert-clair active:bg-fourgon-vert-menthe focus-visible:ring-fourgon-vert-foret",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-body-sm gap-1.5",
  md: "px-5 py-2.5 text-body-md gap-2",
  lg: "px-7 py-3.5 text-body-lg gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center font-body font-semibold rounded-xl",
        "transition-all duration-250 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : leftIcon ? (
        leftIcon
      ) : null}
      {children}
      {rightIcon && !isLoading ? rightIcon : null}
    </button>
  );
}

// ── Container ──

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const containerSizes: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export function Container({ children, className = "", size = "xl" }: ContainerProps) {
  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${containerSizes[size]} ${className}`}>
      {children}
    </div>
  );
}

// ── Badge ──

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "blue" | "orange" | "gray";
  className?: string;
}

const badgeVariants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  green: "bg-fourgon-vert-clair text-fourgon-vert-foret",
  blue: "bg-fourgon-bleu-glace text-fourgon-bleu-ocean",
  orange: "bg-fourgon-orange-clair text-fourgon-orange",
  gray: "bg-fourgon-gris-clair text-fourgon-gris-fonce",
};

export function Badge({ children, variant = "green", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-semibold",
        badgeVariants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

// ── Card ──

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export function Card({ children, className = "", hover = false, padding = "md" }: CardProps) {
  const paddings = { sm: "p-4", md: "p-6", lg: "p-8" };
  return (
    <div
      className={[
        "bg-white rounded-2xl shadow-card",
        hover && "hover:shadow-card-hover transition-shadow duration-350",
        paddings[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
