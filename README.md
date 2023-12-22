# PowerModule


## Getting Started

Follow the steps below to get the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository to your local machine: `git clone https://github.com/dmnovb/power-module-task.git`
2. Navigate to the client folder: `cd powermodule/client`
3. Install dependencies: `npm install`
4. Navigate to the server folder: `cd ../server`
5. Install server dependencies: `npm install`


#### Client

Navigate to the client folder: `cd powermodule/client`
Run the development server: `npm run dev`
Access the client application at [http://localhost:5173](http://localhost:5173).

#### Server

Navigate to the server folder: `cd powermodule/server`
Run the server: `npm run dev`
The server will be running at [http://localhost:1337](http://localhost:1337).
Go to `/amps` or `/volts` to check the generated values from the routes.
And that's it.

### Running Cypress Tests

To run Cypress tests:

1. Ensure that both the client and server are running.
2. Open a new terminal window.
3. Navigate to the client folder: `cd powermodule/client`
4. Run Cypress tests: `npx cypress open`

Cypress will open its test runner, allowing you to interact with and observe the test execution.

### Technologies Used

- **Frontend:**
  - React
  - Redux
  - TypeScript
  - Vite

- **Backend:**
  - Node.js
  - Express

- **Testing:**
  - Cypress


### Screenshot
![image](https://github.com/dmnovb/power-module-task/assets/90683442/e72bed74-31bd-48df-b590-cf29bcd92a8e)

