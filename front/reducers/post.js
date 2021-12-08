import shortId from 'shortid'
import produce from 'immer'
import faker from 'faker'
import {
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE
} from './types'
import shortid from 'shortid'

const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePost: true,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null
}

export const generateDummyPost = number =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortid.generate(),
      Images: [
        {
          src: faker.image.image()
        }
      ],
      Comments: [
        {
          User: {
            id: shortid.generate(),
            nickname: faker.name.findName()
          },
          content: faker.lorem.paragraph()
        }
      ],
      User: {
        id: shortid.generate(),
        nickname: faker.name.findName()
      },
      content: faker.lorem.paragraph()
    }))

initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10))

export const addPost = data => {
  return {
    type: ADD_POST_REQUEST,
    data
  }
}

export const addComment = data => {
  return {
    type: ADD_COMMENT_REQUEST,
    data
  }
}

export const removePost = data => {
  return {
    type: REMOVE_POST_REQUEST,
    data
  }
}

const dummyPost = data => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'monika'
  },
  Images: [],
  Comments: []
})

const dummyComment = data => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'aiki'
  }
})

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true
        draft.loadPostDone = false
        draft.loadPostError = null
        break
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false
        draft.loadPostDone = true
        draft.mainPosts = action.data.concat(draft.mainPosts)
        draft.hasMorePost = draft.mainPosts.length < 50
        break
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false
        draft.loadPostError = action.error
        break
      case ADD_POST_REQUEST:
        draft.addPostLoading = true
        draft.addPostDone = false
        draft.addPostError = null
        break
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false
        draft.addPostDone = true
        draft.mainPosts.unshift(dummyPost(action.data))
        break
      case ADD_POST_FAILURE:
        draft.addPostLoading = false
        draft.addPostError = action.error
        break
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true
        draft.addCommentDone = false
        draft.addCommentError = null
        break
      case ADD_COMMENT_SUCCESS: {
        // const postIndex = state.mainPosts.findIndex(
        //   v => v.id === action.data.postId
        // )
        // const post = state.mainPosts[postIndex]
        // post.Comments = [dummyComment(action.data.content), ...post.Comments]
        // const mainPosts = [...state.mainPosts]
        // mainPosts[postIndex] = post
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true
        // }
        const post = draft.mainPosts.find(v => v.id === action.data.postId)
        post.Comments.unshift(dummyComment(action.data.content))
        draft.addCommentLoading = false
        draft.addCommentDone = true
        break
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false
        draft.addCommentError = action.error
        break
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true
        draft.removePostDone = false
        draft.removePostError = null
        break
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false
        draft.removePostDone = true
        draft.mainPosts = state.mainPosts.filter(v => v.id !== action.data)
        break
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false
        draft.removePostError = action.error
        break
      default:
        return state
    }
  })
}

export default reducer
