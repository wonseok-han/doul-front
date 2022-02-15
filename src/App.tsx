import "./App.scss";

import Layout from "layout/Layout";
import { BrowserRouter } from "react-router-dom";

// import { useState } from 'react';

// import { IntlProvider } from 'react-intl';

// import messages from './messages';

const App: React.FC = () => {
  // const [locale, setLocale] = useState('en');

  return (
    // <IntlProvider locale={locale} messages={messages[locale]}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
    // </IntlProvider>
  );
};

export default App;
