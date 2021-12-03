import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import FollowList from '../components/FollowList'
import FollowerList from '../components/FollowerList'
import NicknameEditForm from '../components/NicknameEditForm'

const Profile = () => {
  const followerList = [{nickname: 'one'}, {nickname: 'two'}, {nickname: 'three'}]
  const followingList = [{nickname: 'four'}, {nickname: 'five'}, {nickname: 'six'}]
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
          <NicknameEditForm />
          <FollowList header="팔로잉 목록" data={followingList} />
          <FollowerList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  )
}

export default Profile
