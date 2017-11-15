import React from 'react'
import FontAwesome from 'react-fontawesome'

import photo256 from '../images/website_photo_256.jpg'

const HomeView = () => {
  return (
    <div className="container" style={{textAlign: 'center'}}>
      <header>
        <h1>Zachary Becker</h1>
        <img src={photo256} />
      </header>
      <section>
        <p>
          I am a software engineer with interest in data science and machine
          learning. Additionally I've been learning about full stack javascript
          development, web security, and cloud deployments.
        </p>
      </section>
      <section>
        <p>
          <span style={{padding: '0 0.5em'}}>
            <FontAwesome name='envelope' />{' '}
            <a href='mailto:zrbecker@gmail.com'>Email</a>
          </span>
          <span style={{padding: '0 0.5em'}}>
            <FontAwesome name='linkedin' />{' '}
            <a href='#'>LinkedIn</a>
          </span>
          <span style={{padding: '0 0.5em'}}>
            <FontAwesome name='github' />{' '}
            <a href='#'>Github</a>
          </span>
        </p>
      </section>
    </div>
  )
}

export default HomeView
