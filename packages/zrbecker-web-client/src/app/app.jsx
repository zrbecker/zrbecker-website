import React from 'react'
import ReactDOM from 'react-dom'

class HelloWorldView extends React.Component {
  render() {
    return (
      <p>Hello World!</p>
    )
  }
}

ReactDOM.render(<HelloWorldView />, document.getElementById('root'))
