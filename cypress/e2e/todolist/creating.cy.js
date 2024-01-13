describe("Creating", () => {
    before(function () {
      cy.fixture("testData").then(function (data) {
        global.data = data;
      });
    });
  
    beforeEach(function () {
      cy.navigateToHomePage();
    });
  
    it("Should create new todo", () => {
      cy.addNewToDo(data.todoItems[0]);
      cy.assertTodosVisible(data.todoItems[0]);
    });
  
    it("Should create multiple new todo", () => {
      data.todoItems.forEach((element) => cy.addNewToDo(element));
      cy.assertTodosVisible(data.todoItems);
    });
  });
  