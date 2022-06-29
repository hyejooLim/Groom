import Head from 'next/head';
import 'antd/dist/antd.css';
import '../styles/global.css';

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <title>Groom</title>
      </Head>
      <Component />
    </>
  );
};

export default App;
