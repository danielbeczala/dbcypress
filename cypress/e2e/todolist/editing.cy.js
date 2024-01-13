describe("Editing", () => {
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
    });
  
    const checked = "checked";
    const unchecked = "unchecked";
  
    it("Should edit checked todo", () => {
      cy.assertTodosVisible(data.todoItems[0]);
      cy.editToDo(data.todoItems[0], checked);
      cy.assertTodosVisible(checked);
    });
  
    it("Should edit unchecked todo", () => {
      cy.assertTodosVisible(data.todoItems[1]);
      cy.editToDo(data.todoItems[1], unchecked);
      cy.assertTodosVisible(unchecked);
    });
  });
  