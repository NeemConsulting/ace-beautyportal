import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import Container from '@material-ui/core/Container';
import { getSearchUrl } from '../../helpers/searchUrl';
import useStyles from './styles';

const Breadcrumb: FunctionComponent<BreadcrumbInterface> = ({
  tag,
  pageTitle,
  searchResultPath,
  authors,
}) => {
  const classes = useStyles();

  return (
    <section className={classes.wrapper}>
      <Container maxWidth="lg">
        <div className="">
          <ul className={classes.items}>
            <li className={classes.item}>
              <Link to={'/'} className={classes.link}>
                Home
              </Link>
            </li>
            {authors === 'true' && (
              <li className={classes.item}>
                <Link to={'/authors'} className={classes.link}>
                  Authors
                </Link>
              </li>
            )}
            {tag && (
              <>
                <li className={classes.item}>
                  <Link
                    to={getSearchUrl(
                      searchResultPath,
                      tag.tagCategory.name,
                      'category'
                    )}
                    className={classes.link}
                  >
                    {tag.tagCategory.name}
                  </Link>
                </li>
                <li className={classes.item}>
                  <Link
                    to={getSearchUrl(searchResultPath, tag.name, 'category')}
                    className={classes.link}
                  >
                    {tag.name}
                  </Link>
                </li>
              </>
            )}
            <li className={classNames(classes.item, classes.active)}>
              {pageTitle}
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
};

interface BreadcrumbInterface {
  tag?: any;
  pageTitle: string;
  searchResultPath?: string;
  authors: any;
}

export default Breadcrumb;
