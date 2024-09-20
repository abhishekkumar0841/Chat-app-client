import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./themes/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { persistor, store } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
    </PersistGate>
    <Toaster/>
  </Provider>
);
