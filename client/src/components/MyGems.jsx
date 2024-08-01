import GemList from "./GemList";
import { useEffect, useState } from "react";

import useValidateToken from "../hooks/useValidateToken";

const MyGems = () => {
  const [gems, setGems] = useState([]);
  const [filter, setFilter] = useState('posted_gems');

  const { user, error } = useValidateToken(localStorage.getItem(`token`)); 

  // This method fetches the gems from the database.
  useEffect(() => {
    async function getGems() {
      const response = await fetch(`http://localhost:5050/gems/${filter}?user=${user.name}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const gems = await response.json();
      setGems(gems);
    }
    getGems();
    return;
  }, [filter]);

  return (
    <>
      <article className="page-body">
        <section className="page-body-content">
          <h1 className="text-lg font-semibold text-blue-600 italic text-2xl p-4 ">The entire my-gem page component</h1>
          <br />
          <button onClick={() => setFilter("posted_gems")}>My Gems</button>
          <br />
          <button onClick={() => setFilter("favourited_gems")}>Favourited Gems</button>
          <br />
          <button onClick={() => setFilter("unlocked_gems")}>Unlocked Gems</button>
          <GemList gems={gems}/>
        </section>
      </article>
    </>
  );
};

export default MyGems;

//change db to include all properties of 3 filters