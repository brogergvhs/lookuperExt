import Layout from '@/components/Layout';
import ActivePage from '@/components/ActivePage';
import { useState } from 'react';
import Nav from '@/components/Nav';

export default function IndexPage () {
  const [activePage, setActivePage] = useState('wordOutput');
  const [wordData, setWordData] = useState({});

  return (
    <Layout>
      {activePage != "welcome" && (
        <Nav activePage={activePage} setActivePage={setActivePage} setWordData={setWordData}></Nav>
      )}
      <ActivePage page={activePage} wordData={wordData} setActivePage={setActivePage} setWordData={setWordData}></ActivePage>
    </Layout>
  );
};