// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
Cypress.Commands.add("navigateToHomePage", () => {
	cy.visit(Cypress.env("home_page"));
	cy.getByTestData('new').should("be.visible");
});

Cypress.Commands.add("getByTestData", (selector, ...args) => {
    return cy.get(`[data-todo=${selector}]`, ...args);
  });

Cypress.Commands.add("addNewToDo", (newToDo) => {
	cy.getByTestData('new').type(`${newToDo}{enter}`);
});

Cypress.Commands.add("assertTodosVisible", (todoName) => {
	cy.getByTestData('label')
		.should("be.visible")
		.each(($el) => {
			if ($el.text().includes(todoName)) {
				expect($el).to.contain(todoName);
			}
		});
});

Cypress.Commands.add("createTodosByLocalStorage", (taskNames, completedValues) => {
	const todos = taskNames.map((taskName, index) => {
		return { title: taskName, completed: completedValues[index], id: `id_${index}` };
	});

	cy.window().then((win) => {
		win.localStorage.setItem(Cypress.env("todo_key"), JSON.stringify(todos));
	});
});

Cypress.Commands.add("editToDo", (toDoToEdit, newToDo) => {
	cy.getByTestData('label').contains(toDoToEdit).dblclick();

	cy.get(".editing").find('[data-todo="edit"]').clear().type(`${newToDo}{enter}`);
});

Cypress.Commands.add("checkToDo", (toDoName, shouldCheck) => {
	cy.getByTestData('label')
		.contains(toDoName)
		.parent()
		.find('[data-todo="toggle"]')
		.as("checkboxSelector");

	if (shouldCheck) {
		cy.get("@checkboxSelector").check();
		cy.get("@checkboxSelector").should("be.checked");
	} else {
		cy.get("@checkboxSelector").uncheck();
		cy.get("@checkboxSelector").should("not.be.checked");
	}
});

Cypress.Commands.add("applyFilter", (filterName) => {
	cy.getByTestData('filters').contains(filterName).click();
});

Cypress.Commands.add("deleteToDoByName", (toDoName) => {
	cy.getByTestData('label')
		.contains(toDoName)
		.parent()
		.find('[data-todo="destroy"]')
		.click({ force: true });
});

Cypress.Commands.add("clearCompletedTasks", () => {
	cy.getByTestData('clear-completed').contains("Clear completed").click();
});

Cypress.Commands.add("toggleAllTodos", (toDoNames, shouldCheck) => {
	cy.getByTestData('toggle-all').click();

	toDoNames.forEach((toDoName) => {
		cy.getByTestData('label')
			.contains(toDoName)
			.parent()
			.find('[type="checkbox"]')
			.as("checkboxSelector");

		if (shouldCheck) {
			cy.get("@checkboxSelector").should("be.checked");
		} else {
			cy.get("@checkboxSelector").should("not.be.checked");
		}
	});
});

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
