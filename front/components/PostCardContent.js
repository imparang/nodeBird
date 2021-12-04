import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((el, index) => {
        if (el.match(/(#[^\s#]+)/)) {
          return (
            <Link key={index} href={`/hashtag/${el.slice(1)}`}>
              <a>{el}</a>
            </Link>
          )
        }
        return el
      })}
    </div>
  )
}

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired
}

export default PostCardContent
