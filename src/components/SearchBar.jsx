import { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ onSearch, onSuggestions, suggestions }) {
  const [city, setCity] = useState("");

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
        onChange={(event) => {
        const value = event.target.value;
        setCity(value);
        onSuggestions(value);
        }}
      />
      <button type="submit"><FiSearch /></button>
        
      {suggestions.length > 0 && (
      <ul className="suggestions-list">
        {suggestions.map((place) => (
          <li
            key={`${place.id}-${place.latitude}-${place.longitude}`}
            onClick={() => {
              setCity(place.name);
              onSearch(place.name);
              onSuggestions("");
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