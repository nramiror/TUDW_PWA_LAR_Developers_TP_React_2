
import Footer from './Components/Footer/Footer';
import Alert from './Components/Alert/Alert';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-bg">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 px-6 py-10">
        <h1 className="font-instrument text-3xl font-bold text-title">Prueba de Alertas</h1>

        <Alert type="success" message="¡Catán se ha agregado a tus favoritos! 🎲" />
        <Alert type="error" message="Ups, no pudimos cargar los juegos. Revisa tu conexión. 🔌" />
        <Alert type="info" message="No hay más juegos para mostrar." />

        <p className="mt-2 font-instrument text-sm text-secondary/80">
          Este bloque es temporal para testear el componente. Luego lo usamos donde haga falta.
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default App;
