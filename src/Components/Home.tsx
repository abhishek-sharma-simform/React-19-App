import { useEffect, useState } from "react";
import { Link } from "react-router";

const Home = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    setUsers(data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user: any) => {
          return (
            <li key={user?.id}>
              <Link to={`/user/${user?.id}`}>{user?.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
