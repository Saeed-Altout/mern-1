import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    try {
      if (name && email && password) {
        axios
          .post("http://localhost:3001/create", {
            name,
            email,
            password,
          })
          .then((res) => {
            return res.data;
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/users",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [users]);

  return (
    <div className="container mx-auto">
      <h1 className="mt-20 mb-10 text-5xl font-bold text-center">All Users</h1>

      <div className="flex flex-col max-w-2xl gap-10 mx-auto mb-20">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="pl-4">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="px-5 py-3 bg-black-400 focus:outline-none focus:border-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="pl-4">
            Email:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className="px-5 py-3 bg-black-400 focus:outline-none focus:border-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="pl-4">
            Password:
          </label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Password"
            className="px-5 py-3 bg-black-400 focus:outline-none focus:border-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="px-5 py-3 ml-auto cursor-pointer bg-black-400 w-fit"
          onClick={createUser}
        >
          Save
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-10">
        {users.length > 0 ? (
          <>
            {users.map(({ _id, name, email, password }) => (
              <div key={_id} className="flex-1 p-5 border-2 border-black-400">
                <p>
                  <strong>Name:</strong> {name}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p>
                  <strong>Password:</strong> {password}
                </p>
              </div>
            ))}
          </>
        ) : (
          <p className="mx-auto text-3xl w-fit">No Data Found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
