import process from 'process'

export default {
  blogApi: !!process.env.FEATURE_BLOG_API || false
}
