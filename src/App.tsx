import './App.scss';

import Layout from 'layout/Layout';

// import { useState } from 'react';

// import { IntlProvider } from 'react-intl';

// import messages from './messages';

const App: React.FC = () => {
  // const [locale, setLocale] = useState('en');

  return (
    // <IntlProvider locale={locale} messages={messages[locale]}>
    <Layout />
    // </IntlProvider>
  );
};

export default App;
