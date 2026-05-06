import { useState } from 'react';
import Button from '../Button/Button';

const defaultStyles = {
  form: 'relative w-full max-w-md group',
  icon: 'material-symbols-rounded pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors leading-none',
  input: 'relative z-0 w-full h-11 pl-12 pr-4 bg-white/60 backdrop-blur-sm border border-primary rounded-full font-instrument text-sm text-secondary placeholder:text-secondary/40 outline-none focus:border-primary focus:bg-white focus:shadow-md transition-all duration-300',
  clearButton: 'absolute right-4 top-1/2 -translate-y-1/2 !p-0 !text-secondary/40 hover:!text-secondary',
};

const SearchBox = ({
  onSearchChange,
  placeholder = '¿Qué querés jugar hoy?',
  ariaLabel = 'Buscar juegos',
  clearAriaLabel = 'Limpiar búsqueda',
  formClassName = defaultStyles.form,
  iconClassName = defaultStyles.icon,
  inputClassName = defaultStyles.input,
  clearButtonClassName = defaultStyles.clearButton,
}) => {
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
    <form onSubmit={handleSubmit} role="search" className={formClassName}>

      <span className={iconClassName}>search</span>

      <input
        type="text"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={inputValue}
        onChange={handleInputChange}
        className={inputClassName}
      />

      {inputValue && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => { setInputValue(""); onSearchChange(""); }}
          ariaLabel={clearAriaLabel}
          className={clearButtonClassName}
        >
          <span className="material-symbols-rounded text-lg">close</span>
        </Button>
      )}
    </form>
  );
};

export default SearchBox;