import React, { useCallback } from 'react'
import { Avatar, Button, Card } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequestAction } from '../reducers/user'

const UserProfile = () => {
  const { me, logOutLoading } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction())
  })
  return (
    <Card
      actions={[
        <div key="twit">
          트윗
          <br />
          {me.post.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {me.Follwings.length}
        </div>,
        <div key="followers">
          팔로워
          <br />
          {me.Followers.length}
        </div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  )
}

export default UserProfile
