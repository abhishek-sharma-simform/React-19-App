import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UserDetails = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const getUserById = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await res.json();
    setUser(data);
  };
  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div>
      <h1>User Details</h1>
      <h3>{user?.name}</h3>
      <h3>{user?.email}</h3>
      <h3>{user?.phone}</h3>
      <h3>{user?.website}</h3>
    </div>
  );
};
export default UserDetails;
