import React from 'react'

export default class PostView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posted: new Date(),
    }
  }

  render() {
    return (
      <div className="post-view">
        <h3>Post Title</h3>
        <p>Posted: {this.state.posted.toDateString()}</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
          maiores libero inventore ratione dolor rerum omnis magnam eligendi
          unde eos iste facere, vitae nisi voluptate. Facilis ipsum earum
          quisquam sint!</p>
      </div>
    )
  }
}