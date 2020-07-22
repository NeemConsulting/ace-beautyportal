import React, { FunctionComponent } from 'react';
import { SanityAuthorSliderInterface } from './models';
import classNames from 'classnames';

import Container from '@material-ui/core/Container';
import TileSlider from '../TileSlider';
import GridStacker from '../GridStacker';

import useStyles from './styles';

const componentMap = {
  tile: TileSlider,
  grid: GridStacker,
  default: TileSlider,
};

const SanityProductSlider: FunctionComponent<SanityAuthorSliderInterface> = ({
  name,
  slides,
  headline,
  description,
  slideType,
  searchCtaLabel,
  searchTags,
}) => {
  const classes = useStyles();

  const getComponentName = (sliderType: any) => {
    sliderType = slideType.name.toLowerCase();
    if (sliderType.indexOf('grid') >= 0) return 'grid';
    if (sliderType.indexOf('tile') >= 0) return 'tile';

    return 'default';
  };
  const componentName = getComponentName(slideType);

  const Component = componentMap[componentName];

  return (
    <section className={classNames(classes.section, componentName)}>
      <Container>
        <Component
          {...{
            name,
            slides,
            headline,
            description,
            searchCtaLabel,
            searchTags,
            author: 'true',
          }}
        />
      </Container>
    </section>
  );
};

export default SanityProductSlider;
