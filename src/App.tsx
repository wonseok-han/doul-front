import "./App.scss";

import Layout from "layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "utils/context/Reducer";

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
