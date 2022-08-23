import type {GatsbyConfig} from "gatsby"

const config: GatsbyConfig = {
    siteMetadata: {
        siteUrl: `https://project-12c-thejamstacktodoapp.netlify.app`,
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `JAMStack Todo App`,
                short_name: `todoapp`,
                start_url: `/`,
                background_color: `#f7f0eb`,
                theme_color: `#3f4ab0`,
                display: `standalone`,
                icon: `src/images/arabica.svg`,
            },
        },
        {
            resolve: `gatsby-plugin-offline`,
            options: {
                precachePages: [`/index/`, `/app/`],
            },
        },
        'gatsby-plugin-top-layout',
        'gatsby-plugin-mui-emotion',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-apollo',
    ],
}

export default config
