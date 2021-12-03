import React from 'react'
import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
import Head from 'next/head'

import wrapper from '../store/configureStore'

// index.js return 이 들어감
// _app.js는 pages의 공통부분

// next에서는 redux를 사용할 떄 Provider를 안써도 된다. (알아서 감싸줌)
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
export default wrapper.withRedux(App)
