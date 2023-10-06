const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
let date

if (new Date().getDate() < 10) {
    date = `0${new Date().getDate()}`
} else {
    date = new Date().getDate()
}

const fulldate = `${year}-${month}-${date}`

export const getTodaysPosts = `query getTodaysPosts {
    blogPosts(where: {postDate: "${fulldate}"}) {
      postDate
      postDateTime
      postTitle
      id
      postContent {
        html
      }
    }
  }`