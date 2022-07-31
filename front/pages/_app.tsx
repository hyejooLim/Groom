import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import 'antd/dist/antd.css';
import '../styles/global.css';
import '../styles/modal.css';

const App = ({ Component }) => {
  return (
    <>
      <SessionProvider>
        <Head>
          <title>Groom</title>
        </Head>
        <Component />
      </SessionProvider>
    </>
  );
};

export default App;
