import { createContext, useEffect, useReducer } from "react";

const initialState = {
  token: localStorage.getItem("token") || "",
};

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        token: "",
      };

    case "LOGIN_SUCCESS":
      return {
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        token: "",
      };

    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("token", authState.token);
  }, [authState]);

  return (
    <authContext.Provider
      value={{
        token: authState.token,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
