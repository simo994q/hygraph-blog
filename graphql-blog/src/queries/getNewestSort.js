export const getNewestSort = `query getNewestSort {
  blogPosts(orderBy: postDate_DESC) {
    postDate
    postTitle
    postContent {
      html
    }
  }
}
`