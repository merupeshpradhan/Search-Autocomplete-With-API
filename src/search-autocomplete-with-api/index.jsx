import { useEffect, useState } from "react";
import "./styles.css";
import Suggesstion from "./suggesstions";

export default function SearchAutocomplete() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [showDropDown, setShowDropDown] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(event) {
    const query = event.target.value.toLowerCase();
    setSearchParam(query);
    if (query.length > 1) {
      const filtereData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
      setFilteredUsers(filtereData);
      setShowDropDown(true);
    } else setShowDropDown(false);
  }

  function handleClick(event) {
    // console.log(event.target.innerText);
    setShowDropDown(false);
    setSearchParam(event.target.innerText);
    setFilteredUsers([]);
  }

  async function fetchListOfUser() {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/users`);
      const data = await res.json();

      console.log(data);

      if (data && data.users && data.users.length) {
        setUsers(data.users.map((userItem) => userItem.firstName));
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    fetchListOfUser();
  }, []);
  console.log(users, filteredUsers);

  return (
    <div className="search-autocomplete-container">
      <div className="search-input">
        {loading ? (
          <h1>Loading Data ! Please wait</h1>
        ) : (
          <input
            value={searchParam}
            name="search-users"
            placeholder="Search Users here..."
            onChange={handleChange}
          />
        )}
        {showDropDown && (
          <Suggesstion handleClick={handleClick} data={filteredUsers} />
        )}
      </div>
    </div>
  );
}
