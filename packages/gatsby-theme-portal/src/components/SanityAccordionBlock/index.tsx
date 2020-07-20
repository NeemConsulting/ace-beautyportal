import React, { FunctionComponent, useState } from 'react';
import Container from '@material-ui/core/Container';
import classNames from 'classnames';

import BlockContent from '@sanity/block-content-to-react';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import { SanityAccordionBlockInterface } from './models';
import { ReactComponent as ArrowUp } from '../../images/icons/up.svg';
import useStyles from './styles';

const SanityAccordionBlock: FunctionComponent<SanityAccordionBlockInterface> = ({
  name,
  _rawTextBlockBody,
}) => {
  const [accordion, toggleAccordion] = useState(false);
  const classes = useStyles();

  return (
    <section className={classNames()}>
      <Container>
        <div className={classNames(classes.section, classes.accordion)}>
          <h2>
            <button
              type="button"
              onClick={() => toggleAccordion(!accordion)}
              className="header"
            >
              <span>{name}</span>
              <ArrowUp className={accordion ? 'up' : 'down'} />
            </button>
          </h2>
          <div className={accordion ? 'contentExpand' : `contentCollapse`}>
            <BlockContent
              serializers={blockTypeDefaultSerializers}
              blocks={_rawTextBlockBody}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SanityAccordionBlock;
