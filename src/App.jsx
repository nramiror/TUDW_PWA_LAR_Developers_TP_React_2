
import { Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Favorites from './Pages/Favorites/Favorites';
import ItemDetail from './Pages/ItemDetail/ItemDetail';

function App() {

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <main className="flex flex-1 items-center justify-center pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
