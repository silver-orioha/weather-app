import { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!city.trim()) {
      return;
  }

  onSearch(city);

  setCity("");
}

  return (
  <form className="search-container" onSubmit={handleSubmit}>
      <input type="text" placeholder="Search for a city..." vale={city} onChange={(event) => setCity(event.target.value)} />
      <button type="submit"><FiSearch /></button>
    </form>
  );
}

export default SearchBar;