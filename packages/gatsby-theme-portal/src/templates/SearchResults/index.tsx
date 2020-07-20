import React, { FunctionComponent } from 'react';
import SEO from '../../components/Seo';
import Layout from '../../components/Layout';
import Search from '../../search';
import Breadcrumb from '../../components/Breadcrumb';

const searchIndices = [
  { name: `howtoArticle`, title: `howtoArticle`, hitComp: `Hit` },
];

const SearchResults: FunctionComponent = () => {
  return (
    <Layout>
      <SEO lang={'tl-ph'} title="" description="" keywords="" />
      <Breadcrumb pageTitle="Search Results" />
      <Search indices={searchIndices} />
    </Layout>
  );
};
export default SearchResults;
