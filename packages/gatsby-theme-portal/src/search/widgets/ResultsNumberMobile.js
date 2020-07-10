import React from 'react';
import { connectStats } from 'react-instantsearch-dom';
import { formatNumber } from '../utils';

const ResultsNumberMobile = ({ nbHits }) => (
  <div>
    <strong>{formatNumber(nbHits)}</strong> results found
  </div>
);

export default connectStats(ResultsNumberMobile);
