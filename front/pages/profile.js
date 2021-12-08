import React, { useEffect } from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import FollowList from '../components/FollowList'
import FollowerList from '../components/FollowerList'
import NicknameEditForm from '../components/NicknameEditForm'
import { useSelector } from 'react-redux'
import Router from 'next/router'

const Profile = () => {
  const { me } = useSelector(state => state.user)

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/')
    }
  })
  if (!me) {
    return null
  }
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowerList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
  )
}

export default Profile
