import Layout from '@/components/Layout';
import ActivePage from '@/components/ActivePage';
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';

export default function IndexPage () {
  const [activePage, setActivePage] = useState('wordOutput');
  const [wordData, setWordData] = useState({});

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
        <Nav word={wordData?.word} activePage={activePage} setActivePage={setActivePage} setWordData={setWordData}></Nav>
      )}
      <ActivePage page={activePage} wordData={wordData} setActivePage={setActivePage} setWordData={setWordData}></ActivePage>
    </Layout>
  );
};