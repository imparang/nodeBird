import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { LOAD_POSTS_REQUEST, LOAD_USER_REQUEST } from '../reducers/types'

const Home = () => {
  const dispatch = useDispatch()
  const { me } = useSelector(state => state.user)
  const { mainPosts, hasMorePost, loadPostLoading, retweetError } = useSelector(
    state => state.post
  )

  useEffect(() => {
    if (retweetError) {
      alert(retweetError)
    }
  }, [retweetError])

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST
    })
    dispatch({
      type: LOAD_USER_REQUEST
    })
  }, [])

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasMorePost, loadPostLoading])

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  )
}

export default Home
