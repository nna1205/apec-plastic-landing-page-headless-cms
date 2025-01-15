import React from "react";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "outline"; // Define available variants
  children: React.ReactNode;
  className?: string; // Allow additional class names
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Include standard button attributes

const Button: React.FC<ButtonProps> = ({
  variant = "primary", // Default to 'primary' variant
  children,
  className = "", // Default empty string for custom className
  ...rest
}) => {
  // Define class names based on the variant
  const getVariantClassName = (variant: ButtonProps["variant"]) => {
    switch (variant) {
      case "primary":
        return "bg-green-800 rounded-md px-3 py-2 text-sm text-wrap lg:px-9 lg:py-3 text-white lg:text-2xl font-bold";
      case "secondary":
        return "bg-green-400 rounded-md px-3 py-2 text-sm text-wrap lg:px-9 lg:py-3 text-white lg:text-2xl font-bold";
      case "outline":
        return "bg-transparent border border-slate-300 box-border rounded-md px-3 py-2 text-sm text-wrap lg:px-9 lg:py-3 lg:text-2xl font-bold";
      default:
        return "";
    }
  };

  // Combine base classes with variant and custom classes
  const buttonClassName =
    `px-4 py-2 rounded focus:outline-none focus:ring transition-all ${getVariantClassName(
      variant
    )} ${className}`.trim();

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;
