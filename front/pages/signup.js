import React, { useCallback, useState } from 'react'
import useInput from '../hooks/useInput'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import { Button, Checkbox, Form, Input } from 'antd'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { SIGN_UP_REQUEST } from '../reducers/types'

const ErrorMessage = styled.div`
  color: red;
`

const Signup = () => {
  const dispatch = useDispatch()
  const { signUpLoading } = useSelector(state => state.user)

  // id는 mysql에서 충돌이 난다. 그래서 이메일 사용
  const [email, onChangeEmail] = useInput('')
  const [nickname, onChangeNickname] = useInput('')
  const [password, onChangePassword] = useInput('')

  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value)
      setPasswordError(e.target.value !== password)
    },
    [password]
  )

  const [term, setTerm] = useState('')
  const [termError, setTermError] = useState(false)
  const onChangeTerm = useCallback(e => {
    setTerm(e.target.checked)
    setTermError(false)
  }, [])

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) setPasswordError(true)
    if (!term) setTermError(true)
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname }
    })
  }, [password, passwordCheck, term])
  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>

      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            name="user-email"
            type="email"
            value={email}
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="user-nicknam">닉네임</label>
          <br />
          <Input
            name="user-nicknam"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            type="password"
            name="user-password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호 확인</label>
          <br />
          <Input
            type="password"
            name="user-password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            회원가입을 동의합니다.
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  )
}

export default Signup
