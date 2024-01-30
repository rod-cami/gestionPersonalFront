# Gestion de Personal App

## Overview

This web application, developed with React, facilitates personnel management for administrators. The app allows administrators to view a list of active personnel, distinguishing between employees and supervisors. Detailed employee reports are available, showcasing changes in roles and sectors throughout their employment cycle.

![Gestion de Personal App Interface Snapshot](./src/assets/icons/gestion_personal_snapshot.png "Gestion de Personal App Interface Snapshot")

## Installation

To run this project locally, follow these steps:
------------------
1. Clone the repository:
```bash
git clone https://github.com/rod-cami/gestionPersonalFront
cd gestionPersonalFront
```
2. Install dependencies:
```bash
npm install
```
3. Set the API URLs as environment variables:
```bash
REACT_APP_API_URL=https://gestionpersonal.azurewebsites.net
REACT_APP_LOGIN_USER_URL=https://fastapiauth--tobiaspazposse.repl.co/login
```
4. Start the development server:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Employee Management

- **List Employees:** View a list of active personnel, distinguishing between employees and supervisors.
- **Employee Details:** Access detailed reports for each employee, including changes in roles and sectors over time.
- **Add Employees:** Add new employees to the system.
- **Remove Employees:** Remove employees from the system.
- **Modify Employees:** Edit employee details, including role and sector changes.

### Sector and Role Changes

- **Change Sector:** Move an employee to a different sector within the organization.
- **Change Role:** Update an employee's role within the company.

### History Tracking

- **View History:** Visualize the historical changes in roles and sectors for each employee.

## Technologies Used

* React
* HTML/CSS
* Netlify (for deployment)

## Deployment

The live version of the app can be accessed [here](https://gestiondepersonaladmderecursos.netlify.app/ "Link to deployed solution")

## Contributors

* Rodríguez Camila
* Paz Posse Tobías

## License

This project is licensed under the [MIT License](LICENSE).

## Additional Information

For more details on project configuration, deployment, and troubleshooting, refer to the [Create React App documentation](https://facebook.github.io/create-react-app/docs/).
