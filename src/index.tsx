import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "./helpers/globalState";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
