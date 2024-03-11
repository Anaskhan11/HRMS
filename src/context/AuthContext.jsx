import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const initialState = {
    role: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_ROLE":
        return {
          ...state,
          role: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("Auth Context:", state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
