import React from "react"
import Header from "../components/header"
import Navigation from "../components/navigation"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.site.siteMetadata.title}</title>
        <meta httpEquiv="content-language" content="en-us" />
      </Helmet>
      <Header />
      <Navigation />
      {children}
    </div>
  )
}
