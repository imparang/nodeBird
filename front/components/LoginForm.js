import React, { useCallback } from 'react'
import useInput from '../hooks/useInput'
import { Button, Form } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { loginAction } from '../reducers/user'

const ButtonWrapper = styled.div`
  margin-top: 10px;
`

const FormWrapper = styled(Form)`
  padding: 10px;
`

const LoginForm = () => {
  const [id, onChangeId] = useInput('')
  const [password, onChangePassword] = useInput('')
  const dispatch = useDispatch()

  // onFinish에는 e.preventDefault()가 넣어져 있다
  const onSubmitForm = useCallback(() => {
    dispatch(loginAction({ id, password }))
  }, [id, password])

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor='user-id' >아이디</label>
        <br/>
        <input name='user-id' value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor='user-password'>비밀번호</label>
        <br/>
        <input 
          name='user-password' 
          type="password" 
          value={password} 
          onChange={onChangePassword} 
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType='submit' loading={false}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  )
}

export default LoginForm
