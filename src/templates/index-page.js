import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

const IndexPage = ({ data, pageContext }) => {
  const thisData = data.main.frontmatter;

  return (
    <>
        <Layout>
            <h1>{thisData.title}</h1>
        </Layout>
    </>
  )
}

export default IndexPage;

export const pageQuery = graphql`
    query IndexQuery {
        main: markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
            frontmatter {
                title
            }
        }        
    }
`
