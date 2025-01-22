VIRTUAL LIBRARY

<!-- ABOUT THE PROJECT -->
## About The Project
P2P Book Exchange Platform: A web-based application that enables users to browse, manage, and exchange books within a virtual library. Built using Spring Boot (backend) and React (frontend), the system ensures secure and seamless user interactions with robust features and intuitive design.


### Built With

- Springboot (Maven)
- React
- MongoDB Atlas



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* NPM
  ```sh
  npm install npm@latest -g
  ```
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Varidhi123456/virtual-library.git
   ```
2. `cd` into the frontend directory
3. Install NPM packages
   ```sh
   npm i
   ```
4. Run the following command to start the server
   ```sh
   npm start
   ```

### SETUP
Backend:
cd backend
mvn clean install
mvn spring-boot:run

Frontend:
cd frontend
npm install
npm start

All POST,GET requests update the database.(Can test using the restclient.http file (path: backend/src/main/resources/static/RestClient.http))

Due to scarcity of time, I was unable to debug authentication and implement Jwt Token and Otp based login.

Rough UI (Lofi prototype) attached in the email :>

Future extentions: 
1. Book recommendations through AI
2. BOOK RECOGNITION BY CAMERA (USE OF AI)
3. Integrate real-time chat for book exchange negotiations.
4. Screen responsiveness (use on mobile as well)
5. Deploy the application using Docker, AWS.

