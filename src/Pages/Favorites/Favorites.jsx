import List from '../../Components/List/List';
import Alert from '../../Components/Alert/Alert';
import Title from '../../Components/Title/Title';

const Favorites = ({ games = [], onViewDetails, onToggleFavorite }) => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-16 pb-10 pt-0">
      <div className="w-full text-left">
        <Title level={2} className="text-left">
          Favoritos
        </Title>
        <p className="mt-2 font-comfortaa text-sm text-secondary">
          Todos tus favoritos se encuentran en esta sección.
        </p>
      </div>

      {games.length === 0 ? (
        <div className="w-full">
          <Alert type="info" message="Aún no guardaste juegos en favoritos." />
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
