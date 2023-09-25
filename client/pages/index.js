import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [cookies, setCookies] = useCookies(["access_token"]);

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

  const logout = async () => {
    window.localStorage.setItem("userID", "");
    setCookies("access_token", "");
    Router.push("/auth");
  };
  return (
    <div className="container mx-auto">
      <h1 className="flex items-center justify-center gap-10 mt-20 mb-10 text-5xl font-bold text-center">
        All Users
        <button
          onClick={logout}
          className="px-4 py-2 ml-5 text-base transition bg-red-500 hover:bg-red-600"
        >
          Logout
        </button>
      </h1>
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
                  <strong>Password:</strong> ************
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
