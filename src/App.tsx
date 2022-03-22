import "./App.scss";

import { USE_RENDER_INDICATOR } from "Constants";
import Layout from "layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { AppProvider, ThemeProvider } from "utils/context/Reducer";
import { getLocalStorage } from "utils/functions/store";

// NOTE: App Context 초기값
const APP_CONTEXT_INITIAL = {
  toggledInterface: "MDI",
  activeIndicator:
    (USE_RENDER_INDICATOR && getLocalStorage("indicator") === "true") || false,
};

// NOTE: Theme Context 초기값
const THEME_CONTEXT_INITIAL = {
  darkMode: true,
};

const App: React.FC = () => {
  return (
    <AppProvider initialStore={APP_CONTEXT_INITIAL}>
      <ThemeProvider initialStore={THEME_CONTEXT_INITIAL}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
