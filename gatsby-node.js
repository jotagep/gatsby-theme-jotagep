const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);
const Debug = require(`debug`)
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { createFilePath } = require('gatsby-source-filesystem');

const package = require('./package.json');
const withDefaults = require(`./utils/default-options`);
const debug = Debug('gatsby-theme-blog-jotagep');

let url = package && package.homepage ? package.homepage.trim() : '';
if (url.slice(-1) !== '/') {
    url += '/';
}

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
    const { program } = store.getState()
    const { assetPath, postsPath, projectsPath, pagesPath } = withDefaults(themeOptions)
  
    const dirs = [
      path.join(program.directory, pagesPath),
      path.join(program.directory, postsPath),
      path.join(program.directory, projectsPath),
      path.join(program.directory, assetPath),
    ]
  
    dirs.forEach(dir => {
        console.log(dir);
      debug(`Initializing ${dir} directory`)
      if (!fs.existsSync(dir)) {
        mkdirp.sync(dir)
      }
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  fmImagesToRelative(node);
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
      {
          allMarkdownRemark(
              filter: {
                  frontmatter: {
                      templateKey: {
                          glob: "*"
                      }
                  }
              }
          ) {
              edges {
                  node {
                      id
                      fields {
                          slug
                      }
                      frontmatter {
                          templateKey
                      }
                  }
              }
          }
      }
  `).then(result => {
      if (result.errors) {
          result.errors.forEach(e => console.error(e.toString()))
          return Promise.reject(result.errors)
      }

      const pages = result.data.allMarkdownRemark.edges;
      const now = new Date();

      pages.forEach(edge => {
          console.log(edge.node.fields.slug);
          createPage({
              path: edge.node.fields.slug,
              component: require.resolve(
                  `./src/templates/${String(edge.node.frontmatter.templateKey)}.js`
              ),
              context: {
                  id: edge.node.id,
                  url,
                  pageUrl: `${url}${edge.node.fields.slug}`,
                  date: [ now.getFullYear(), ("0" + (now.getMonth() + 1)).slice(-2), ("0" + now.getDate()).slice(-2) ].join('-')
              },
          });
      });
});
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node @infer {
        frontmatter: Frontmatter
    }
    type Frontmatter {
      list: [List]
    }

    type List {
        name: String,
        surname: String,
        role: String
    }
  `;
  createTypes(typeDefs);
}