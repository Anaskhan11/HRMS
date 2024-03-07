import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SidebarContextProvider } from "./context/SidebarContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import Login from "./components/ui/Login/Login.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SidebarContextProvider>
          <App />
        </SidebarContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
