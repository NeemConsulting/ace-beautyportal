import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { makeStyles } from '@material-ui/core/styles';
import OGTags from '../../components/OGTags';
import Breadcrumb from '../../components/Breadcrumb';
import TileSlider from '../../components/TileSlider';
import ImageBlock from '../../components/ImageBlock';
import SocialMenu from '../../components/SocialMenu';
import { PrimaryButton, SecondaryButton } from '../../components/Common/Button';
import BlockContent from '@sanity/block-content-to-react';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import Tags from '../../components/Tags';
import SanityArticleSlider from '../../components/SanityArticleSlider';
import { ReactComponent as ArrowUp } from '../../images/icons/up.svg';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import SEO from '../../components/Seo';
import Layout from '../../components/Layout';
import { Typography } from '@material-ui/core';
import useStyles from './styles';

const ProductPage = (props: ProductPageProps) => {
  const {
    data: {
      page,
      products: { nodes: productNodes },
      articles: { nodes: articlesList },
      brandInfo,
      imageBlock,
    },
  } = props;

  const [accordion, toggleAccordion] = useState(false);

  const classes = useStyles();

  page.seo = page.seo || {};
  return (
    <Layout>
      <SEO
        lang={'tl-ph'}
        title={page.seo.metaTitle}
        description={page.seo.metaDescription}
        keywords={page.seo.metaKeywords}
      />
      <OGTags type={'page'} slug={page.path} data={page} />
      {page.path !== '/' && <Breadcrumb pageTitle={page.name} />}
      <Grid container>
        <Grid item xs={12}>
          <Container>
            <Grid container spacing={4}>
              <Grid
                item
                lg={6}
                md={6}
                xs={12}
                spacing={4}
                className={classes.productImage}
              >
                <Img fluid={page.image.asset.fluid} alt={page.image.alt} />
                {page.tags.length > 0 && (
                  <span className={classes.readNextTitle}>
                    {page.tags[0].name}
                  </span>
                )}
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <Typography variant="h1">{page.name}</Typography>
                {page.buyNow && (
                  <PrimaryButton
                    className={classes.marginRight}
                    lable="Buy Now"
                    link={page.buyNow}
                  />
                )}
                {page.learnMore && (
                  <SecondaryButton
                    lable="See the benefits"
                    link={page.learnMore}
                  />
                )}
                <Grid container spacing={2} className={classes.socialWrapper}>
                  <Grid item lg={6} md={6} xs={12}>
                    <BlockContent
                      blocks={page._rawMarketingDescription}
                      serializers={blockTypeDefaultSerializers}
                    />
                    {page.tags.length > 0 && (
                      <>
                        <Typography
                          variant="subtitle1"
                          className={classes.strong}
                        >
                          Best for:
                        </Typography>
                        <Typography variant="body1">
                          {page.tags.map(tag => (
                            <span className={classes.marginRight}>
                              {tag.name}
                            </span>
                          ))}
                        </Typography>
                      </>
                    )}
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <BlockContent
                      blocks={page._rawUsageDetails}
                      serializers={blockTypeDefaultSerializers}
                    />
                    <SocialMenu links={brandInfo} popupSocial="" />
                  </Grid>
                  {page._rawIngredients && (
                    <div className={classes.accordion}>
                      <button
                        type="button"
                        className="header"
                        onClick={() => toggleAccordion(!accordion)}
                      >
                        <span>What it's made of</span>
                        <ArrowUp className={accordion ? 'up' : 'down'} />
                      </button>
                      <div
                        className={
                          accordion ? 'contentExpand' : `contentCollapse`
                        }
                      >
                        <BlockContent
                          blocks={page._rawIngredients}
                          serializers={blockTypeDefaultSerializers}
                        />
                      </div>
                    </div>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={12} className={classes.mainGrid}>
          <Container>
            {productNodes.length > 0 && (
              <TileSlider
                name="products"
                slides={productNodes}
                headline="Products You Might Also Like"
                searchCtaLabel="See All Products"
                searchTags={page.tags}
              />
            )}
          </Container>
        </Grid>
        <Grid item xs={12}>
          <ImageBlock
            id={imageBlock._id}
            name={imageBlock.name}
            image={imageBlock.image}
            _rawTextBlockBody={imageBlock._rawTextBlockBody}
            url={imageBlock.url}
            imageBlockType={imageBlock.imageBlockType}
          />
        </Grid>
        <Grid item xs={12}>
          {articlesList.length > 0 && (
            <SanityArticleSlider
              name="articles"
              slides={articlesList}
              headline="Our Tips & Advice"
              slideType={{ name: 'tile' }}
              searchTags={page.tags}
              searchCtaLabel="See All Articles"
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Container>
            {page.tags.length && (
              <Tags title="Find something else" data={page.tags} />
            )}
          </Container>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductPage;

export const query = graphql`
  query($slug: String!, $tags: [String!]) {
    products: allSanityProduct(
      filter: {
        tags: { elemMatch: { name: { in: $tags } } }
        id: { nin: [$slug] }
      }
    ) {
      nodes {
        ...ProductFieldsTile
      }
    }

    page: sanityProduct(id: { eq: $slug }) {
      ...ProductFieldsFull
      tags {
        name
        tagCategory {
          name
        }
      }
    }
    articles: allSanityHowToArticle(
      filter: {
        tags: { elemMatch: { name: { in: $tags } } }
        id: { nin: [$slug] }
      }
      limit: 10
      sort: { fields: _createdAt, order: DESC }
    ) {
      nodes {
        ...HowToFieldsTile
      }
    }
    tags: allSanityTag(limit: 6) {
      nodes {
        id
        tagCategory {
          id
          name
        }
        name
      }
    }
    imageBlock: sanityImageBlock {
      id
      name
      image {
        asset {
          fluid {
            base64
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
          }
        }
      }
      _rawTextBlockBody
      url
      imageBlockType {
        id
        name
      }
    }
    brandInfo: sanityBrandInfo {
      pinteresturl
      twitterurl
      youtubeurl
      facebookurl
      instaurl
    }
  }
`;

interface ProductPageProps {
  data: {
    page: any;
    products: any;
    articles: any;
    brandInfo: any;
    imageBlock: any;
  };
  pageContext: {
    slug: string;
    title: string;
  };
}
