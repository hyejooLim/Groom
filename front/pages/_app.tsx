import React, { useState } from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import 'antd/dist/antd.css';
import '../styles/css/global.css';
import '../styles/css/modal.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

const App = ({ Component }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <Head>
              <title>Groom</title>
            </Head>
            <Component />
          </RecoilRoot>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default App;
