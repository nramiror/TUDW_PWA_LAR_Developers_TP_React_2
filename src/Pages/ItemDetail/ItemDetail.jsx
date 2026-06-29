import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import Loader from '../../Components/Loader/Loader';
import Modal from '../../Components/Modal/Modal';
import Button from '../../Components/Button/Button';
import Form from '../../Components/Form/Form';
import { getBoardGameById } from '../../services/boardgames';
import { useAuth } from '../../context/AuthContext';
import { useBoardGameManager } from '../../customHooks/useBoardGameManager';
import { formatFieldLabel, formatFieldValue } from '../../utils/formatters';

const ItemDetail = ({ containerClassName = 'relative mx-auto w-full max-w-7xl px-4 pb-10 pt-8', loaderWrapperClassName = 'mx-auto flex w-full max-w-7xl justify-center px-4 pb-10 pt-8' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { isDeleting, isEditModalOpen, setIsEditModalOpen, isDeleteModalOpen, setIsDeleteModalOpen, handleDelete, handleUpdate } = useBoardGameManager(id, navigate);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const apiLanguage = i18n.language === 'en' ? 'eng' : i18n.language;
        const game = await getBoardGameById(id, apiLanguage);
        setItem(game);
      } catch { setError(true); } finally { setLoading(false); }
    };
    loadItem();
  }, [id, i18n.language]);

  const detailEntries = useMemo(() => {
    if (!item) return [];
    return Object.entries(item)
      .filter(([k]) => !['id', 'image', 'isFavorite', 'name', 'translation', 'createdAt', 'updatedAt', 'deletedAt', 'imageURL'].includes(k))
      .map(([k, v]) => [formatFieldLabel(k, t), formatFieldValue(v, t)]);
  }, [item, t]);

  if (loading || isDeleting) return <div className={loaderWrapperClassName}><Loader message={isDeleting ? "Borrando..." : t('itemDetail.loading')} /></div>;
  if (error || !item) return <Navigate replace to="/not-found" />;

  return (
    <div className={containerClassName}>
      <div className="relative z-10">
        <Card
          variant="detail"
          image={item.image}
          title={item.name}
          category={item.category}
          detailEntries={detailEntries}
          userSession={user}
          onEdit={() => setIsEditModalOpen(true)}
          onDelete={() => setIsDeleteModalOpen(true)}
        />
      </div>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
         <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-secondary mb-2">{t('itemDetail.deleteModal.title')}</h3>
            <Button onClick={handleDelete} className="bg-red-600 text-white">{t('itemDetail.deleteModal.confirm')}</Button>
         </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Form initialData={item} onCancel={() => setIsEditModalOpen(false)} onSave={handleUpdate} />
      </Modal>
    </div>
  );
};

export default ItemDetail;