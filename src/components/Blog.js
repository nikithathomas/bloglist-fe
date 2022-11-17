import { useState } from 'react'

const Blog = ({ blog, handleLikes, user, handleDeleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const updateLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    handleLikes(updatedBlog)
  }
  const isBlogDeletable = () => {
    if (blog.user && user.name === blog.user.name) {
      return true
    }
    return false
  }
  const deleteBlog = () => {
    const toDeleteBlog = window.confirm(
      `Do you want to delete ${blog.title} by ${blog.author}`
    )
    if (toDeleteBlog) {
      handleDeleteBlog(blog)
    }
  }
  return (
    <section className="blog-section">
      <h3>
        <p className="blog-title">{blog.title}</p>
        <button onClick={toggleVisibility} className="blog-toggle">
          {visible ? 'Hide' : 'View'}
        </button>
      </h3>
      <section style={showWhenVisible}>
        <p className="blog-url">{blog.url}</p>
        <p className="blog-likes">
          {blog.likes}
          <button onClick={updateLikes} className="blog-likes__update">
            Like
          </button>
        </p>
        <p className="blog-author">{blog.author}</p>
        <p className="blog-creator">{blog.user?.name}</p>
        {isBlogDeletable() && <button onClick={deleteBlog} className="blog-delete">Delete</button>}
      </section>
    </section>
  )
}

export default Blog
