import { useState } from 'react';
import { deleteBoardGameFromDB, updateBoardGameInDB } from '../services/boardgames';

export const useBoardGameManager = (id, navigate) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBoardGameFromDB(id);
      navigate('/');
    } catch (err) {
      console.error("Error al borrar:", err);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleUpdate = async (payload, callback) => {
    try {
      await updateBoardGameInDB(id, payload);
      setIsEditModalOpen(false);
      if (callback) callback();
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  return {
    isDeleting,
    isEditModalOpen, setIsEditModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    handleDelete,
    handleUpdate
  };
};