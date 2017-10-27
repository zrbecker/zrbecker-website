import HeaderView from './header-view'
import PostView from './post-view'
import React from 'react'
import TableOfContentsView from './table-of-contents-view'

const posts = [
  {
    id: 2,
    title: 'Hello World',
    date: new Date(),
    content: `
# Test
## Test
### Test
#### Test
##### Test
###### Test

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet euismod
urna. Nulla facilisi. Sed vestibulum, tortor sed fermentum tincidunt, ligula
quam dignissim odio, ut porta risus nisi id est. Interdum et malesuada fames ac
ante ipsum primis in faucibus. Donec condimentum lacus non velit dictum
pharetra. Quisque ut turpis et lorem luctus aliquam ac eget sapien. Nullam eu
sapien in risus efficitur luctus at et velit. Mauris imperdiet volutpat velit.
Nullam vulputate imperdiet tempor. Sed suscipit ante purus, sit amet convallis
orci vulputate quis. Sed massa dolor, scelerisque id tellus vel, scelerisque
viverra augue.

Aliquam nec auctor sem. Morbi et nibh sit amet dolor condimentum posuere sed sed
lectus. Sed auctor elit eget nibh porttitor, eu rhoncus nulla tristique. Quisque
vitae consequat sapien, euismod faucibus dolor. Suspendisse sed dui nulla. Duis
pharetra erat sit amet leo fringilla, quis pretium sem malesuada. In molestie
libero sed pulvinar sollicitudin. Donec ac libero tempus ligula tempor
tincidunt. Aliquam a condimentum metus. Donec laoreet ligula diam. Cras sed
congue sem.

Vivamus eu augue eget sapien porttitor tempor. Vivamus vehicula lacus in luctus
egestas. Morbi et massa leo. Fusce lacinia ligula eu lacus posuere auctor.
Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam dignissim, ex
eget pellentesque lobortis, nibh lorem ullamcorper lacus, vitae semper augue
libero vitae ante. Sed convallis sollicitudin nibh vitae varius. Vestibulum ante
ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;

Etiam ut dapibus nisi, sed mattis tortor. Praesent eu laoreet purus. In pretium
dolor at congue semper. Pellentesque bibendum tortor vel tincidunt sollicitudin.
Curabitur blandit, ipsum ut tempus pulvinar, eros lacus pretium leo, eu tempus
nisi nulla ut nisl. Sed neque nibh, aliquet id venenatis quis, blandit eget
tortor. In non feugiat massa. Mauris id nibh odio. Vivamus sem risus, tempor
pretium vestibulum nec, faucibus ac nisi.

Ut in eros non metus cursus lobortis. Praesent maximus malesuada erat non
volutpat. Suspendisse dapibus euismod ultricies. Vivamus dolor lorem, aliquet
quis dui in, auctor eleifend libero. Donec at tortor ac diam hendrerit
sollicitudin. Suspendisse nisl felis, sagittis et sollicitudin vel, vehicula in
enim. Duis id imperdiet lectus, sed malesuada mi. Sed nunc sapien, blandit nec
augue vel, pharetra tincidunt lacus. Proin vulputate commodo sem ac mattis.
Phasellus fermentum tempus tellus a tempus. Maecenas fermentum tristique tortor,
vel hendrerit diam. Vivamus nec sapien ut erat maximus porta. Sed rhoncus ligula
mauris, quis vulputate turpis congue pharetra.
    `
  },
  {
    id: 1,
    title: 'First Post!',
    date: new Date(),
    content: 'This is my first post.'
  },
]

export default class BlogView extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: posts
    }
  }

  _renderPosts() {
    const postViews = []
    for (const post of this.state.posts) {
      postViews.push(
        <div key={post.id}>
          <hr />
          <PostView key={post.id} post={post} />
        </div>
      )
    }
    return postViews
  }

  render() {
    return (
      <div className="blog-view">
        <HeaderView title="Zachary Becker" />
        <hr />
        <TableOfContentsView />
        {this._renderPosts()}
      </div>
    )
  }
}