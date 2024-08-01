import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import GemList from "./GemList";

const Explore = function() {
  const [gems, setGems] = useState([]);
  const [filter, setFilter] = useState('');

  // This method fetches the gems from the database.
  useEffect(() => {
    async function getGems() {
      const response = await fetch(`http://localhost:5050/explore?${filter}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const gems = await response.json();
      console.log("gems: ", gems);
      setGems(gems);
    }
    getGems();
    return;
  }, [filter]);

  const handleSearch = (city, keyword, type) => {
    const query = [];
    if (city) query.push(`city=${city}`);
    if (keyword) query.push(`keyword=${keyword}`);
    if (type) query.push(`type=${type}`);
    setFilter(query.join('&'));
  };

  return (
    <>
        {/* The entire explore page component */}
        <SearchForm onSearch={handleSearch} />
        <GemList gems={gems} />
    </>
  );
};

export default Explore;
