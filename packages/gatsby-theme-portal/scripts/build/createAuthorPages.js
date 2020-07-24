const path = require('path');
const { getPagePath } = require('../utils');
const component = path.resolve(
  process.cwd(),
  `../gatsby-theme-portal/src/templates/Author/index.tsx`
);

module.exports = async ({ graphql, createPage }) => {
  const result = await graphql(`
    {
      authors: allSanityAuthor {
        nodes {
          id
          name
          parentPage {
            slug {
              current
            }
          }
          slug {
            current
          }
        }
      }
    }
  `);
  const items = result.data.authors.nodes;

  items
    .filter(node => node.slug)
    .forEach(node => {
      createPage({
        path: getPagePath(node),
        component,
        context: {
          authorName: node.name,
          slug: node.slug.current,
          id: node.id,
        },
      });
    });
};
