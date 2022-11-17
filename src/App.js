import './App.css'
import { useEffect, useState } from 'react'

import blogsService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const userJson = window.localStorage.getItem('loggedInBlogUser')
    if (userJson) {
      const loggedInUser = JSON.parse(userJson)
      setUser(loggedInUser)
      blogsService.setToken(loggedInUser.jwtToken)
      const getAllBlogs = async () => {
        const allBlogs = await blogsService.getAllBlogs()
        setBlogs(sortBlogs(allBlogs))
      }
      getAllBlogs()
    }
  }, [])

  const sortBlogs = (blogsResp) => {
    blogsResp.sort((firstBlog, secondBlog) => {
      return secondBlog.likes - firstBlog.likes
    })
    return blogsResp
  }
  const loginUser = async ({ username, password }) => {
    const userToLogin = {
      username,
      password,
    }
    try {
      const loggedInUser = await loginService.loginUser(userToLogin)

      window.localStorage.setItem(
        'loggedInBlogUser',
        JSON.stringify(loggedInUser)
      )
      blogsService.setToken(loggedInUser.jwtToken)
      setUser(loggedInUser)
      return loggedInUser
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }
  const submitBlog = async ({ title, author, url }) => {
    const newBlog = {
      title,
      author,
      url,
    }
    try {
      const savedBlog = await blogsService.createBlog(newBlog)
      const newBlogsResp = blogs.concat(savedBlog)
      setBlogs(sortBlogs(newBlogsResp))
      setSuccessMessage(
        `a new blog ${savedBlog.title} by ${savedBlog.author} added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 2000)
      return newBlogsResp
    } catch (exception) {
      setErrorMessage(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }
  const errorMessageDisplay = () => {
    if (errorMessage !== null) {
      return <p className="error-message">{errorMessage}</p>
    }
    return ''
  }
  const successMessageDisplay = () => {
    if (successMessage !== null) {
      return <p>{successMessage}</p>
    }
    return ''
  }

  const updateLikes = async (updatedBlog) => {
    const savedBlog = await blogsService.updateBlogLikes(updatedBlog)
    setBlogs(
      sortBlogs(
        blogs.map((blog) => {
          return blog.id === savedBlog.id ? savedBlog : blog
        })
      )
    )
  }

  const deleteBlog = async (blogToDelete) => {
    await blogsService.deleteBlog(blogToDelete)
    const allBlogs = await blogsService.getAllBlogs()
    setBlogs(sortBlogs([].concat(allBlogs)))
  }

  return (
    <div className="App">
      {errorMessageDisplay()}
      {successMessageDisplay()}
      {user === null ? (
        <LoginForm handleLoginEvent={loginUser} />
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>{user.name || user.username} logged in</p>
          <Togglable buttonLabel="Create New Blog">
            <BlogForm handleSubmitBlog={submitBlog} />
          </Togglable>
          <div>
            {blogs.map((blog) => {
              return (
                <div key={blog.id}>
                  <Blog
                    blog={blog}
                    handleLikes={updateLikes}
                    user={user}
                    handleDeleteBlog={deleteBlog}
                  ></Blog>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
