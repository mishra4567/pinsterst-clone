import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const PinContext = createContext();

export const PinProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchPins() {
    try {
      const { data } = await axios.get("/api/pin/all");

      setPins(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [pin, setPin] = useState([]);
  async function fetchPin(id) {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/pin/" + id);
      setPin(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPins();
  }, []);
  return (
    <PinContext.Provider value={{ pins, loading, fetchPin,pin }}>
      {children}
    </PinContext.Provider>
  );
};

export const PinData = () => useContext(PinContext);
