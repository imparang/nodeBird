import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input } from 'antd'
import useInput from '../hooks/useInput'
import { ADD_COMMENT_REQUEST } from '../reducers/types'

const CommentForm = ({ post }) => {
  const dispatch = useDispatch()
  const { addCommentDone, addCommentLoading } = useSelector(state => state.post)
  const id = useSelector(state => state.user.me?.id)
  const [commentText, onChangeCommentText, setCommentText] = useInput('')

  useEffect(() => {
    if (addCommentDone) setCommentText('')
  }, [addCommentDone])

  const onsubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id }
    })
  }, [commentText, id])

  return (
    <Form onFinish={onsubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 100 }}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          댓글달기
        </Button>
      </Form.Item>
    </Form>
  )
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired
}

export default CommentForm
