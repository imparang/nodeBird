import shortId from 'shortid'
import produce from 'immer'
import faker from 'faker'
import {
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
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'noze'
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          id: shortId.generate(),
          src: 'https://dummyimage.com/300.png/09f/fff'
        },
        {
          id: shortId.generate(),
          src: 'https://dummyimage.com/300x300/333/fff'
        },
        {
          id: shortId.generate(),
          src: 'https://dummyimage.com/600x600/999/fff'
        }
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'aiki'
          },
          content: '너 나 좋아하더라'
        }
      ]
    }
  ],
  imagePaths: [],
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

initialState.mainPosts = initialState.mainPosts.concat(
  Array(20)
    .fill()
    .map(() => ({
      id: shortid.generate(),
      Images: [
        {
          src: faker.image.imageUrl()
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
)

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
