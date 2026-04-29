
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';

function App() {

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-600">¡Tailwind está vivo! 🎲</h1>
      </main>

      <Footer />
    </div>
  );
}

export default App;
