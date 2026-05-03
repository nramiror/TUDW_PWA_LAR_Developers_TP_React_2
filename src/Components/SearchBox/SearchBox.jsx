import { useState } from 'react';

const SearchBox = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (newValue.trim() === "") {
      onSearchChange("");
    } else {
      onSearchChange(newValue.trim());
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchChange(inputValue.trim());
  };

  return (
    <form 
      onSubmit={handleSubmit}
      role="search"
      className="relative w-full max-w-md group"
    >
      
      <span className="material-symbols-rounded pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors leading-none">
        search
      </span>

      <input
        type="text"
        placeholder="¿Qué querés jugar hoy?"
        aria-label="Buscar juegos"
        value={inputValue}
        onChange={handleInputChange}
        className="relative z-0 w-full h-11 pl-12 pr-4 bg-white/60 backdrop-blur-sm border border-primary rounded-full font-instrument text-sm text-secondary placeholder:text-secondary/40 outline-none focus:border-primary focus:bg-white focus:shadow-md transition-all duration-300"
      />

      {inputValue && (
        <button
          type="button"
          onClick={() => { setInputValue(""); onSearchChange(""); }}
          aria-label="Limpiar búsqueda"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-secondary cursor-pointer"
        >
          <span className="material-symbols-rounded text-lg">close</span>
        </button>
      )}
    </form>
  );
};

export default SearchBox;