import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
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
  const howtoAuthorArticles = props.data.howtoAuthorArticles.edges;
  const galleryAuthorArticles = props.data.galleryAuthorArticles.edges;
  const featureAuthorArticles = props.data.featureAuthorArticles.edges;
  const allAuthorArticles = [
    ...howtoAuthorArticles,
    ...galleryAuthorArticles,
    ...featureAuthorArticles,
  ];
  console.log('allAuthorArticles', allAuthorArticles);
  return (
    <Layout>
      <SEO lang={'tl-ph'} title={name} description={name} keywords={name} />
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
            {/* <ul className="author-article-list">
              {allAuthorArticles.map(edge => (
                <>
                  <Link
                    className="author-article-container"
                    to={`/${edge.node.path}/`}
                    aria-label={edge.node.headline}
                  >
                    <div className="author-article-container-card">
                      <span className="author-article-badge">
                        {edge.node._type}
                      </span>
                      <div className="author-article-container-card_image">
                        <Img
                          fluid={{
                            ...edge.node.heroImage.asset.fluid,
                            sizes:
                              '(max-width: 512px) 10vw, (max-width: 768px) 20vw, (max-width: 1268px) 30vw, (max-width: 1680px) 40vw, 50vw',
                          }}
                          alt={edge.node.heroImage.alt}
                        />
                      </div>
                      <div className="author-article-container-card_content">
                        <h2 className="author-article-container-card_title">
                          {edge.node.headline}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </>
              ))}
            </ul> */}
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
    howtoAuthorArticles: allSanityHowToArticle(
      filter: { author: { slug: { current: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...HowToFieldsTile
        }
      }
    }

    galleryAuthorArticles: allSanityGalleryArticle(
      filter: { author: { slug: { current: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...GalleryFieldsTile
        }
      }
    }
    featureAuthorArticles: allSanityFeatureArticle(
      filter: { author: { slug: { current: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...FeatureFieldsTile
        }
      }
    }
  }
`;

interface AuthorPageProps {
  data: any;
}
