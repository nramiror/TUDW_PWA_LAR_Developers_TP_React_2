import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useParams, useNavigate } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import Loader from '../../Components/Loader/Loader';
import Alert from '../../Components/Alert/Alert';
import { getBoardGameById, deleteBoardGameFromDB, updateBoardGameInDB } from '../../services/boardgames';
import { useAuth } from '../../context/AuthContext';
import { fetchWithAuth } from '../../utils/fetchInterceptor';
import Modal from '../../Components/Modal/Modal';
import Button from '../../Components/Button/Button';
import Form from '../../Components/Form/Form';

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
  const navigate = useNavigate();


  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleUpdateGame = async (formData) => {
    try {

      const categoriasArray = formData.category
        ? formData.category.split(',').map(cat => cat.trim()).filter(cat => cat !== '')
        : [];

      const payload = {
        imageURL: formData.imageURL, 

        translations: [
          {
            language: "es",
            name: formData.name,
            description: formData.description,
            category: categoriasArray 
          }
        ]
      };
      const result = await updateBoardGameInDB(item.id, payload);

      setIsEditModalOpen(false);

    } catch (error) {
      console.error("Error al intentar guardar la edición:", error);
    }
  };

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

  }, [id, currentLanguage]);

  const detailEntries = useMemo(() => {
    if (!item) return [];
    return Object.entries(item)
      .filter(([key]) =>
        !['id', 'image', 'isFavorite', 'name', 'translation', 'createdAt', 'updatedAt', 'deletedAt', 'imageURL'].includes(key)
      )
      .map(([key, value]) => [formatFieldLabel(key), formatFieldValue(value)]);
  }, [item, t]);

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBoardGameFromDB(id);

      setIsDeleteModalOpen(false);
      navigate('/');
    } catch (err) {
      console.error("Error al borrar:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading || isDeleting) {
    return (
      <div className={loaderWrapperClassName}>
        <Loader message={isDeleting ? "Borrando juego..." : loadingMessage} />
      </div>
    );
  }

  if (error || !item) {
    const isNotFound = (!error && !item) || (fetchErrorMessage && fetchErrorMessage.includes('404'));
    if (isNotFound) return <Navigate replace to="/not-found" />;
  }

  return (
    <div className={containerClassName}>

      {isAdmin && (
        <div className="mb-4 flex w-full max-w-5xl mx-auto justify-end gap-3 z-20 relative">
          <Button
            onClick={() => setIsEditModalOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border-none bg-transparent !p-0 text-secondary !shadow-none transition-colors hover:bg-secondary hover:text-white focus:outline-none"
            title={t('itemDetail.adminButtons.edit')}
          >
            <span className="material-symbols-rounded text-[22px] leading-none select-none transform translate-y-[2px]">edit</span>
          </Button>
          <Button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border-none bg-transparent !p-0 text-red-500 !shadow-none transition-colors hover:bg-red-500 hover:text-white focus:outline-none"
            title={t('itemDetail.adminButtons.delete')}
          >
            <span className="material-symbols-rounded text-[22px] leading-none select-none text-red-500 border-none bg-transparent m-0 p-0 transition-colors duration-100 hover:text-white transform translate-y-[2px]">delete</span>
          </Button>
        </div>
      )}

      <div className={cardWrapperClassName}>
        <Card
          variant="detail"
          image={item.image}
          title={item.name || 'Detalle del juego'}
          category={item.category}
          detailEntries={detailEntries}
        />
      </div>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-secondary mb-2">{t('itemDetail.deleteModal.title')}</h3>
          <p className="text-gray-600 mb-6">
            {t('itemDetail.deleteModal.warning', { itemName: item.name })}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-6 py-2 rounded-[var(--radius-border)] border border-primary text-secondary font-bold hover:bg-gray-100 transition-colors"
            >
              {t('itemDetail.deleteModal.cancel')}
            </Button>
            <Button
              onClick={confirmDelete}
              className="px-6 py-2 rounded-[var(--radius-border)] bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
            >
              {t('itemDetail.deleteModal.confirm')}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="p-6 max-w-4xl w-full text-left bg-[var(--color-brand-bg)] rounded-xl">
          <Form
            initialData={item}
            onCancel={() => setIsEditModalOpen(false)}
            onSave={handleUpdateGame}
          />
        </div>
      </Modal>

    </div>
  );
};

export default ItemDetail;