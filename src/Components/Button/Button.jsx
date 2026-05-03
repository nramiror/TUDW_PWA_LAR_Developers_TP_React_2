const Button = ({
    children,
    text = 'Botón',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    onClick,
    type = 'button',
    className = '',
    leftIcon,
    rightIcon,
    ariaLabel,
    ...restProps
}) => {
    const baseStyles = [
        'inline-flex items-center justify-center gap-2 rounded-[var(--radius-border)] font-instrument font-bold',
        'transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2',
    ].join(' ');

    const variants = {
        primary: 'bg-primary text-secondary hover:brightness-110 shadow-sm',
        secondary: 'bg-secondary text-white hover:bg-opacity-90 shadow-sm',
        outline: 'border-2 border-primary text-secondary hover:bg-primary/5',
        ghost: 'text-secondary hover:bg-secondary/5',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-8 py-2.5 text-base',
        lg: 'px-10 py-3 text-lg',
    };

    const content = children ?? text;
    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            aria-label={ariaLabel}
            {...restProps}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${widthClass} ${className}`}
        >
            {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
            <span>{content}</span>
            {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
        </button>
    );
};

export default Button;