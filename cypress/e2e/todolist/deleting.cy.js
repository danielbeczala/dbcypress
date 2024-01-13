describe("Deleting", () => {
    before(function () {
      cy.fixture("testData").then(function (data) {
        global.data = data;
      });
    });
  
    beforeEach(function () {
      cy.createTodosByLocalStorage(data.todoItems, [true, true]);
      cy.navigateToHomePage();
      cy.assertTodosVisible(data.todoItems);
    });
  
    it("Should delete choosen todo", () => {
      cy.deleteToDoByName(data.todoItems[0]);
      cy.assertTodosVisible(data.todoItems[1]);
      cy.getByTestData('label').contains(data.todoItems[0]).should("not.exist");
    });
  
    it("Should delete completed todos", () => {
      cy.clearCompletedTasks();
      cy.getByTestData('list').should("not.be.visible");
    });
  });
