import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS
} from './types'

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
          src: 'https://dummyimage.com/300.png/09f/fff'
        },
        {
          src: 'https://dummyimage.com/300x300/333/fff'
        },
        {
          src: 'https://dummyimage.com/600x600/999/fff'
        }
      ],
      Comments: [
        {
          User: {
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
  addCommentError: null
}

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

const dummyPost = {
  id: 2,
  content: '가짜랍니다',
  User: {
    id: 1,
    nickname: 'monika'
  },
  Images: [],
  Comments: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: true,
        addPostDone: false,
        addPostError: null
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true
      }
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error
      }
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null
      }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addCommentLoading: false,
        addCommentDone: true
      }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error
      }
    default:
      return state
  }
}

export default reducer
