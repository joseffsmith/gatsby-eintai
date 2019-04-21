import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled, { css, keyframes } from 'styled-components';

import Header from "./header"
import "./layout.css"

const color_grey = "#efefef"
const color_red = "#a12a2a"
const color_red_hover = "#ce4141"
const color_white = "#f9f9f9"
const color_dark_green = "#0e3f00"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <PageNavbar>
          <SiteTitle>
            {data.site.siteMetadata.title}
          </SiteTitle>
        </PageNavbar>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
            by
            <a href="https://github.com/joseffsmith">Joseff Smith</a>
          </footer>
      </>
    )}
  />
)

const PageNavbar = styled.div`
  background-color: ${color_white};
  margin: 0 auto;
  max-width: 960;
  padding: 1rem 2rem 1rem 0px;
`

const SiteTitle = styled.div`
  color: ${color_red};
  font-size: 1.5rem;
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
