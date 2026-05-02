import Card from '../Card/Card';

function List({
  items = [],
  onViewDetails,
  onToggleFavorite,
  emptyMessage = 'No hay juegos para mostrar.',
  className = '',
}) {
  if (items.length === 0) {
    return (
      <div className={`w-full rounded-lg border border-dashed border-primary/30 bg-white/70 px-6 py-10 text-center ${className}`}>
        <p className="font-instrument text-sm text-secondary">{emptyMessage}</p>
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
            onViewDetails={() => onViewDetails?.(item.id)}
            onToggleFavorite={() => onToggleFavorite?.(item.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default List;