import { Button, Input, Form } from 'antd'
import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { addPost } from '../reducers/post'

const PostForm = () => {
  const { imagePath, addPostDone } = useSelector(state => state.post)
  const [text, onChangeText, setText] = useInput('')

  // 단순히 addPost를 하고 나서 초기화하면 안되는 것이
  // 만약 post가 실패했을 때, post 내용을 초기화하면 안되기 때문
  useEffect(() => {
    if (addPostDone) setText('')
  }, [addPostDone])

  const dispatch = useDispatch()
  const onSubmit = useCallback(() => {
    dispatch(addPost(text))
  }, [text])

  const imageInput = useRef(null)
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="mulitpart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          게시글 작성
        </Button>
      </div>
      <div>
        {imagePath &&
          imagePath.map(y => (
            <div key={y} style={{ display: 'inline-block' }}>
              <img src={y} style={{ width: '200px' }} alt={y} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          ))}
      </div>
    </Form>
  )
}

export default PostForm
