
const FavIcon = ({ variant = "nav", isFavorite = false, onClick}) => {
  
  const navStyles = "bg-secondary text-white border-secondary hover:bg-white hover:text-secondary";

  
  const cardStyles = "bg-white text-secondary border-primary/20 hover:border-primary";

  const baseCircle = "flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 cursor-pointer shadow-sm";
  const isNavVariant = variant === 'nav';
  const isFilled = isNavVariant || isFavorite;

  return (
    <div 
      onClick={onClick}
      className={`${baseCircle} ${variant === 'nav' ? navStyles : cardStyles}`}
    >
      <span 
        className="material-symbols-rounded select-none transition-colors duration-300"
        style={{ 
          fontSize: isNavVariant ? '28px' : '24px',
          fontVariationSettings: `'FILL' ${isFilled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${isNavVariant ? 28 : 24}`
        }}
      >
        star
      </span>
    </div>
  );
};

export default FavIcon;