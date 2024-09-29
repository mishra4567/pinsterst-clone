import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

    async function registerUser(name, email, password, navigete) {
      setBtnLoading(true);
      try {
        const { data } = await axios.post("/api/user/register", {
          name,
          email,
          password,
        });

        toast.success(data.message);
        setUser(data.user);
        setIsAuth(true);
        setBtnLoading(false);
        navigete("/");
      } catch (error) {
        toast.error(error.response.data.message);
        setBtnLoading(false);
      }
    }

  async function loginUser(email, password, navigete) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", { email, password });

      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigete("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }
  const [loading, setLoading] = useState(true);
  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/me");
      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{ loginUser, btnLoading, isAuth, user, loading, registerUser }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
