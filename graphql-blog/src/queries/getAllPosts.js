export const getAllPosts = `query BlogPosts {
    blogPosts {
      postDate
      postTitle
      publishedAt
      postContent {
        html
      }
    }
  }`