import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('Test Blog', () => {
  let container
  let likesEventHandler
  beforeEach(() => {
    const blog = {
      title: 'sdsfd',
      author: 'sdfs',
      url: 'sdfsd',
      likes: 5,
    }
    likesEventHandler = jest.fn()
    container = render(
      <Blog blog={blog} handleLikes={likesEventHandler}></Blog>
    ).container
  })

  test('Test initial state of blog section', () => {
    const blogTitle = container.querySelector('.blog-title')
    const blogUrl = container.querySelector('.blog-url')
    const blogLikes = container.querySelector('.blog-likes')
    expect(blogTitle).toBeVisible()
    expect(blogUrl).not.toBeVisible()
    expect(blogLikes).not.toBeVisible()
  })

  test('Test toggled state of blog section', () => {
    const blogToggle = container.querySelector('.blog-toggle')
    UserEvent.click(blogToggle)

    const blogUrl = container.querySelector('.blog-url')
    const blogLikes = container.querySelector('.blog-likes')

    expect(blogUrl).toBeVisible()
    expect(blogLikes).toBeVisible()
  })

  test('Test event handler for toggle', () => {
    const blogLikes = container.querySelector('.blog-likes__update')
    UserEvent.click(blogLikes)
    UserEvent.click(blogLikes)

    expect(likesEventHandler.mock.calls).toHaveLength(2)
  })
})
