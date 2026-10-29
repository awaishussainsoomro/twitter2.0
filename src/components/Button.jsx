
function Button({
  children,
  type = "button",
  bgColor = "bg-sky-500",
  textColor = "text-white",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-6 py-2.5 rounded-full font-semibold transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${bgColor} ${textColor} ${className}`}
      {...props}>
        {children}
      </button>
  );
}

export default Button;
