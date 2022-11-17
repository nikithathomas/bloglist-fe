import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

describe('Test Blog Form', () => {
  let container
  let submitBlogEventHandler
  beforeEach(() => {
    submitBlogEventHandler = jest.fn()
    container = render(
      <BlogForm handleSubmitBlog={submitBlogEventHandler}></BlogForm>
    ).container
  })

  test('Test Blog Form submission', async () => {
    const blogFormTitle = container.querySelector('.blog-form__title')
    const blogFormAuthor = container.querySelector('.blog-form__author')
    const blogFormUrl = container.querySelector('.blog-form__url')
    const blogFormSubmitBtn = container.querySelector('.blog-form__submit')

    await UserEvent.type(blogFormTitle, 'sdfs')
    await UserEvent.type(blogFormAuthor, 'sdfsdgs')
    await UserEvent.type(blogFormUrl, 'ertete')

    await UserEvent.click(blogFormSubmitBtn)
    expect(submitBlogEventHandler.mock.calls).toHaveLength(1)
    expect(submitBlogEventHandler.mock.calls[0][0].title).toBe('sdfs')
    expect(submitBlogEventHandler.mock.calls[0][0].author).toBe('sdfsdgs')
    expect(submitBlogEventHandler.mock.calls[0][0].url).toBe('ertete')
  })
})
