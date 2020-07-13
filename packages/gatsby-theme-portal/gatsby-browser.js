import 'url-search-params-polyfill';
import 'src/globalStyles.css';
import React from 'react';
import { MyProvider } from './src/context/Context';

export const wrapRootElement = ({ element }) => (
  <MyProvider>{element}</MyProvider>
);

export const disableCorePrefetching = () => true;
