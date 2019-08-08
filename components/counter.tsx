import React, { Component } from 'react'
import { connect } from 'react-redux'

import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../actions'

interface Props {
  count: number
  dispatchers: typeof actions
}

class Counter extends Component<Props> {
  public increment = () => {
    this.props.dispatchers.increment()
  }

  public decrement = () => {
    this.props.dispatchers.decrement()
  }

  public reset = () => {
    this.props.dispatchers.reset()
  }

  public render() {
    const { count } = this.props
    return (
      <div>
        <style jsx>{`
          div {
            padding: 0 0 20px 0;
          }
        `}</style>
        <h1>
          Count: <span>{count}</span>
        </h1>
        <button onClick={this.increment}>+1</button>
        <button onClick={this.decrement}>-1</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    )
  }
}

const mapStateToProps = ({ count }: { count: number }) => ({ count })
const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchers: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
