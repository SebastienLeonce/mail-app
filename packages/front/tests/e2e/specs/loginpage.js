describe('Loginpage Test', function () {
  before(() => {
    cy.visit('/')
  })
 
const sizes = [
  'macbook-15',
  'macbook-13',
  'macbook-11',
  'ipad-2',
  'ipad-mini',
  'iphone-xr',
  'iphone-x',
  'iphone-6+',
  'iphone-6',
  'iphone-5',
  'iphone-4',
  'iphone-3',
  'samsung-s10',
  'samsung-note9'
]
  sizes.forEach((size) => {
    it(`Should match  ${size} image snapshot`, function () {
      cy.viewport(size);
      cy.matchImageSnapshot(`Loginpage-Test-${size}`, { capture: 'fullPage' })
    })
  })
 })