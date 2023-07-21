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
    const [employees] = await db.promise().query("SELECT * FROM employees")
    console.table(employees);
    setTimeout(mainQuestion, 3000)
}

async function viewRoles() {
    const [roles] = await db.promise().query("SELECT * FROM roles")
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


init();



// outlined example code
// const [departments] = await db.promise().query("SELECT * FROM departments")

// const depChoices = departments.map(dep=>({name: dep.name, value: dep.id}))