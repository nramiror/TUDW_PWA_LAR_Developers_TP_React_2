import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import Loader from '../../Components/Loader/Loader';
import Alert from '../../Components/Alert/Alert';
import { getBoardGameById } from '../../services/boardgames';

const ItemDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const initialItem = location.state?.item && String(location.state.item.id) === String(id)
    ? location.state.item
    : null;
  const [item, setItem] = useState(initialItem);
  const [loading, setLoading] = useState(!initialItem);
  const [error, setError] = useState(false);

  const formatFieldLabel = (key) => {
    const normalizedKey = key.replace(/[_\s-]/g, '').toLowerCase();

    const labelMap = {
      name: t('itemDetail.labels.name'),
      category: t('itemDetail.labels.category'),
      description: t('itemDetail.labels.description'),
      image: t('itemDetail.labels.image'),
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
      return value ? t('itemDetail.values.yes') : t('itemDetail.values.no');
    }

    return value === null || value === undefined || value === '' ? t('itemDetail.values.noData') : String(value);
  };

  const loadingMessage = t('itemDetail.loading');
  const errorMessage = t('itemDetail.errorFetch');
  const notFoundMessage = t('itemDetail.errorNotFound');

  useEffect(() => {
    const stateItem = location.state?.item;
    if (stateItem && String(stateItem.id) === String(id)) {
      setItem(stateItem);
      setLoading(false);
      setError(false);
      return;
    }

    let isMounted = true;

    const loadItem = async () => {
      setLoading(true);
      setError(false);

      try {
        const game = await getBoardGameById(id);

        if (isMounted) {
          setItem(game);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(true);
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

    return Object.entries(item)
      .filter(([key]) => key !== 'id' && key !== 'image' && key !== 'isFavorite')
      .map(([key, value]) => [formatFieldLabel(key), formatFieldValue(value)]);
  }, [item, t]);

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-7xl justify-center px-4 pb-10 pt-8 sm:px-8 lg:px-24">
        <Loader message={loadingMessage} />
      </div>
    );
  }

  if (error || !item) {
    const displayError = error ? errorMessage : notFoundMessage;
    return (
      <div className="mx-auto flex w-full max-w-7xl justify-center px-4 pb-10 pt-8 sm:px-8 lg:px-24">
        <Alert type="error" message={displayError} />
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-8 sm:px-8 lg:px-24">
      <div className="relative z-10">
        <Card
          variant="detail"
          image={item.image}
          title={item.name || item.title || 'Detalle del juego'}
          category={item.category}
          detailEntries={detailEntries}
        />
      </div>

        <img
          src="/DadosFondo.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[-4rem] bottom-[-4rem] w-40 opacity-60 sm:left-[-5rem] sm:bottom-[-5rem] sm:w-56 lg:left-[-6rem] lg:bottom-[-10rem] lg:w-72 z-0"
        />
    </div>
  );
};

export default ItemDetail;