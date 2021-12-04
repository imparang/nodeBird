import { Avatar, Button, Card, Comment, Popover, List } from 'antd'
import React, { useCallback, useState } from 'react'
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import PostImages from './PostImages'
import CommentForm from './CommentForm'
import PostCardContent from './PostCardContent'

const PostCard = ({ post }) => {
  const id = useSelector(state => state.user.me?.id)
  const [liked, setLiked] = useState(false)
  const [commentFormOpend, setCommentFormOpend] = useState(false)

  const onToggleLike = useCallback(() => {
    setLiked(prev => !prev)
  }, [])

  const onToggleComment = useCallback(() => {
    setCommentFormOpend(prev => !prev)
  }, [])

  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && id === post.User.id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>
        ]}
      >
        <Card.Meta
          description={<PostCardContent postData={post.content} />}
          title={post.User.nickname}
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
        />
      </Card>
      {commentFormOpend && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
}
export default PostCard
