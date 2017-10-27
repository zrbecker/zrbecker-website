import React from 'react'

export default class HeaderView extends React.Component {
  render() {
    return (
      <div className="header-view">
        <h1>{this.props.title}</h1>
      </div>
    )
  }
}