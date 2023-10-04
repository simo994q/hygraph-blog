export const getAllPosts = `query BlogPosts {
  blogPosts {
    postDate
    postTitle
    postContent {
      text
    }
  }
}
`