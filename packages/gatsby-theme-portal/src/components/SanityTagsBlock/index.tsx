import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import Container from '@material-ui/core/Container';

import { getSearchUrl } from '../../helpers/searchUrl';
import useStyles from './styles';

const Tags: FunctionComponent<TagsInterface> = ({
  tags,
  searchResultPath,
  title,
}) => {
  const classes = useStyles();

  return (
    <section className={classes.tags}>
      <Container maxWidth="lg">
        <h3 className={classes.tagsTitle}>{title}</h3>
        <ul className={classes.tagList}>
          {tags.map((tag: any) => (
            <li className={classes.tagListItem} key={tag.name}>
              <Link
                className={classes.tagsListLink}
                to={getSearchUrl(searchResultPath, tag.name, 'tag')}
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

interface TagsInterface {
  tags: any[];
  searchResultPath?: string;
  title: string;
}
export default Tags;
