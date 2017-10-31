import React from 'react'
import ReactMarkdown from 'react-markdown'

export default class PostView extends React.Component {
  render() {
    let {title, date, content} = this.props.post
    return (
      <div className="post-view">
        <h1>{title}</h1>
        <p>Posted: {date.toDateString()}</p>
        <ReactMarkdown source={content} />
      </div>
    )
  }
}
