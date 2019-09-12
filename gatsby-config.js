const { name } = require('./package.json')
const path = require('path')

module.exports = {
  pathPrefix: process.env.CI ? `/${name}` : '/',
  siteMetadata: {
    author: 'SeonHyungJo',
    title: 'Renewal Blog',
    siteUrl: 'https://gatsby-sseon-starter.netlify.com'
  },
  plugins: [
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        title: 'sNyung stater',
        name: 'Gasby sNyung stater',
        short_name: 'sNyung',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#663399',
        display: 'standalone',
        icon: 'assets/logo.png'
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/some-other-sitemap.xml',
        exclude: ['/posts/*', '/acticle/*', '/aboutme', '/category/*'],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/post`,
        name: 'post'
      }
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
        component: path.join(__dirname, 'src/components'),
        layout: path.join(__dirname, 'src/layout'),
        style: path.join(__dirname, 'src/style'),
        util: path.join(__dirname, 'src/util'),
        post: path.join(__dirname, 'post'),
        assets: path.join(__dirname, 'assets'),
        data: path.join(__dirname, 'data'),
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false
            }
          },
          'gatsby-remark-emoji'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        configFile: 'robots-txt.config.js'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/layout/index.jsx'),
      },
    },
  ]
}
