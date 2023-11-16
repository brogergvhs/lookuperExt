import React, { useContext, useEffect } from 'react';
import Nav from '@/components/Nav';
import Layout from '@/components/Layout';
import { Messenger } from '@/lib/messenger';
import ActivePage from '@/components/ActivePage';
import { GeneralDataContext } from '@/components/WordDataProvider';
import { TGenDataProvider } from '@/types/generalData';

export default function IndexPage () {
  const {activePage, setActivePage} = useContext(GeneralDataContext) as TGenDataProvider;

  if (typeof window !== 'undefined') {
    const messenger = new Messenger("index", "background");
    messenger.listen();
    messenger.registerEvent(["get-stored-data"]);
    messenger.addEventListener("get-stored-data", (message) => {
      console.log("index received stored data");
      if (!message.data["keyPairs"]) {
        console.log("no keypairs");
        setActivePage("welcome");
      } else {
          let apiKey = message.data["keyPairs"][0]["apiKey"];
          let host = message.data["keyPairs"][0]["hostKey"];
          if (Object.keys(apiKey).length == 0 || Object.keys(host).length == 0) setActivePage("welcome");
      }
    });
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {    
      console.log("sending handshake from index...");
      Messenger.directSend("index", "background", 
      [{ "handshake": true },{"request-stored-data": "keyPairs"}]);
    };
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