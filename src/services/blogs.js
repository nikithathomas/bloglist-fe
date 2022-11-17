import axios from 'axios'

const baseUrl = '/api/blogs'

let config = {}

const setToken = (jwtToken) => {
  const token = `bearer ${jwtToken}`
  config = {
    headers: {
      'Authorization': token,
    },
  }
}
const getAllBlogs = async () => {
  const blogsResponse = await axios.get(baseUrl, config)
  return blogsResponse.data
}

const createBlog = async (newBlog) => {
  const createdBlog = await axios.post(baseUrl, newBlog, config)
  return createdBlog.data
}
const updateBlogLikes = async (updatedBlog) => {
  const savedBlog = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  )
  return savedBlog.data
}
const deleteBlog = async (blogToDelete) => {
  await axios.delete(`${baseUrl}/${blogToDelete.id}`, config, blogToDelete)
}
export default {
  getAllBlogs,
  setToken,
  createBlog,
  updateBlogLikes,
  deleteBlog,
}
