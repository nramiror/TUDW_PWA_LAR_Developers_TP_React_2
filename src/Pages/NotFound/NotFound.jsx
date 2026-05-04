import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Title from '../../Components/Title/Title';

const NotFound = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const notFoundMessage = t('NOT FOUND');
    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 pb-10 pt-8 sm:px-8 lg:px-24">
            <div className="mt-6 w-full pl-3 text-center sm:pl-4">
                <Title>{notFoundMessage}</Title>
                <p className="text-secondary/60">Error 404</p>
                <img
                    src="/LogoNotFound.png"
                    alt=""
                    aria-hidden="true"
                    className="mx-auto mb-4 w-24 opacity-40 sm:w-[3.75rem] lg:w-20"
                />
            </div>
            
        </div>
    );
}

export default NotFound;