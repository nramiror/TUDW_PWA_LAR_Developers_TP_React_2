import FavIcon from '../FavIcon/FavIcon';
import Title from '../Title/Title';

function Card({
  image,
  name,
  title,
  category,
  detailEntries = [],
  variant = 'list',
  onViewDetails,
  onToggleFavorite,
  isFavorite = false,
  isDetail = false,
}) {
  const resolvedVariant = isDetail ? 'detail' : variant;
  const isInteractive = typeof onViewDetails === 'function';
  const cardTitle = title || name || 'Nombre del juego'; //Cambiar para i18n

  const cardClasses = [
    'flex h-full w-full flex-col overflow-hidden rounded-md border border-primary/20 bg-white max-w-[200px] mx-auto',
    'shadow-[-4px_4px_8px_rgba(30,58,95,0.12),0_2px_4px_rgba(0,0,0,0.06)]',
  ].join(' ');

  const detailCardClasses = [
    'flex h-full w-full flex-col overflow-hidden rounded-3xl border border-primary/15 bg-white',
    'shadow-[0_16px_40px_rgba(30,58,95,0.12)]',
  ].join(' ');

  const interactiveClasses = [
    cardClasses,
    'cursor-pointer transition hover:scale-105 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1',
  ].join(' ');

  const listContent = (
    <>
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-light">
        {image ? (
          <img
            src={image}
            alt={cardTitle || 'Juego de mesa'}
            className="h-full w-full object-cover transition"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-light to-brand-bg">
            <span className="text-sm text-secondary/50">Sin imagen</span> //Cambiar para i18n
          </div>
        )}
      </div>

      
      <div className="flex flex-1 flex-col gap-1 p-2.5">
        <Title level={5} className="text-sm font-semibold line-clamp-2">
          {cardTitle}
        </Title>

        <p className="font-instrument text-[11px] text-secondary">
          <span className="font-semibold">Categoría:</span> {category || 'Sin categoría'} //Cambiar para i18n
        </p>

        <div className="flex-1" />
      </div>
    </>
  );

  const detailContent = (
    <div className="grid min-h-[300px] grid-cols-1 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="flex flex-col justify-start gap-4 p-5 sm:p-6 lg:p-8">
        <div className="space-y-2">
          <Title level={2} className="text-left">
            {cardTitle}
          </Title>
        </div>

        <div className="space-y-4">
          {detailEntries.map(([key, value]) => (
            <div key={key} className="flex flex-col gap-1 border-b border-primary/10 pb-3 last:border-b-0 last:pb-0">
              <span className="font-instrument text-xs font-semibold uppercase tracking-[0.14em] text-secondary/60">
                {key}
              </span>
              <span className="font-comfortaa text-sm text-secondary">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center bg-white p-4 lg:p-6">
        <div className="w-full max-w-[260px] overflow-hidden rounded-[2rem] border border-primary/10 bg-white aspect-[3/4] shadow-[0_12px_30px_rgba(30,58,95,0.1)]">
          {image ? (
            <img
              src={image}
              alt={cardTitle || 'Juego de mesa'}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-light to-brand-bg">
              <span className="text-sm text-secondary/50">Sin imagen</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <article className={`relative w-full ${resolvedVariant === 'detail' ? 'mx-auto max-w-5xl' : 'max-w-[200px] mx-auto'}`}>
      {resolvedVariant === 'detail' ? (
        <div className={detailCardClasses}>{detailContent}</div>
      ) : (
        <>
          {isInteractive ? (
            <button type="button" onClick={onViewDetails} className={`${interactiveClasses} group`}>
              {listContent}
            </button>
          ) : (
            <div className={cardClasses}>{listContent}</div>
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
        </>
      )}
    </article>
  );
}

export default Card;