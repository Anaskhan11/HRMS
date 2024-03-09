import { createContext, useReducer, useContext } from "react";

const SidebarContext = createContext();

const initialState = {
  sidebar: true,
};

const sidebarReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebar: !state.sidebar,
      };
    default:
      return state;
  }
};
export const SidebarContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);
  console.log("Sidebar Context:", state);

  return (
    <SidebarContext.Provider value={{ state, dispatch }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
