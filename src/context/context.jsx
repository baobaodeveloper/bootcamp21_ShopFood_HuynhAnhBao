import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducer from "./reducer";
import axios from "axios";
import { CHANGE, DELETE, GET_DATA, POST_DATA } from "../constants";

const rootUrl = "https://6256c32de07d2c9a670c4dce.mockapi.io/storeShop";

let initialState = [];

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);

  const [foods, setFoods] = useState({
    name: "",
    image: "",
    description: "",
    price: 0,
  });
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchFoodData = async () => {
    try {
      const { data } = await axios(rootUrl);

      dispatch({
        type: GET_DATA,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  const addFood = async (food) => {
    setEdit(false);

    try {
      await axios({
        method: "post",
        url: rootUrl,
        data: food,
      });
      const { data } = await axios(rootUrl);
      dispatch({
        type: POST_DATA,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFood = async (id) => {
    try {
      dispatch({
        type: DELETE,
        payload: id,
      });
      await axios({
        method: "delete",
        url: `${rootUrl}/${id}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeFood = (id) => {
    const food = [...state].filter((item) => item.key === id);

    setFoods(...food);
    setEdit(true);
    setIdEdit(id);
  };
  const handleChangeFood = async (value) => {
    const valueId = { ...value, key: idEdit };
    dispatch({
      type: CHANGE,
      payload: valueId,
    });
    try {
      await axios({
        method: "put",
        baseURL: `${rootUrl}/${idEdit}`,
        data: value,
      });
      const { data } = await axios(rootUrl);
    } catch (error) {
      console.log(error);
    }
    setIdEdit(null);
  };
  return (
    <AppContext.Provider
      value={{
        state,
        addFood,
        deleteFood,
        foods,
        changeFood,
        edit,
        setEdit,
        handleChangeFood,
        setFoods,
        idEdit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useGlobalContext = () => useContext(AppContext);
export { useGlobalContext, AppProvider };
