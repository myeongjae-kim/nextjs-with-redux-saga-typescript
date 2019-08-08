import withReduxSaga from 'next-redux-saga'
import withRedux, { AppProps } from 'next-redux-wrapper'
import App, { AppContext, Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'

import createStore from '../store'

class MyApp extends App<AppProps> {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      // pageProps = await Component.getInitialProps({ ctx })
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  public render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp))
