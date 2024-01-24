## Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- TypeScript
- MySql

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
   
Install dependencies:
npm install

Database Configuration
Open ormconfig.json and update the database connection details:
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "password",
    "database": "user",
    "synchronize": true,
    "logging": true,
    "entities": [
        "src/entities/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entities"
    }
}

Environment Variables
Create a .env file in the root of your project and add the following environment variables:
JWT_SECRET=your_secret_key


Running the Application
Start the application:
npm start

