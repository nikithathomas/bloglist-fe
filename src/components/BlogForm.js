import { useState } from 'react'

const BlogForm = ({ handleSubmitBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitBlog = async (event) => {
    event.preventDefault()

    await handleSubmitBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={submitBlog}>
      <h2>Create new blog</h2>
      <div className="blog-form">
        <label>Title</label>
        <input
          className="blog-form__title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          className="blog-form__author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label>Url</label>
        <input
          type="text"
          className="blog-form__url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button className="blog-form__submit" type="submit">
        Create Blog
      </button>
    </form>
  )
}

export default BlogForm
