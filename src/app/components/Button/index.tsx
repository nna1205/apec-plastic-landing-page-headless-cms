import React from "react";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "outline"; // Define available variants
  children: React.ReactNode;
  className?: string; // Allow additional class names
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Include standard button attributes

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...rest
}) => {
  const getVariantClassName = (variant: ButtonProps["variant"]) => {
    switch (variant) {
      case "primary":
        return "bg-green-800 text-white font-bold";
      case "secondary":
        return "bg-green-400 text-white font-bold";
      case "outline":
        return "bg-transparent box-border border border-slate-300 text-black font-bold";
      default:
        return "";
    }
  };

  return (
    <button
      className={`inline-flex items-center justify-center min-w-[48px] min-h-[48px] text-sm lg:text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all px-4 py-2 lg:px-6 lg:py-3 ${getVariantClassName(
        variant
      )} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
