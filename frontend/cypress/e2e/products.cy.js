/// <reference types="cypress" />

import { formatCurrency } from '../../src/utils/format-currency'

describe('Products (E2E)', () => {
  beforeEach(() => {
    cy.visit('/products')
  })

  it('Should list all the registered products', () => {
    cy.fixture('products').then((products) => {
      cy.get('[data-cy="product-item"]').should('have.length', products.length)
      cy.get('[data-cy="product-item"]').each((element, i) => {
        cy.wrap(element)
          .should('be.visible')
          .find('[data-cy="product-id"]')
          .should('have.text', products[i].id)

        cy.wrap(element)
          .find('[data-cy="product-name"]')
          .should('have.text', products[i].name)

        cy.wrap(element)
          .find('[data-cy="product-price"]')
          .should('have.text', `${formatCurrency(products[i].price)}`)

        products[i].composition.forEach((composition, pos) => {
          cy.wrap(element)
            .find('[data-cy="product-composition"]')
            .eq(pos)
            .should(
              'have.text',
              `${composition.name} (${composition.quantityRequired} ${composition.unit})`
            )
        })
      })
    })
  })
})
