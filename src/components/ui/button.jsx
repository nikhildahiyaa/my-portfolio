// src/components/ui/button.jsx
import React from "react";

export const Button = React.forwardRef(
  ({ variant = "outline", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-600",
      outline:
        "bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700",
      ghost:
        "bg-transparent text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 border border-transparent",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant] ?? variants.outline} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
