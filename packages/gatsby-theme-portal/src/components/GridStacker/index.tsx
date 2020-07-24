import React, { FunctionComponent, useState } from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import classNames from 'classnames';

import { Typography } from '@material-ui/core';
import { GridStackerInterface } from './models';
import { ReactComponent as Next } from '../../images/icons/next.svg';
import useStyles from './styles';

const GridStacker: FunctionComponent<GridStackerInterface> = ({
  slides,
  headline,
  searchCtaLabel,
  searchTags,
  description,
  author,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.sectionTitle}>
        <Typography variant="h2">{headline}</Typography>
        {searchCtaLabel && (
          <Link className={classes.sectionLink} to="/about-us">
            {searchCtaLabel}
          </Link>
        )}
      </div>
      <div className={classes.wrapper}>
        {slides.map(slide => (
          <Link
            className={classes.item}
            to={slide.path ? slide.path : slide.slug.current}
          >
            {slide.image && (
              <Img
                fluid={{
                  ...slide.image.asset.fluid,
                  sizes:
                    '(max-width: 512px) 25vw, (max-width: 768px) 50vw, (max-width: 1268px) 75vw, (max-width: 1680px) 90vw, 90vw',
                }}
                alt={slide.image.alt}
              />
            )}
            <h3 className={classes.itemCaption}>
              <span>{slide.name}</span>
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GridStacker;
