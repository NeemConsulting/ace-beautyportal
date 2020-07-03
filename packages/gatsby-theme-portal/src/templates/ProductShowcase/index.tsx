import React from 'react';
import SEO from '../../components/Seo';
import Layout from '../../components/Layout';
import Breadcrumb from '../../components/Breadcrumb';
import Search from '../../search';
import Tags from '../../components/Tags';
import Grid from '@material-ui/core/Grid';
import SanityTextBlock from '../../components/SanityTextBlock';
import SanityArticleSlider from '../../components/SanityArticleSlider';
import ImageBlock from '../../components/ImageBlock';
import Container from '@material-ui/core/Container';

const searchIndices = [
  { name: `howtoArticle`, title: `howtoArticle`, hitComp: `PostHit` },
];

const ProductShowcase = (props: ProductShowcaseProps) => {
  console.log('ProductShowcase', ProductShowcase);
  const howtoShampooArticles = props.data.howtoShampooArticles.nodes;
  const galleryShampooArticles = props.data.galleryShampooArticles.nodes;
  const featureShampooArticles = props.data.featureShampooArticles.nodes;
  const allShampooArticles = [
    ...howtoShampooArticles,
    ...galleryShampooArticles,
    ...featureShampooArticles,
  ];
  const seeAllShampoo = props.data.seeAllShampoo.nodes[0].name;
  const howtoHairSprayArticles = props.data.howtoHairSprayArticles.nodes;
  const galleryHairSprayArticles = props.data.galleryHairSprayArticles.nodes;
  const featureHairSprayArticles = props.data.featureHairSprayArticles.nodes;
  const allHairSprayArticles = [
    ...howtoHairSprayArticles,
    ...galleryHairSprayArticles,
    ...featureHairSprayArticles,
  ];
  const seeAllHairSpray = props.data.seeAllHairSpray.nodes[0].name;
  const imgBlock = props.data.imageBlock.edges.map(edge => edge.node);
  const introBlockName = props.data.productShowcaseIntro.name;
  const introBlockType = props.data.productShowcaseIntro.textBlockType;
  const introBody = props.data.productShowcaseIntro._rawTextBlockBody;
  const secondBlockType = props.data.productShowcaseTextBlock1.textBlockType;
  const secondBody = props.data.productShowcaseTextBlock1._rawTextBlockBody;
  const thirdBlockType = props.data.productShowcaseTextBlock2.textBlockType;
  const thirdBody = props.data.productShowcaseTextBlock2._rawTextBlockBody;
  const {
    data: {
      tags: { nodes: tagsList },
    },
  } = props;
  console.log('introBlockName', props.data.productShowcaseIntro);
  return (
    <Layout>
      <SEO lang={'tl-ph'} title="" description="" keywords="" />
      <Breadcrumb pageTitle="Product Showcase" />
      <SanityTextBlock
        name={introBlockName}
        _rawTextBlockBody={introBody}
        textBlockType={introBlockType}
      />
      <Search
        collapse="true"
        grid="true"
        filterProducts="true"
        indices={searchIndices}
      />
      <ImageBlock
        name={imgBlock[0].name}
        image={imgBlock[0].image}
        _rawTextBlockBody={imgBlock[0]._rawTextBlockBody}
        url={imgBlock[0].url}
        imageBlockType={imgBlock[0].imageBlockType}
        preferPerformance={false}
      />

      <Grid item xs={12}>
        <section>
          <SanityArticleSlider
            name="articles"
            slides={allHairSprayArticles}
            headline="Hair Spray Hacks"
            slideType={{ name: 'tile' }}
            searchTags={seeAllHairSpray}
            searchCtaLabel=""
          />
        </section>
      </Grid>
      <SanityTextBlock
        name=""
        _rawTextBlockBody={secondBody}
        textBlockType={secondBlockType}
      />
      <Grid item xs={12}>
        <section>
          <SanityArticleSlider
            name="articles"
            slides={allShampooArticles}
            headline="Our Top Shampoo Tips"
            slideType={{ name: 'tile' }}
            searchTags={seeAllShampoo}
            searchCtaLabel=""
          />
        </section>
      </Grid>
      <SanityTextBlock
        name=""
        _rawTextBlockBody={thirdBody}
        textBlockType={thirdBlockType}
      />
      <Grid container xs={12} spacing={2}>
        <Container>
          {tagsList && <Tags title="Find something" data={tagsList} />}
        </Container>
      </Grid>
    </Layout>
  );
};
export default ProductShowcase;

interface ProductShowcaseProps {
  data: {
    howtoShampooArticles: any;
    galleryShampooArticles: any;
    featureShampooArticles: any;
    seeAllShampoo: any;
    howtoHairSprayArticles: any;
    galleryHairSprayArticles: any;
    featureHairSprayArticles: any;
    seeAllHairSpray: any;
    productShowcaseIntro: any;
    productShowcaseTextBlock1: any;
    productShowcaseTextBlock2: any;
    imageBlock: any;
    tags: any;
  };
}
