# Docker Compose Project

This repository contains a Docker Compose project. The project sets up a multi-container Docker application with three services: a web server, an authentication server, and a database server. Below are the details of each service and how they are configured to interact with each other.

## Project Structure

- `ServerWeb/`: Contains the Dockerfile and application code for the web server.
- `ServerAuth/`: Contains the Dockerfile and application code for the authentication server.
- `ServerDB/`: Contains the Dockerfile and application code for the database server.
- `docker-compose.yml`: Docker Compose file to define and run the multi-container application.

## Services

### 1. Web Server (Nginx)

- **Directory**: `ServerWeb/`
- **Container Name**: `web`
- **Internal Port**: `80`
- **Exposed Port**: `8080` (Host)
- **Description**: This service runs an Nginx web server. It serves a web application that communicates with the authentication and database servers using proxy and via internal Docker networks.
- **Networks**: 
  - `db_net`
  - `auth_net`

### 2. Authentication Server (Express.js and Node.js)

- **Directory**: `ServerAuth/`
- **Container Name**: `authentication`
- **Internal Port**: `8000`
- **Exposed Port**: Not exposed to the host, only accessible within Docker networks.
- **Description**: This service runs an authentication server using Express.js and Node.js. It handles user authentication and is only accessible by the web server via the internal network.
- **Networks**: 
  - `auth_net`

### 3. Database Server (Express.js and Node.js)

- **Directory**: `ServerDB/`
- **Container Name**: `database`
- **Internal Port**: `8000`
- **Exposed Port**: Not exposed to the host, only accessible within Docker networks.
- **Description**: This service runs a database server using Express.js and Node.js. It provides data storage and retrieval functionality and is only accessible by the web server via the internal network.
- **Networks**:
  - `db_net`

## Setup and Usage

To set up and run this project, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Almor21/Docker-Compose.git
   cd <repository_directory>
   ```

2. **Build and Start the Containers**:
   ```bash
   docker-compose up --build
   ```

3. **Access the Web Application**:
   Open your web browser and go to `http://localhost:8080`.

## Notes

- The web server is the only service exposed to the host machine. It communicates with the authentication and database servers through internal Docker networks.
- The internal networks `db_net` and `auth_net` isolate the communication between services, ensuring security and separation of concerns.
