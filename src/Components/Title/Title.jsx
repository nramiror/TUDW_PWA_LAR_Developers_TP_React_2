const Title = ({ children, level = 1, className = "" }) => {
    const Tag = `h${level}`;
    
    const baseStyles = "font-instrument font-bold text-title tracking-tight";

    const sizes = {
        1: "text-4xl md:text-5xl", 
        2: "text-2xl md:text-3xl", 
        3: "text-xl",              
    };

    const shadowClass = level === 1 ? "drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)]" : "";

    return (
        <Tag className={`${baseStyles} ${sizes[level]} ${shadowClass} ${className}`}>
            {children}
        </Tag>
    );
};

export default Title;