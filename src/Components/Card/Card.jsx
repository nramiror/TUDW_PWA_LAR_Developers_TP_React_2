import FavIcon from '../FavIcon/FavIcon';
import Title from '../Title/Title';

function Card({
  image,
  title,
  category,
  onViewDetails,
  onToggleFavorite,
  isFavorite = false,
}) {
  const isInteractive = typeof onViewDetails === 'function';

  const cardClasses = [
    'flex h-full w-full flex-col overflow-hidden rounded-md border border-primary/20 bg-white max-w-[200px] mx-auto',
    'shadow-[-4px_4px_8px_rgba(30,58,95,0.12),0_2px_4px_rgba(0,0,0,0.06)]',
  ].join(' ');

  const interactiveClasses = [
    cardClasses,
    'cursor-pointer transition hover:border-primary/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1',
  ].join(' ');

  const content = (
    <>
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-brand-light">
        {image ? (
          <img
            src={image}
            alt={title || 'Juego de mesa'}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-light to-brand-bg">
            <span className="text-sm text-secondary/50">Sin imagen</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col gap-1 p-2.5">
        {/* Title */}
        <Title level={5} className="text-sm font-semibold line-clamp-2">
          {title || 'Título del juego'}
        </Title>

        {/* Category */}
        <p className="font-instrument text-[11px] text-secondary">
          <span className="font-semibold">Categoría:</span> {category || 'Sin categoría'}
        </p>

        {/* Spacer */}
        <div className="flex-1" />
      </div>
    </>
  );

  return (
    <article className="relative max-w-[200px] w-full mx-auto">
      {isInteractive ? (
        <button type="button" onClick={onViewDetails} className={`${interactiveClasses} group`}>
          {content}
        </button>
      ) : (
        <div className={cardClasses}>{content}</div>
      )}

      {typeof onToggleFavorite === 'function' ? (
        <div className="absolute right-2 top-2 z-10">
          <FavIcon
            variant="card"
            isFavorite={isFavorite}
            onClick={onToggleFavorite}
            ariaLabel={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          />
        </div>
      ) : null}
    </article>
  );
}

export default Card;
