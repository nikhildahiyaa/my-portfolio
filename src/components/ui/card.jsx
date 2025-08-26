import * as React from "react";
export function Card({ className = "", children, ...props }) {
  return (
    <div className={"rounded-2xl border bg-white/80 dark:bg-slate-900/70 " + className} {...props}>
      {children}
    </div>
  );
}
export function CardHeader({ className = "", children }) {
  return <div className={"p-4 sm:p-5 " + className}>{children}</div>;
}
export function CardTitle({ className = "", children }) {
  return <h3 className={"text-lg font-semibold " + className}>{children}</h3>;
}
export function CardDescription({ className = "", children }) {
  return <p className={"text-sm text-slate-600 dark:text-slate-400 " + className}>{children}</p>;
}
export function CardContent({ className = "", children }) {
  return <div className={"p-4 sm:p-5 " + className}>{children}</div>;
}
