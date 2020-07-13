import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Image from 'gatsby-image';
import { TileStackerInterface } from './models';
import useStyles from './styles';

const TileStacker: FunctionComponent<TileStackerInterface> = ({
  name,
  slides,
  headline,
}) => {
  const classes = useStyles();
  console.log(slides);
  return (
    <div id={name} className={classes.stacker}>
      <Typography variant="h2" className={classes.title}>
        {headline}
      </Typography>
      <Grid container spacing={3}>
        {slides.map(slide => (
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            className={classes.cardWrapper}
          >
            <Link to={slide.path}>
              <Image
                fluid={{
                  ...slide.heroImage.asset.fluid,
                  sizes:
                    '(max-width: 512px) 25vw, (max-width: 768px) 50vw, (max-width: 1268px) 75vw, (max-width: 1680px) 90vw, 90vw',
                }}
                alt={slide.heroImage.alt}
              />
              <div className={classes.cardFooter}>
                <Typography variant="subtitle2" className={classes.type}>
                  {slide._type}
                </Typography>
                <Typography variant="h6" className={classes.headline}>
                  <span>{slide.headline}</span>
                </Typography>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TileStacker;
