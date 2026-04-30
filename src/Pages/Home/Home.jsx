import { useState } from 'react';
import Card from '../../Components/Card/Card';

const Home = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleViewDetails = () => {
    alert('Ver detalles de la card de prueba');
  };

  const handleToggleFavorite = () => {
    setIsFavorite((currentValue) => !currentValue);
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 px-6 py-10">
      <div className="text-center">
        <h1 className="font-instrument text-3xl font-bold text-title">Home</h1>
        <p className="mt-2 text-sm text-secondary">Preview de la card para revisar estilos e interacción.</p>
      </div>

      <Card
        image="https://via.placeholder.com/400x400.png?text=Juego+de+mesa"
        title="Catán"
        category="Estrategia"
        onViewDetails={handleViewDetails}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={isFavorite}
      />
    </div>
  );
};

export default Home;
