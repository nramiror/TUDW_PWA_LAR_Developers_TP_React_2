import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Title from '../../Components/Title/Title';
import Loader from '../../Components/Loader/Loader';
import Alert from '../../Components/Alert/Alert';
import { getBoardGameById } from '../../services/boardgames';

const formatFieldLabel = (key) => {
  const normalizedKey = key.replace(/[_\s-]/g, '').toLowerCase();

  const labelMap = {
    name: 'Nombre',
    category: 'Categoría',
    description: 'Descripción',
    minplayers: 'Jugadores mínimos',
    maxplayers: 'Jugadores máximos',
    playingtime: 'Duración',
    minage: 'Edad mínima',
    yearpublished: 'Año de publicación',
    publisher: 'Editorial',
    designer: 'Diseñador',
    image: 'Imagen',
  };

  if (labelMap[normalizedKey]) {
    return labelMap[normalizedKey];
  }

  const label = key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .toLowerCase();

  return label.charAt(0).toUpperCase() + label.slice(1);
};

const formatFieldValue = (value) => {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  if (value && typeof value === 'object') {
    return JSON.stringify(value);
  }

  if (typeof value === 'boolean') {
    return value ? 'Sí' : 'No';
  }

  return value === null || value === undefined || value === '' ? 'Sin dato' : String(value);
};

const ItemDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const initialItem = location.state?.item && String(location.state.item.id) === String(id)
    ? location.state.item
    : null;
  const [item, setItem] = useState(initialItem);
  const [loading, setLoading] = useState(!initialItem);
  const [error, setError] = useState('');

  useEffect(() => {
    const stateItem = location.state?.item;
    if (stateItem && String(stateItem.id) === String(id)) {
      setItem(stateItem);
      setLoading(false);
      setError('');
      return;
    }

    let isMounted = true;

    const loadItem = async () => {
      setLoading(true);
      setError('');

      try {
        const game = await getBoardGameById(id);

        if (isMounted) {
          setItem(game);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError('No pudimos cargar el detalle del juego.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadItem();

    return () => {
      isMounted = false;
    };
  }, [id, location.state]);

  const detailEntries = useMemo(() => {
    if (!item) {
      return [];
    }

    return Object.entries(item).filter(([key]) => key !== 'id' && key !== 'image' && key !== 'isFavorite');
  }, [item]);

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-7xl justify-center px-4 pb-10 pt-8 sm:px-8 lg:px-24">
        <Loader message="Cargando detalle..." />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="mx-auto flex w-full max-w-7xl justify-center px-4 pb-10 pt-8 sm:px-8 lg:px-24">
        <Alert type="error" message={error || 'No encontramos el juego solicitado.'} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-8 sm:px-8 lg:px-24">
      <div className="grid min-h-[calc(100vh-10rem)] grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
        <section className="flex flex-col items-start justify-start gap-6">
          <Title level={2} className="text-left">
            {item.name || 'Detalle del juego'}
          </Title>

          <div className="w-full space-y-3 rounded-2xl border border-primary/15 bg-white/80 p-6 shadow-[0_12px_30px_rgba(30,58,95,0.08)] backdrop-blur-sm">
            {detailEntries.map(([key, value]) => (
              <div key={key} className="flex flex-col gap-1 border-b border-primary/10 pb-3 last:border-b-0 last:pb-0">
                <span className="font-instrument text-xs font-semibold uppercase tracking-[0.14em] text-secondary/60">
                  {formatFieldLabel(key)}
                </span>
                <span className="font-comfortaa text-sm text-secondary">
                  {formatFieldValue(value)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-start justify-center lg:justify-center">
          <div className="w-full max-w-[320px] overflow-hidden rounded-3xl border border-primary/15 bg-white shadow-[0_16px_40px_rgba(30,58,95,0.12)] aspect-[3/4]">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name || 'Juego de mesa'}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[3/4] w-full items-center justify-center bg-gradient-to-br from-brand-light to-brand-bg">
                <span className="text-sm text-secondary/50">Sin imagen</span>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetail;
