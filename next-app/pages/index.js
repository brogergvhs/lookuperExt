import Layout from '@/components/Layout';
import ActivePage from '@/components/ActivePage';
import { useContext, useEffect } from 'react';
import Nav from '@/components/Nav';
import { GeneralDataContext } from '@/components/WordDataProvider';

export default function IndexPage () {
  const {activePage} = useContext(GeneralDataContext);

  useEffect(() => {
    let apiKey, host;
    if (typeof window !== 'undefined' && window.localStorage) {
      apiKey = localStorage.getItem('apiKey');
      host = localStorage.getItem('apiKey');
    };

    if (!apiKey || !host) setActivePage("welcome");
  }, []);

  return (
    <Layout>
      {activePage != "welcome" && (
        <Nav></Nav>
      )}
      <ActivePage></ActivePage>
    </Layout>
  );
};