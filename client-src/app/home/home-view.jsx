import React from 'react'

import photo256 from '../images/website_photo_256.jpg'

const HomeView = () => {
  return (
    <div class="container">
      <header>
        <h1>Zachary Becker</h1>
        <img src={photo256} />
      </header>
      <section>
        <p>Email: <a href="mailto:zrbecker@gmail.com">zrbecker@gmail.com</a></p>
        <p>Linkedin: URL</p>
        <p>Github: URL</p>
        <p>Resume: URL</p>
      </section>
    </div>
  )
}

export default HomeView
