import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
   const query = gql `
   query MyQuery {
      postsConnection {
        edges {
          node {
            createdAt
            excerpt
            title
            categories {
              name
              slug
            }
            authors {
              bio
              id
              name
              photo {
                url
              }
            }
            slug
            featuredImage {
              url
            }
          }
        }
      }
    }
   `
   const result = await request(graphqlAPI, query);
   return result.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        authors{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};





export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy:createdAt_ASC
        last:3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
    }
  `
  const result = await request(graphqlAPI, query);
  return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query Categories {
      categories {
        name
        slug
      }

    }
  `
  const result = await request(graphqlAPI, query);
  return result.categories;

};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: {slug: $slug } } ) {
        name
        createdAt
        comment
      }

    }
  `
  const result = await request(graphqlAPI, query, { slug });
  
  return result.comments;

};



export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};