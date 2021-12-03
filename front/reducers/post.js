export const initialState = {
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
  postAdded: false
}

const ADD_POST = 'ADD_POST'

export const addPost = () => {
  return {
    type: ADD_POST
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
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true
      }
    default:
      return state
  }
}

export default reducer
