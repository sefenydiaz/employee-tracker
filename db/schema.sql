DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INTEGER NOT NULL,
    department_id INT,
    CONSTRAINT fk_department
    FOREIGN KEY (department_id)
    REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER DEFAULT 1,
    CONSTRAINT fk_role
    FOREIGN KEY (role_id)
    REFERENCES roles(id) ON DELETE CASCADE,
    CONSTRAINT fk_manager
    FOREIGN KEY (manager_id) 
    REFERENCES employees(id) ON DELETE SET NULL

)