describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/tests/reset')
    const newUser = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('Login')
  })
  it('login with wrong credentials', () => {
    cy.get('.login-form__username').type('mluukkai')
    cy.get('.login-form__password').type('sdfsd')
    cy.get('.login-form__submit').click()

    cy.get('.error-message').should('contain', 'wrong credentials')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })
  it('login form can be opened', function () {
    cy.get('.login-form__username').type('mluukkai')
    cy.get('.login-form__password').type('salainen')
    cy.get('.login-form__submit').click()

    cy.contains('Matti Luukkainen logged in')
  })

  describe('User logged in', function () {
    beforeEach(function () {
      cy.get('.login-form__username').type('mluukkai')
      cy.get('.login-form__password').type('salainen')
      cy.get('.login-form__submit').click()
    })
    it('a blog can be created', function () {
      cy.contains('Create New Blog').click()

      cy.get('.blog-form__title').type('HI people')
      cy.get('.blog-form__author').type('Nikita')
      cy.get('.blog-form__url').type('sdfds')

      cy.get('.blog-form__submit').click()

      cy.get('.blog-title').contains('HI people')
    })
    describe('User can like a blog', function () {
      beforeEach(function () {
        cy.contains('Create New Blog').click()

        cy.get('.blog-form__title').type('Test Blog')
        cy.get('.blog-form__author').type('Test Author')
        cy.get('.blog-form__url').type('Test url')

        cy.get('.blog-form__submit').click()
      })

      it('Test if blog can be liked', function () {
        cy.get('.blog-title')
          .contains('Test Blog')
          .parent()
          .find('.blog-toggle')
          .as('viewBlog')

        cy.get('@viewBlog').click()

        cy.get('.blog-likes').as('blogLike')
        cy.get('@blogLike').find('.blog-likes__update').click()
        cy.get('@blogLike').contains('1')
      })
    })

    describe('A blog can be deleted', function () {
      beforeEach(function () {
        cy.contains('Create New Blog').click()

        cy.get('.blog-form__title').type('Test Blog')
        cy.get('.blog-form__author').type('Test Author')
        cy.get('.blog-form__url').type('Test url')

        cy.get('.blog-form__submit').click()
      })

      it('A blog can be deleted', async function () {
        cy.get('.blog-title')
          .contains('Test Blog')
          .parent()
          .find('.blog-toggle')
          .as('viewBlog')

        cy.get('@viewBlog').click()

        await cy.get('.blog-section').find('.blog-delete').click()
        // cy.get('blog-title').should('have.length', 0)
      })
    })

    describe('blogs are sorted', function () {
      beforeEach(async function () {
        cy.contains('Create New Blog').click()

        cy.get('.blog-form__title').as('blogTitle')
        cy.get('.blog-form__author').as('blogAuthor')
        cy.get('.blog-form__url').as('blogUrl')

        cy.get('@blogTitle').type('Test Blog 1')       
        cy.get('@blogAuthor').type('Test Author 1')        
        cy.get('@blogUrl').type('Test url 1')

        await cy.get('.blog-form__submit').click()

        // cy.get('@blogTitle').type('Test Blog 2')       
        // cy.get('@blogAuthor').type('Test Author 2')        
        // cy.get('@blogUrl').type('Test url 2')

        // await cy.get('.blog-form__submit').click()
      })
      it('test if blogs are sorted', function () {})
    })
  })
})
