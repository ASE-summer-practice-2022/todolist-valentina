import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "./helpers/GlobalState";
import "./index.scss";
import "./reset.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
