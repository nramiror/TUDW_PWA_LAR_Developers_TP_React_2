import { Link } from 'react-router-dom';

const FavIcon = ({ variant = "nav", isFavorite = false, onClick, to, ariaLabel = "Favoritos" }) => {
  const navStyles = "bg-secondary text-white border-secondary hover:bg-white hover:text-secondary";
  const cardStyles = "bg-white text-secondary border-primary/20 hover:border-primary";
  const baseCircle = "inline-flex items-center justify-center w-10 h-10 rounded-full border shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2";
  const isNavVariant = variant === 'nav';
  const isFilled = isNavVariant || isFavorite;
  const iconSize = isNavVariant ? '28px' : '24px';

  const icon = (
    <span
      className="material-symbols-rounded select-none transition-colors duration-300"
      style={{
        fontSize: iconSize,
        fontVariationSettings: `'FILL' ${isFilled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${isNavVariant ? 28 : 24}`,
      }}
    >
      star
    </span>
  );

  const sharedClasses = `${baseCircle} ${isNavVariant ? navStyles : cardStyles}`;

  if (to) {
    return (
      <Link to={to} aria-label={ariaLabel} className={sharedClasses}>
        {icon}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={sharedClasses}>
      {icon}
    </button>
  );
};

export default FavIcon;