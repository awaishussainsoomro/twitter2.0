import React, { useId } from "react";

function Input({ label, type = "text", className = "", error, ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full flex flex-col gap-1 mb-4">
      {label && (
        <label className="text-sm font-medium text-slate-300" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-lg px-4 py-3 text-white placeholder-slate-500 outline-none transition-all ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}

export default React.forwardRef(Input);
