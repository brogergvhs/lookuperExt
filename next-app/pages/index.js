import Layout from '@/components/Layout';
import ActivePage from '@/components/ActivePage';
import { useContext, useEffect } from 'react';
import Nav from '@/components/Nav';
import { GeneralDataContext } from '@/components/WordDataProvider';

import { Messenger } from '@/lib/messenger';

export default function IndexPage () {
  const {activePage, setActivePage} = useContext(GeneralDataContext);

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
    new Messenger("index", "background").send([{ "handshake": true },{"request-stored-data": "keyPairs"}]);
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