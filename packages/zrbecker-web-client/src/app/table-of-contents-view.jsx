import React from 'react'

export default class TableOfContentsView extends React.Component {
  render() {
    return (
      <div className="table-of-contents-view">
        <a href="#">Home</a>{' - '}
        <a href="#">Archive</a>{' - '}
        <a href="#">Resume</a>
      </div>
    )
  }
}