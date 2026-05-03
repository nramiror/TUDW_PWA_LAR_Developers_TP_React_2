import { useTranslation } from 'react-i18next';
import List from '../../Components/List/List';
import Alert from '../../Components/Alert/Alert';
import Title from '../../Components/Title/Title';

const Favorites = ({ games = [], onViewDetails, onToggleFavorite }) => {
  const { t } = useTranslation();
  const favoritesTitle = t('favorites.title');
  const favoritesDescription = t('favorites.description');
  const emptyMessage = t('favorites.empty');
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 pb-10 pt-8 sm:px-8 lg:px-24">
      <div className="w-full pl-3 text-left sm:pl-4">
        <Title level={2} className="text-left">
          {favoritesTitle}
        </Title>
        <p className="mt-2 font-comfortaa text-sm text-secondary">
          {favoritesDescription}
        </p>
      </div>

      {games.length === 0 ? (
        <div className="w-full">
          <Alert type="info" message={emptyMessage} />
        </div>
      ) : (
        <List
          items={games}
          onViewDetails={onViewDetails}
          onToggleFavorite={onToggleFavorite}
          className="w-full"
        />
      )}
    </div>
  );
};

export default Favorites;
