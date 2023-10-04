export const getOldestSort = `query getOldestSort {
    blogPosts(orderBy: postDate_DESC) {
      postDate
      postTitle
      postContent {
        html
      }
    }
  }
  `