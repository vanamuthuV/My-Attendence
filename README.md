# Attendance Management System

The Attendance Management System is a project built on RDBMS principles, focusing on CRUD operations. This application provides a streamlined way to manage attendance records and is ideal for use as a mini-project in Database Management Systems (DBMS).

## Live Demo

Check out the live version of the project [here](https://my-attendence.vercel.app/).

## Tech Stack

- **ReactJS**: Used for building the dynamic and responsive frontend.
- **NodeJS**: A JavaScript runtime for executing server-side code.
- **Express**: A web application framework for NodeJS, used to build RESTful APIs.
- **PostgreSQL**: A powerful, open-source relational database for managing data.
- **REST API**: Facilitates communication between the client and server.
- **Aiven**: Used for online database hosting.
- **Vercel**: Platform for hosting both the client and server.

## Key Features

- **CRUD Operations**: Create, Read, Update, and Delete attendance records.
- **User Authentication**: Login credentials are provided by the administration.
- **RDBMS Implementation**: Utilizes relational database management principles for data storage.

## Usage

This project can serve as a mini-project for students or developers looking to practice and understand CRUD operations in an RDBMS environment.

## Getting Started

To clone and run the Attendance Management System locally, follow these steps:

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/yourusername/attendance-management.git
    ```

2. **Navigate to the Project Directory**:

    ```bash
    cd attendance-management
    ```

3. **Install Dependencies**:

    ```bash
    npm install
    ```

4. **Set Up Database**:

    Ensure you have PostgreSQL installed and running. Use Aiven or your local PostgreSQL instance to set up the database. Insert login credentials into the `admin_staff` table as required.

5. **Start the Development Server**:

    ```bash
    npm start
    ```

6. **Open Your Browser**:

    Visit `http://localhost:3000` to view the application.

## Login Credentials

Login credentials are managed by the administration. If you are cloning this repository, you will need to insert credentials into the `admin_staff` table manually.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **ReactJS, NodeJS, Express, PostgreSQL**: For providing the technologies that power the application.
- **Aiven and Vercel**: For hosting the online database and the application.

