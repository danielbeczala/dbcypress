describe("Filtering", () => {
    before(function () {
      cy.fixture("testData").then(function (data) {
        global.data = data;
      });
    });
  
    beforeEach(function () {
      cy.createTodosByLocalStorage(data.todoItems, [true, false]);
      cy.navigateToHomePage();
      cy.assertTodosVisible(data.todoItems);
    });
  
    const activeFilter = "Active";
    const completedFilter = "Completed";
    const allFilter = "All";
  
    it("Should filter Active todos", () => {
      cy.applyFilter(activeFilter);
      cy.getByTestData("filters").contains(activeFilter).should("have.class", "selected");
      cy.assertTodosVisible(data.todoItems[1]);
    });
  
    it("Should filter Completed todos", () => {
      cy.applyFilter(completedFilter);
      cy.getByTestData("filters").contains(completedFilter).should("have.class", "selected");
      cy.assertTodosVisible(data.todoItems[0]);
    });
  
    it("Should filter All todos", () => {
      cy.applyFilter(allFilter);
      cy.getByTestData("filters").contains(allFilter).should("have.class", "selected");
      cy.assertTodosVisible(data.todoItems);
    });
  });
  