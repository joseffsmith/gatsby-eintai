import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Img from "gatsby-image";

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const { edges: glenroyImageData } = data.GlenroyImgs
  const { edges: mackintoshImageData } = data.MackintoshImgs
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Link to="/page-2/">Go to page 2</Link>
      <Images houseImgs={glenroyImageData} />
    </Layout>
  )
}

class Images extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { houseImgs } = this.props
    const jsxelems = houseImgs.map(img => {
      const imgSizes = img.node.childImageSharp.sizes
      return (
        <Img
          key={img.node.name}
          title={img.node.name}
          sizes={imgSizes}
        />
      )
    })
    return jsxelems
  }
}


export const ImageQuery = graphql`
  query allImgsQuery {
    MackintoshImgs: allFile(
      sort: { order: ASC, fields: [absolutePath] }
      filter: { relativePath: { regex: "/MackintoshPlace/.*.jpeg/" } }
    ) {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            sizes(maxWidth: 640) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
    GlenroyImgs: allFile(
      sort: { order: ASC, fields: [absolutePath] }
      filter: { relativePath: { regex: "/GlenroyStreet/.*.jpeg/" } }
    ) {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            sizes(maxWidth: 640) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;



export default IndexPage
