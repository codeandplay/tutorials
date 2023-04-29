const path = require('path')

module.exports = {
  siteMetadata: {
    title: ``,
    description: ``,
    author: `code and play`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        start_url: `/`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": path.resolve(__dirname, 'src/components'),
          "@styles": path.resolve(__dirname, 'src/styles'),
          "@images": path.resolve(__dirname, 'src/images'),
          "@static": path.resolve(__dirname, 'src/static')
        },
      }
    }
  ],
}
