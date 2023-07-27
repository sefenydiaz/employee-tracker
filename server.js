const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db/connection');

function init() {
    console.log('Welcome to the employee tracker!')
    mainQuestion();

}
async function mainQuestion() {
    const {main} = await inquirer.prompt({
        name: "main",
        message: "What would you like to do?",
        type: "list",
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Create an employee',
            'Create a department',
            'Create a role',
            'Update employee role',
        ]
    })
    //add switch cases to all choices
    switch (main) {
        case 'View all employees':
            viewEmployees()
            break;
        case 'View all departments':
            viewDepartments()
            break;
        case 'View all roles':
            viewRoles()
            break;
        case 'Create an employee':
            createEmployee()
            break;
        case 'Create a department':
            createDepartment()
            break;
         case 'Create a role':
            createRole()
            break;
        case 'Update employee role':
            updateEmployeeRole()
            break;
        default:
            console.log('Good-bye!');
            process.exit(0);
            
    }
}
// same function for view functions
async function viewDepartments() {
    const [departments] = await db.promise().query("SELECT * FROM departments")
    console.table(departments);
    setTimeout(mainQuestion, 3000)
}

async function viewEmployees() {
    const [employees] = await db.promise().query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id")
    console.table(employees);
    setTimeout(mainQuestion, 3000)
}

async function viewRoles() {
    const [roles] = await db.promise().query("SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles LEFT JOIN departments on roles.department_id = departments.id")
    console.table(roles);
    setTimeout(mainQuestion, 3000)
}


// create functions
async function createDepartment() {
    const department = await inquirer.prompt([
        {
            name: "name",
            message: "What is the name of this department?",
            type: "input",

        }
    ])
    await db.promise().query("INSERT INTO departments SET ?", department);
    console.log('New department created!');
    setTimeout(mainQuestion, 3000);
}

async function createRole() {
    const [departments] = await db.promise().query("SELECT * FROM departments")
    const depChoices = departments.map(dep=>({name: dep.name, value: dep.id}))
    const role = await inquirer.prompt([
        {
            name: "title",
            message: "What is the title of this role?",
            type: "input",
        },
        {
            name: "salary",
            message: "What is the salary for this role?",
            type: "number",
        },
        {
            name: "department_id",
            message: "What department does this role belong to?",
            type: "list",
            choices: depChoices
        }
    ])
    await db.promise().query("INSERT INTO roles SET ?", role);
    console.log('New role created!');
    setTimeout(mainQuestion, 3000);
    console.log(role)
}

//create employee
async function createEmployee() {
    const [roles] = await db.promise().query("SELECT * FROM roles")
    const roleChoices = roles.map(role=>({name: role.title, value: role.id}))

    const employee = await inquirer.prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?",
            type: "input"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?",
            type: "input"
        },
        {
            name: "role_id",
            message: "What is the role of the employee?",
            type: "list",
            choices: roleChoices
        },
    ])
    await db.promise().query("INSERT INTO employees SET ?", employee);
    console.log('New employee created!');
    setTimeout(mainQuestion, 3000);
    console.log(employee)
}


async function updateEmployeeRole() {
    const [employees] = await db.promise().query("SELECT * FROM employees")
    const empChoices = employees.map(emp=>({name: emp.first_name + " " + emp.last_name, value: emp.id}))

    const [roles] = await db.promise().query("SELECT * FROM roles")
    const roleChoices = roles.map(role=>({name: role.title, value: role.id}))


    const {employeeId, roleId} = await inquirer.prompt([
        {
            name: "employeeId",
            message: "What is the name of the employee you would like to update?",
            type: "list",
            choices: empChoices
        },
        {
            name: "roleId",
            message: "What is the new role of the employee?",
            type: "list",
            choices: roleChoices
        },
    ])
    await db.promise().query("UPDATE employees SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    console.log('Employee updated!');
    setTimeout(viewEmployees, 1000);
}

init();

// name: role.title, value: role.id
// const empChoices = employees.map(emp=>({name: emp.first_name + " " + emp.last_name, value: emp.id}))

// outlined example code
// const [departments] = await db.promise().query("SELECT * FROM departments")

// const depChoices = departments.map(dep=>({name: dep.name, value: dep.id}))