import { useTranslation } from 'react-i18next';

const LogIcon = ({ isLoggedIn = false, onClick, ariaLabel = "Autenticación" }) => {

    const { t } = useTranslation();
    const navStyles = "bg-secondary text-white border-secondary hover:bg-white hover:text-secondary";

    const loggedInStyles = "bg-white text-secondary border-secondary hover:bg-secondary hover:text-white shadow-md";

    const baseCircle = "inline-flex items-center justify-center w-10 h-10 rounded-full border shadow-sm transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2";


    const iconName = isLoggedIn ? "logout" : "person";
    const isFilled = isLoggedIn;

    const labelText = isLoggedIn ? t('header.logoutAriaLabel') : t('header.loginAriaLabel');

    const icon = (
        <span
            className="material-symbols-rounded select-none transition-colors duration-300"
            style={{
                fontSize: '28px',
                fontVariationSettings: `'FILL' ${isFilled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 28`,
            }}
        >
            {iconName}
        </span>
    );

    const sharedClasses = `${baseCircle} ${isLoggedIn ? loggedInStyles : navStyles}`;

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={labelText}
            title={labelText}
            className={sharedClasses}
        >
            {icon}
        </button>
    );
};

export default LogIcon;