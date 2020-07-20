import React, { FunctionComponent, useState } from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import classNames from 'classnames';

import { Typography } from '@material-ui/core';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.min.css';
import { TileSliderInterface } from './models';
import { ReactComponent as Next } from '../../images/icons/next.svg';
import { getSearchUrlWithTagsAndCategory } from '../../helpers/searchUrl';
import BlockContent from '@sanity/block-content-to-react';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import useStyles from './styles';

const TileSlider: FunctionComponent<TileSliderInterface> = ({
  slides,
  headline,
  searchCtaLabel,
  searchTags,
  description,
  author,
}) => {
  const [swiper, updateSwiper] = useState(null);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const classes = useStyles();
  const params = {
    slidesPerView: author === 'true' ? 3 : 4,
    spaceBetween: 30,
    freeMode: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
    },
    breakpoints: {
      768: {
        slidesPerView: author === 'true' ? 3 : 4,
        spaceBetween: 30,
      },
      320: {
        slidesPerView: author === 'true' ? 1.2 : 2.5,
        spaceBetween: 20,
      },
    },
  };

  const renderer = slide => {
    return (
      <div key={slide.name}>
        <div>
          <Link
            className={classes.sliderLink}
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
            <h3 className={classes.sliderItemCaption}>
              <span>{slide.name}</span>
            </h3>
            {slide._rawBio && (
              <p>
                <BlockContent
                  blocks={slide._rawBio}
                  serializers={blockTypeDefaultSerializers}
                />
              </p>
            )}
          </Link>
        </div>
      </div>
    );
  };

  const swiperNext = () => {
    if (swiper) {
      swiper.slideNext();
      setIsFirstSlide(false);
      if (swiper.isEnd) {
        setIsLastSlide(true);
      }
    }
  };

  const swiperPrev = () => {
    if (swiper) {
      swiper.slidePrev();
      setIsLastSlide(false);
      if (swiper.isBeginning) {
        setIsFirstSlide(true);
      }
    }
  };

  return (
    <div className={classes.slider}>
      <div className={classes.sectionTitle}>
        <Typography variant="h2" className={classes.sliderTitle}>
          {headline}
        </Typography>

        {searchCtaLabel && (
          <Link
            className={classes.sectionLink}
            to={getSearchUrlWithTagsAndCategory(searchTags)}
          >
            {searchCtaLabel}
          </Link>
        )}
      </div>
      {description && (
        <Typography variant="h5" className={classes.sliderDescription}>
          {description}
        </Typography>
      )}
      <button
        className={classNames(classes.navigationButton, classes.nextButton)}
        type="button"
        onClick={swiperNext}
        disabled={isLastSlide}
      >
        <Next />
        <span className={classes.srOnly}>Next</span>
      </button>
      <Swiper {...params} getSwiper={updateSwiper}>
        {slides.map(slide => renderer(slide))}
      </Swiper>
      <button
        className={classNames(classes.navigationButton, classes.prevButton)}
        type="button"
        onClick={swiperPrev}
        disabled={isFirstSlide}
      >
        <Next />
        <span className={classes.srOnly}>Prev</span>
      </button>
    </div>
  );
};

export default TileSlider;
