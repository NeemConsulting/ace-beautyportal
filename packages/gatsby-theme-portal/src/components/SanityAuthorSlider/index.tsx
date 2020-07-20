import React, { FunctionComponent } from 'react';
import { SanityAuthorSliderInterface } from './models';

import Container from '@material-ui/core/Container';
import TileSlider from '../TileSlider';

import useStyles from './styles';

const SanityProductSlider: FunctionComponent<SanityAuthorSliderInterface> = ({
  name,
  slides,
  headline,
  description,
  searchCtaLabel,
  searchTags,
}) => {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Container>
        <TileSlider
          name={name}
          slides={slides}
          headline={headline}
          description={description}
          searchCtaLabel={searchCtaLabel}
          searchTags={searchTags}
          author="true"
        />
      </Container>
    </section>
  );
};

export default SanityProductSlider;
