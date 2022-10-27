import React, { useState } from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient, Hydrate } from '@tanstack/react-query';

import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/css/global.css';
import '../styles/css/modal.css';

const App = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <RecoilRoot>
              <Head>
                <title>Groom</title>
              </Head>
              <Component {...pageProps} />
            </RecoilRoot>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default App;
