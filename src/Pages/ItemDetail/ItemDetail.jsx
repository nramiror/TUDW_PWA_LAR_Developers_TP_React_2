import { useParams } from 'react-router-dom';

const ItemDetail = () => {
  const { id } = useParams();

  return (
    <div className="w-full">
      <h1>Detalle del Item {id}</h1>
      {/* Contenido del detalle aquí */}
    </div>
  );
};

export default ItemDetail;
