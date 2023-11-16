import '../styles/globals.css';
import '@/styles/loaders/cube.css';
import '@/styles/loaders/dot-spinner.css';
import '@/styles/loaders/dots.css';
import '@/styles/loaders/lines.css';
import '@/styles/loaders/pac-man.css';
import React from 'react';
import GeneralDataProvider from '@/components/WordDataProvider';

function MyApp({ Component, pageProps }) {
  return (
    <GeneralDataProvider>
      <Component {...pageProps} />
    </GeneralDataProvider>
  )
}

export default MyApp
