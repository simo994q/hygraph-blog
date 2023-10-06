export const getAllPosts = `query getAllPosts {
  blogPosts(orderBy: publishedAt_DESC) {
    postDate
    postDateTime
    postTitle
    id
    postContent {
      html
    }
  }
}
`