describe("Checking", () => {
    before(function () {
      cy.fixture("testData").then(function (data) {
        global.data = data;
      });
    });
  
    beforeEach(function () {
      cy.createTodosByLocalStorage(
        [data.todoItems[0], data.todoItems[1]],
        [true, false]
      );
      cy.navigateToHomePage();
      cy.getByTestData('count').contains("1 item left");
    });
  
    it("Should check todo", () => {
      cy.assertTodosVisible(data.todoItems[1]);
      cy.checkToDo(data.todoItems[1], true);
      cy.get('[data-id="id_1"]').should("have.class", "completed");
      cy.getByTestData('count').contains("0 items left");
    });
  
    it("Should unchecked todo", () => {
      cy.assertTodosVisible(data.todoItems[0]);
      cy.checkToDo(data.todoItems[0], false);
      cy.get('[data-id="id_0"]').should("not.have.class", "completed");
      cy.getByTestData('count').contains("2 items left");
    });
  
    it("Should check and uncheck both todo", () => {
      cy.toggleAllTodos(data.todoItems, true);
      cy.getByTestData('count').contains('0 items left');
      cy.toggleAllTodos(data.todoItems, false);
      cy.getByTestData('count').contains('2 items left');
    });
  });
  