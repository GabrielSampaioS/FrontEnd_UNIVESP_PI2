function Button({
  children,
  type = 'button',
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="button"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;