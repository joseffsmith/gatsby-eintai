import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Img from "gatsby-image";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`cardiff`, `student`, `houses`]} />
      {/* <Link to="/page-2/">Go to page 2</Link> */}
      <HouseTabs data={data}/>
    </Layout>
  )
}

class HouseTabs extends Component {
  constructor(props) {
    super(props)
    this.state={value:1}
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { edges: glenroyImageData } = this.props.data.GlenroyImgs
    const { edges: mackintoshImageData } = this.props.data.MackintoshImgs

    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Glenroy Street" />
            <Tab label="Mackintosh Place" />
          </Tabs>
        </AppBar>
        {value === 0 &&
          <GridList cellHeight={160} cols={3} style={{'width':'100%','height':'100%','margin':'0 auto'}}>
            <Images houseImgs={glenroyImageData} />
          </GridList>
        }
        {value === 1 &&
          <GridList cellHeight={160} cols={3} style={{'width':'100%','height':'100%',}}>
            <Images houseImgs={mackintoshImageData} />
          </GridList>
        }
      </div>
    );
  }
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
          style={{
            // 'minWidth': '300px',
            'width':'100%',
        }}
        key={img.node.name}
        title={img.node.name}
        sizes={imgSizes}
      />
    )
  })
  return (
    jsxelems
  )
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
