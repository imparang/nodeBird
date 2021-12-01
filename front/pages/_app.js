import React from 'react'
import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
import Head from 'next/head'

// index.js return 이 들어감
// _app.js는 pages의 공통부분
const App = ({Component}) => {
  return (<>
    <Head>
      <meta charSet="utf-8" />
      <title>NodeBird</title>
    </Head>
    <Component />
    
  </>)
}
App.propTypes = {
  Component: PropTypes.elementType.isRequired
}
export default App
