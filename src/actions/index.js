import _ from "lodash"
import jsonPlaceholder from "../APIs/jsonPlaceholder"

export const fetchPostsAndUsers = () => async (dispach, getState) => {
  await dispach(fetchPosts())

  // const userIds = _.uniq(_.map(getState().posts, 'userId'))
  // userIds.forEach(id => dispach(fetchUser(id)))
  // 下に書き換え

  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispach(fetchUser(id)))
    .value()
}

export const fetchPosts = () => async dispach => {
  const response = await jsonPlaceholder.get('/posts')

  dispach({ type: 'FETCH_POSTS', payload: response.data })
}

export const fetchUser = id => async dispach => {
  const response = await jsonPlaceholder.get(`/users/${id}`)

  dispach({ type: 'FETCH_USER', payload: response.data })
}


// export const fetchUser = id => dispach => _fetchUser(id, dispach)
// const _fetchUser = _.memoize(async (id, dispach) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`)

//   dispach({ type: 'FETCH_USER', payload: response.data })
// })
