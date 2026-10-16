import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({
  onSearch,
  onSelectLocation,
  onSuggestions,
  suggestions,
}) {

  const [city, setCity] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  
  useEffect(() => {
  if (!city.trim()) {
    onSuggestions("");
    return;
  }

  const timer = setTimeout(() => {
    onSuggestions(city);
  }, 500);

  return () => clearTimeout(timer);
}, [city, onSuggestions]);

  
  function handleKeyDown(event) {
    if (!suggestions.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((previousIndex) =>
        previousIndex < suggestions.length - 1
          ? previousIndex + 1
          : 0
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((previousIndex) =>
        previousIndex > 0
          ? previousIndex - 1
          : suggestions.length - 1
      );
    }

    if (event.key === "Escape") {
      setActiveIndex(-1);
      onSuggestions("");
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();

      const selectedPlace = suggestions[activeIndex];

      setCity(selectedPlace.name);
      setActiveIndex(-1);
      onSuggestions("");
      onSelectLocation(selectedPlace);
    }
  }

  async function handleSubmit(event) {
  event.preventDefault();

  if (!city.trim()) {
    return;
  }

  const success = await onSearch(city);

  if (success) {
    setCity("");
  }
}

  return (
  <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a city..."
        value={city}
        onKeyDown={handleKeyDown}
        onChange={(event) => setCity(event.target.value)}
      />
      <button type="submit"><FiSearch /></button>
        
      {suggestions.length > 0 && (
      <ul className="suggestions-list">
        {suggestions.map((place, index) => (
          <li
            key={`${place.id}-${place.latitude}-${place.longitude}`}
            className={activeIndex === index ? "active-suggestion" : ""}
            onClick={async () => {
              setCity(place.name);
              setActiveIndex(-1);
              onSuggestions("");
              await onSelectLocation(place);
            }}
          >
            {place.name}
            {place.admin1 ? `, ${place.admin1}` : ""}
            {place.country ? `, ${place.country}` : ""}
          </li>
        ))}
      </ul>
    )}
    
    </form>
  );
}

export default SearchBar;