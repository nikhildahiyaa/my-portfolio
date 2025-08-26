import * as React from "react";
export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={
        "w-full px-3 py-2 rounded-md border min-h-[100px] focus:outline-none focus:ring-2 " +
        "border-slate-200 dark:border-slate-700 focus:ring-indigo-500 " + className
      }
      {...props}
    />
  );
}
