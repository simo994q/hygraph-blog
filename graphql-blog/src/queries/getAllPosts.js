export const getAllPosts = `query getAllPosts {
  blogPosts {
    postDate
    postDateTime
    postTitle
    postContent {
      html
    }
  }
}
`