import * as React from "react";
export function Badge({ className = "", children, ...props }) {
  return (
    <span
      className={
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border " + className
      }
      {...props}
    >
      {children}
    </span>
  );
}
