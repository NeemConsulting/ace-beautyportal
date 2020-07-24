import React, { FunctionComponent } from 'react';
import Container from '@material-ui/core/Container';
import classNames from 'classnames';
import { SanityTextBlockInterface } from './models';

import BlockContent from '@sanity/block-content-to-react';
import { useStaticQuery, graphql } from 'gatsby';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import quote from '../../images/icons/quote-left.svg';
import SocialMenu from '../SocialMenu';
import useStyles from './styles';

const SanityTextBlock: FunctionComponent<SanityTextBlockInterface> = ({
  name,
  _rawTextBlockBody,
  textBlockType,
}) => {
  const classes = useStyles({ icon: quote });
  const data = useStaticQuery(graphql`
    query aboutUsSocialLinks {
      linksInfo: sanityBrandInfo {
        pinteresturl
        twitterurl
        youtubeurl
        facebookurl
        instaurl
      }
      subscriptionInfo: sanityNewsletterBlock(
        name: { eq: "Newsletter Promo" }
      ) {
        name
        headline
        _rawBody(resolveReferences: { maxDepth: 10 })
        ctaLabel
      }
    }
  `);
  console.log('textBlockType', textBlockType);
  const getComponentvariant = type => {
    return type
      .replace(/\s/g, '')
      .trim()
      .toLowerCase();
  };
  return (
    <section
      className={classNames(
        classes.section,
        getComponentvariant(textBlockType.name)
      )}
    >
      <Container>
        <h1 style={{ textAlign: 'center' }}>{name}</h1>
        <div
          className={
            textBlockType.name === 'Text Block Type B' ? 'aboutContainer' : ''
          }
        >
          <div className={classes.sectionDescription}>
            <BlockContent
              serializers={blockTypeDefaultSerializers}
              blocks={_rawTextBlockBody}
            />
          </div>
          {textBlockType.name === 'Text Block Type B' && (
            <div className="sectionFollow">
              <div className="sectionFollowBlock">
                <h3>Follow us</h3>
                <SocialMenu links={data.linksInfo} popupSocial="false" />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default SanityTextBlock;
