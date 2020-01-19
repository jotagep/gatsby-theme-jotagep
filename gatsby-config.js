const withDefaults = require(`./utils/default-options`)

module.exports = themeOptions => {
  const options = withDefaults(themeOptions);
  return {
    siteMetadata: {
      title: `Jotagep Blog Placeholder`,
      author: `Jotagep`,
      description: `Description placeholder`,
      social: [
        {
          name: `Twitter`,
          url: `https://twitter.com/@Sir_JotaG`,
        },
        {
          name: `GitHub`,
          url: `https://github.com/jotagep`,
        },
      ],
    },
    plugins: [
      `gatsby-plugin-react-helmet`,
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: options.assetPath,
          name: 'uploads',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `${__dirname}/src/img`,
          name: 'images',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `${__dirname}/src/pages`,
          name: 'pages',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: options.pagesPath,
          name: 'pages',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: options.postsPath,
          name: 'post',
        },
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: [
            {
              resolve: 'gatsby-remark-relative-images',
              options: {
                name: 'uploads',
              },
            },
            {
              resolve: 'gatsby-remark-images',
              options: {
                // It's important to specify the maxWidth (in pixels) of
                // the content container as this plugin uses this as the
                // base for generating different widths of each image.
                maxWidth: 2048,
              },
            },
            {
              resolve: 'gatsby-remark-copy-linked-files',
              options: {
                destinationDir: 'static',
              },
            },
          ],
        },
      },
      `gatsby-plugin-offline`,
    ]
  }
}
