import React, { useState } from 'react';

const Button = ({ text = "Button", variant = "primary", disabled = false, onClick }) => {
    const [isPressed, setIsPressed] = useState(false);

    const baseClasses = "font-bold rounded-[20px] px-8 py-2.5 transition-all duration-200 focus:outline-none active:scale-95 font-['Comfortaa'] text-sm tracking-wide";

    let variantClasses = "";

    if (disabled) {
        variantClasses = "bg-gray-200 text-gray-400 cursor-not-allowed border-transparent";
    } else if (variant === "primary") {
        variantClasses = isPressed ? "bg-[#1E3A5F] text-[#6AA6CE]" : "bg-[#6AA6CE] text-[#1E3A5F] hover:opacity-90 shadow-sm";
    } else if (variant === "secondary") {
        variantClasses = isPressed ? "bg-white text-[#6AA6CE]": "bg-[#1E3A5F] text-white hover:bg-opacity-90 shadow-sm";
    }

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            onMouseDown={() => !disabled && setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            className={`${baseClasses} ${variantClasses}`}
        >
            {text}
        </button>
    );
};

export default Button;