import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import OGTags from '../../components/OGTags';
import Breadcrumb from '../../components/Breadcrumb';
import SEO from '../../components/Seo';
import Search from '../../search';
import BlockContent from '@sanity/block-content-to-react';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import { Grid, Container } from '@material-ui/core';
import './authorStyle.css';

const searchIndices = [
  { name: `howtoArticle`, title: `howtoArticle`, hitComp: `Hit` },
];

const AuthorPage = (props: AuthorPageProps) => {
  const { data } = props;
  const { name, slug, _rawBio, image } = data.page.nodes[0];

  return (
    <Layout>
      <SEO lang={'tl-ph'} title={name} description={name} keywords={[' ']} />
      <OGTags type={'page'} slug={slug} data={data.page} />
      {slug !== '/' && <Breadcrumb pageTitle={name} />}
      <Grid container>
        <Grid item xs={12}>
          <Container>
            <div className="_editor-header">
              <div className="wrap">
                <h1 className="page-title h1 mt-md-4 mb-7 mb-md-8">
                  Meet the Editor{' '}
                </h1>
                <div className="img-editor mx-auto">
                  <div className="img-wrapper rounded-circle overflow-hidden d-inline-block">
                    <picture>
                      <source
                        srcSet={`${image.asset.url}?w=200&h=200&auto=format 1x, ${image.asset.url}?w=200&h=200&auto=format&dpr=2 2x`}
                        media="screen and (min-width: 767px)"
                      />
                      <img
                        src={`${image.asset.url}?w=200&h=200&auto=format`}
                        alt={image.alt}
                      />
                    </picture>
                  </div>
                  <h2 className="name h3 mt-3 mb-4 mb-md-5">{name} </h2>
                  <p className="bio mb-8">
                    <BlockContent
                      blocks={_rawBio}
                      serializers={blockTypeDefaultSerializers}
                    />
                  </p>
                </div>
              </div>
            </div>
            <Search
              authors="true"
              indices={searchIndices}
              slug={slug.current}
            />
          </Container>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AuthorPage;

export const query = graphql`
  query($slug: String!) {
    page: allSanityAuthor(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        id
        name
        image {
          asset {
            fluid {
              src
              aspectRatio
              srcWebp
              sizes
              base64
              srcSetWebp
              srcSet
            }
            url
          }
          alt
        }
        slug {
          current
        }
        _rawBio(resolveReferences: { maxDepth: 10 })
      }
    }
  }
`;

interface AuthorPageProps {
  data: any;
}
