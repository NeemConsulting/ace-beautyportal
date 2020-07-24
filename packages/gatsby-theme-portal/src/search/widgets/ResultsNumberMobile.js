import React from 'react';
import { connectStats } from 'react-instantsearch-dom';
import { formatNumber } from '../utils';

const ResultsNumberMobile = ({ nbHits, authorName }) => (
  <>
    {authorName ? (
      <span>
        <strong style={{ fontSize: '2.5rem' }}>
          {authorName}
          {"'s edit"}
        </strong>
        <span style={{ fontSize: '1.125rem', marginLeft: '20px' }}>
          {formatNumber(nbHits)} results
        </span>
      </span>
    ) : (
      <div>
        <strong>{formatNumber(nbHits)}</strong> results found
      </div>
    )}
  </>
);

export default connectStats(ResultsNumberMobile);
