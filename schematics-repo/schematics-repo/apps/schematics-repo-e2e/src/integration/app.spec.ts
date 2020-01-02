import { getGreeting } from '../support/app.po';

describe('schematics-repo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to schematics-repo!');
  });
});
