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
        </div>
    </div>
  );
};

export default Home;
