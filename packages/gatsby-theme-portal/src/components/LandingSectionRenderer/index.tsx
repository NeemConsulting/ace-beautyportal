import React, { FunctionComponent } from 'react';
import loadable from '@loadable/component';
import { LandingSectionRendererInterface } from './models';
const SanityArticleSlider = loadable(() => import('../SanityArticleSlider'), {
  fallback: <div style={{ height: 500 }}>loading...</div>,
});
const SanityProductSlider = loadable(() => import('../SanityProductSlider'), {
  fallback: <div style={{ height: 500 }}>loading...</div>,
});
const SanityAuthorSlider = loadable(() => import('../SanityAuthorSlider'), {
  fallback: <div style={{ height: 500 }}>loading...</div>,
});
import SanityTextBlock from '../SanityTextBlock';
import NewsletterBlock from '../NewsletterBlock';
import SanityVideoBlock from '../SanityVideoBlock';
import ImageBlock from '../ImageBlock';
import AccordionBlock from '../SanityAccordionBlock';
import SanityTagsBlock from '../SanityTagsBlock';

const componentsMap = {
  SanityArticleSlider: SanityArticleSlider,
  SanityProductSlider: SanityProductSlider,
  SanityAuthorSlider: SanityAuthorSlider,
  SanityTextBlock: SanityTextBlock,
  SanityNewsletterBlock: NewsletterBlock,
  SanityVideoBlock: SanityVideoBlock,
  SanityImageBlock: ImageBlock,
  SanityAccordionBlock: AccordionBlock,
  SanityTaxonomyBlock: SanityTagsBlock,
};

const LandingSectionRenderer: FunctionComponent<LandingSectionRendererInterface> = ({
  section,
  preferPerformance = false,
}) => {
  const sanityType = section.__typename;
  const getComponent = sanityType => {
    const component = componentsMap[sanityType];
    if (component) {
      return component;
    } else {
      console.info('Unknown block for landing page: ', sanityType);

      return false;
    }
  };

  const Comp = getComponent(sanityType);

  return Comp
    ? React.createElement(Comp, {
        ...section,
        preferPerformance,
      })
    : null;
};

export default LandingSectionRenderer;
