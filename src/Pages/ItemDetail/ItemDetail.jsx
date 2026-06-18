import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import Loader from '../../Components/Loader/Loader';
import Alert from '../../Components/Alert/Alert';
import { getBoardGameById } from '../../services/boardgames';

const defaultStyles = {
  loaderWrapper: 'mx-auto flex w-full max-w-7xl justify-center px-4 pb-10 pt-8 sm:px-8 lg:px-24',
  container: 'relative mx-auto w-full max-w-7xl px-4 pb-10 pt-8 sm:px-8 lg:px-24',
  cardWrapper: 'relative z-10',
};

const ItemDetail = ({
  containerClassName = defaultStyles.container,
  loaderWrapperClassName = defaultStyles.loaderWrapper,
  cardWrapperClassName = defaultStyles.cardWrapper,
}) => {
  const { id } = useParams();
  const location = useLocation();
  
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');

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

    if (value === typeof 'boolean') {
      return value ? t('itemDetail.values.yes') : t('itemDetail.values.no');
    }

    return value === null || value === undefined || value === '' ? t('itemDetail.values.noData') : String(value);
  };

  const loadingMessage = t('itemDetail.loading');

  useEffect(() => {
    let isMounted = true;

    const loadItem = async () => {
      setLoading(true);
      setError(false);

      try {
        // 2. Pasamos el idioma actual al servicio de la API
        // Si i18n te devuelve 'en', y tu base de datos usa 'eng', podés mapearlo acá: currentLanguage === 'en' ? 'eng' : 'es'
        const apiLanguage = currentLanguage === 'en' ? 'eng' : currentLanguage;
        const game = await getBoardGameById(id, apiLanguage);

        if (isMounted) {
          setItem(game);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(true);
          setFetchErrorMessage(fetchError?.message || '');
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
    // 3. ¡Clave! Sumamos 'currentLanguage' a las dependencias del useEffect
  }, [id, currentLanguage]); 

  const detailEntries = useMemo(() => {
    if (!item) {
      return [];
    }

    return Object.entries(item)
      // 4. Excluimos 'translation' y los metadatos técnicos del backend para que no se listen como strings planos
      .filter(([key]) => 
        key !== 'id' && 
        key !== 'image' && 
        key !== 'isFavorite' && 
        key !== 'name' && 
        key !== 'translation' && 
        key !== 'createdAt' && 
        key !== 'updatedAt' && 
        key !== 'deletedAt' &&
        key !== 'imageURL'
      )
      .map(([key, value]) => [formatFieldLabel(key), formatFieldValue(value)]);
  }, [item, t]);

  if (loading) {
    return (
      <div className={loaderWrapperClassName}>
        <Loader message={loadingMessage} />
      </div>
    );
  }

  if (error || !item) {
    const isNotFound = (!error && !item) || (fetchErrorMessage && fetchErrorMessage.includes('404'));

    if (isNotFound) {
      return <Navigate replace to="/not-found" />;
    }
  }

  return (
    <div className={containerClassName}>
      <div className={cardWrapperClassName}>
        <Card
          variant="detail"
          image={item.image}
          title={item.name || 'Detalle del juego'}
          category={item.category}
          detailEntries={detailEntries}
        />
      </div>
    </div>
  );
};

export default ItemDetail;