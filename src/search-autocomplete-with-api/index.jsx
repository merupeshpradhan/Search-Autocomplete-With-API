import { useEffect, useState } from "react";

export default function SearchAutocomplete() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  async function fetchListOfUser() {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/users`);
      const data = await res.json();

      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    fetchListOfUser();
  });

  return (
    <div className="search-autocomplete-container">
      <input name="search-users" placeholder="Search Users here..." />
    </div>
  );
}
