import Card from '../Card/Card';
import Alert from '../Alert/Alert';

function List({
  items = [],
  onViewDetails,
  onToggleFavorite,
  emptyMessage = 'No hay juegos para mostrar.', //Cambiar para i18n, no se saca empty msj por compatibilidad
  className = '',
}) {
  if (items.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <Alert type="info" message={emptyMessage} />
      </div>
    );
  }

  return (
    <ul className={`grid grid-cols-[repeat(auto-fit,200px)] justify-center gap-x-4 gap-y-4 ${className}`}>
      {items.map((item) => (
        <li key={item.id} className="flex justify-center">
          <Card
            image={item.image}
            name={item.name}
            category={item.category}
            isFavorite={item.isFavorite}
            onViewDetails={() => onViewDetails?.(item)}
            onToggleFavorite={() => onToggleFavorite?.(item.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default List;