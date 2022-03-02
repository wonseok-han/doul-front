import "./App.scss";

import { USE_RENDER_INDICATOR } from "Constants";
import Layout from "layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "utils/context/Reducer";

const App: React.FC = () => {
  return (
    <AppProvider
      initialStore={{ activeIndicator: USE_RENDER_INDICATOR || false }}
    >
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
