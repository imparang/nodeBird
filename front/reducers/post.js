import produce from 'immer'
import {
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  REMOVE_IMAGE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE
} from './types'

const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePost: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unLikePostLoading: false,
  unLikePostDone: false,
  unLikePostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null
}

export const addPost = text => {
  return {
    type: ADD_POST_REQUEST,
    data: text
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

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case RETWEET_REQUEST:
        draft.retweetLoading = true
        draft.retweetDone = false
        draft.retweetError = null
        break
      case RETWEET_SUCCESS: {
        draft.retweetLoading = false
        draft.retweetDone = true
        draft.mainPosts.unshift(action.data)
        break
      }
      case RETWEET_FAILURE:
        draft.retweetLoading = false
        draft.retweetError = action.error
        break
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data)
        break
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true
        draft.uploadImagesDone = false
        draft.uploadImagesError = null
        break
      case UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths = action.data
        draft.uploadImagesLoading = false
        draft.uploadImagesDone = true
        break
      }
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false
        draft.uploadImagesError = action.error
        break
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true
        draft.loadPostsDone = false
        draft.loadPostsError = null
        break
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false
        draft.loadPostsDone = true
        draft.mainPosts = action.data.concat(draft.mainPosts)
        draft.hasMorePost = draft.mainPosts.length < 50
        break
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false
        draft.loadPostsError = action.error
        break
      case ADD_POST_REQUEST:
        draft.addPostLoading = true
        draft.addPostDone = false
        draft.addPostError = null
        break
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false
        draft.addPostDone = true
        draft.mainPosts.unshift(action.data)
        draft.imagePaths = []
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
        const post = draft.mainPosts.find(v => v.id === action.data.PostId)
        post.Comments.unshift(action.data)
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
        draft.mainPosts = state.mainPosts.filter(
          v => v.id !== action.data.PostId
        )
        break
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false
        draft.removePostError = action.error
        break
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true
        draft.likePostDone = false
        draft.likePostError = null
        break
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find(v => v.id === action.data.PostId)
        post.Likers.push({ id: action.data.UserId })
        draft.likePostLoading = false
        draft.likePostDone = true
        break
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false
        draft.likePostError = action.error
        break
      case UNLIKE_POST_REQUEST:
        draft.unLikePostLoading = true
        draft.unLikePostDone = false
        draft.unLikePostError = null
        break
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find(v => v.id === action.data.PostId)
        post.Likers = post.Likers.filter(v => v.id !== action.data.UserId)
        draft.unLikePostLoading = false
        draft.unLikePostDone = true
        break
      }
      case UNLIKE_POST_FAILURE:
        draft.unLikePostLoading = false
        draft.unLikePostError = action.error
        break
      default:
        return state
    }
  })
}

export default reducer
