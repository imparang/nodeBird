import React, { useCallback } from 'react'
import useInput from '../hooks/useInput'
import { Button, Form } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequestAction } from '../reducers/user'
import { useEffect } from 'react/cjs/react.development'

const ButtonWrapper = styled.div`
  margin-top: 10px;
`

const FormWrapper = styled(Form)`
  padding: 10px;
`

const LoginForm = () => {
  const { logInLoading, logInError } = useSelector(state => state.user)
  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (logInError) {
      alert(logInError)
    }
  }, [logInError])

  // onFinish에는 e.preventDefault()가 넣어져 있다
  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }))
  }, [email, password])

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  )
}

export default LoginForm
