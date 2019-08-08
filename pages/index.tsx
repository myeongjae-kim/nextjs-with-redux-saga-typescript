import React from 'react'
import { connect } from 'react-redux'

import { NextPageContext } from 'next';
import { bindActionCreators, Dispatch, Store } from 'redux';
import { loadData, tickClock } from '../actions'
import * as actions from '../actions'
import Page from '../components/page'

interface InitialProps extends NextPageContext {
  store: Store
  isServer: boolean
}

class Index extends React.Component<{
  dispatchers: typeof actions
}> {
  public static async getInitialProps(props: InitialProps) {
    const { store, isServer } = props
    store.dispatch(tickClock(isServer))

    if (!store.getState().placeholderData) {
      store.dispatch(loadData())
    }

    return { isServer }
  }

  public componentDidMount() {
    this.props.dispatchers.startClock()
  }

  public render() {
    return <Page title='Index Page' linkTo='/other' NavigateTo='Other Page' />
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchers: bindActionCreators(actions, dispatch)
})

export default connect(() => ({}), mapDispatchToProps)(Index)
