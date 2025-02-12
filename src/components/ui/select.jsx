import { cn } from "@/lib/utils";

export const Select = ({ 
  className, 
  children, 
  placeholder, 
  value, 
  onChange,
  ...props 
}) => {
  return (
    <select
      className={cn(
        "w-full px-3 py-2 rounded-xl border border-input bg-transparent",
        "text-base md:text-sm",
        "focus:outline-none focus:ring-2 focus:ring-indigo/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      value={value}
      onChange={onChange}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  );
}; 