import { Button, Input, Form } from 'antd'
import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../reducers/post'

const PostForm = () => {
  const { imagePath } = useSelector(state => state.post)
  const [text, setText] = useState('')
  
  const onChangeText = useCallback(e => {
    setText(e.target.value)
  }, [])

  const imageInput = useRef(null)
  const dispatch = useDispatch()

  const onSubmit = useCallback(() => {
    dispatch(addPost())
    setText('')
  }, [])

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="mulitpart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
      <div>
        <input type='file' multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type='primary' style={{ float: 'right'}} htmlType='submit'>게시글 작성</Button>
      </div>
      <div>
        {imagePath && imagePath.map(y => (
          <div key={y} style={{display: 'inline-block'}}>
            <img src={y} style={{width: '200px'}} alt={y} />
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
