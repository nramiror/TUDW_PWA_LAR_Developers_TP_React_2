const Button = ({ text = "Botón", variant = "primary", disabled = false, onClick, type = "button", className = "" }) => {

    const baseStyles = "px-8 py-2.5 rounded-border font-instrument font-bold transition-all duration-300 active:scale-95 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-center";

    const variants = {
        primary: "bg-primary text-secondary hover:brightness-110 shadow-sm",
        secondary: "bg-secondary text-white hover:bg-opacity-90 shadow-sm",
        outline: "border-2 border-primary text-secondary hover:bg-primary/5"
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;