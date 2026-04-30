import Title from '../Title/Title';

function Card({ image, title, category, onViewDetails }) {
  return (
    <article
      role={onViewDetails ? 'button' : undefined}
      tabIndex={onViewDetails ? 0 : undefined}
      onClick={onViewDetails}
      onKeyDown={(e) => {
        if (!onViewDetails) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onViewDetails();
        }
      }}
      className="flex flex-col overflow-hidden rounded-md border border-primary/20 bg-white transition hover:border-primary/40 max-w-[200px] w-full mx-auto cursor-pointer focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1"
      style={{ boxShadow: '-4px 4px 8px rgba(30, 58, 95, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06)' }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-brand-light">
        {image ? (
          <img
            src={image}
            alt={title || 'Juego de mesa'}
            className="h-full w-full object-cover transition hover:scale-105"
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
        <Title level={5} className="text-sm font-semibold text-[#3A8FB7] line-clamp-2">
          {title || 'Título del juego'}
        </Title>

        {/* Category */}
        <p className="font-instrument text-[11px] text-secondary">
          <span className="font-semibold">Categoría:</span> {category || 'Sin categoría'}
        </p>

        {/* Spacer */}
        <div className="flex-1" />
      </div>
    </article>
  );
}

export default Card;
