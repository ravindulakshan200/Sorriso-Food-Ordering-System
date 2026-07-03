import { InputHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = "text", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    
    // Check if input has value (handled via standard controlled/uncontrolled behavior)
    // For styling purposes, we primarily rely on `peer` in Tailwind

    return (
      <div className="relative mb-6">
        <input
          type={type}
          ref={ref}
          className={cn(
            "peer w-full bg-card border-b-2 border-white/20 px-4 pt-6 pb-2 text-white font-body text-base outline-none transition-all placeholder-transparent",
            "focus:border-accent focus:bg-white/5",
            error ? "border-red-500" : "",
            className
          )}
          placeholder={label}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        <label
          className={cn(
            "absolute left-4 top-2 text-xs font-accent tracking-widest uppercase transition-all pointer-events-none",
            "peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-body peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-text-muted",
            "peer-focus:top-2 peer-focus:text-xs peer-focus:font-accent peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-accent",
            error ? "text-red-500 peer-focus:text-red-500" : "text-text-muted",
            (isFocused || props.value) && !error ? "text-accent" : ""
          )}
        >
          {label}
        </label>
        {error && (
          <span className="absolute -bottom-5 left-0 text-xs text-red-500 font-body">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
