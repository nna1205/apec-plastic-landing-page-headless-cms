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
  // Base styles for the button
  const baseStyles =
    "min-w-[48px] min-h-[48px] px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-2xl font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

  // Variant-specific styles
  const variantStyles = {
    primary: "bg-green-800 text-white hover:bg-green-700 focus:ring-green-500",
    secondary: "bg-green-400 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline:
      "bg-transparent border border-gray-600 text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  };

  // Combine base styles, variant styles, and any additional className
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button className={combinedClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;
