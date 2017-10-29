import process from 'process'

export default {
  blogApi: !!process.env.FEATURE_BLOG_API || false,
  authApi: !!process.env.FEATURE_AUTH_API || false
}
