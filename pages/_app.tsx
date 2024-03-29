import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SWRConfig } from 'swr';

import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/css/global.css';
import '../styles/css/modal.css';
import '../styles/css/Skeleton.css';
import { fetcher } from '../utils/fetcher';

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <SWRConfig value={{ fetcher }}>
              <RecoilRoot>
                <Head>
                  <title>Groom</title>
                </Head>
                <Component {...pageProps} />
              </RecoilRoot>
            </SWRConfig>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={true} position='bottom-right' />
          {showDevtools && (
            <React.Suspense fallback={null}>
              <ReactQueryDevtoolsProduction />
            </React.Suspense>
          )}
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default App;
