const Title = ({ children, level = 1, className = "" }) => {
    const safeLevel = Number.isInteger(level) && level >= 1 && level <= 6 ? level : 1;
    const Tag = `h${safeLevel}`;
    
    const baseStyles = "font-instrument font-bold text-title tracking-tight";

    const sizes = {
        1: "text-4xl md:text-5xl",
        2: "text-3xl md:text-4xl",
        3: "text-2xl md:text-3xl",
        4: "text-xl md:text-2xl",
        5: "text-lg md:text-xl",
        6: "text-base md:text-lg",
    };

    const shadowClass = safeLevel <= 2 ? "drop-shadow-[0_4px_4px_rgba(0,0,0,0.12)]" : "";
    const sizeClass = sizes[safeLevel] ?? sizes[1];

    return (
        <Tag className={`${baseStyles} ${sizeClass} ${shadowClass} ${className}`}>
            {children}
        </Tag>
    );
};

export default Title;