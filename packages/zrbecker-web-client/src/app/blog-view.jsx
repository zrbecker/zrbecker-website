import HeaderView from './header-view'
import PostView from './post-view'
import React from 'react'
import TableOfContentsView from './table-of-contents-view'

export default class BlogView extends React.Component {
  render() {
    return (
      <div className="blog-view">
        <HeaderView title="Zachary Becker Blog" />
        <TableOfContentsView />
        <PostView />
        <PostView />
        <PostView />
        <PostView />
      </div>
    )
  }
}