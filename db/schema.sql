DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INTEGER NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id)
    REFERENCES departments(department_id) ON DELETE CASCADE
);

CREATE TABLE employees (
    employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    employee_role_id INTEGER NOT NULL,
    manager_id INTEGER DEFAULT 1,
    FOREIGN KEY (role_id)
    REFERENCES roles(role_id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) 
    REFERENCES employees(employee_id) ON DELETE CASCADE

)