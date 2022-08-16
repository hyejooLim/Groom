import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

import 'antd/dist/antd.css';
import '../styles/css/global.css';
import '../styles/css/modal.css';

const App = ({ Component }) => {
  return (
    <>
      <SessionProvider>
        <RecoilRoot>
          <Head>
            <title>Groom</title>
          </Head>
          <Component />
        </RecoilRoot>
      </SessionProvider>
    </>
  );
};

export default App;
