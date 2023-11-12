# 🌍 Cities UI: Your Urban Data Dashboard

## Overview
Welcome to Cities UI! This web application makes it easy to explore city data. You can view, sort, and filter information about different cities, such as their population, area, and more.

## ⚙️ Key Features
- **🏙 City Viewer**: Detailed listings of cities with important information.
- **🔀 Data Sorting**: Sort city data by various metrics like name, population, area, and density.
- **🔍 Advanced Filtering**: Use filters to find specific city data by city name.
- **💻 Responsive UI**: A smooth experience on any device.

## 🛠 Technology Stack
- **🌐 SAP UI5**: For a robust and scalable user interface.
- **📜 TypeScript**: Clear and maintainable application logic.
- **🐳 Docker**: Streamlined local development.
- **🔗 Docker Compose**: Connects service and UI applications for local development.

## 📚 Prerequisites
Before starting, ensure you have these installed (links to installation guides provided):
- [Node.js (version 18.12.0 or higher)](https://nodejs.org/en/download/)
- [npm (Node Package Manager)](https://www.npmjs.com/get-npm)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🚀 Installation Guide
Set up the project on your machine:

1. **Clone the Cities UI Repository**:
   ```sh
   git clone https://github.com/petar-rusev/cities-ui.git

2. **Enter the Project Directory**
```sh
cd cities-ui
```

3. **Install Dependencies**
```sh
npm install
```

## 🏃‍♂️ Start Application Locally

### Option 1: Using Docker-Compose

1. **Navigate to the cities-app directory:**
```sh
cd cities-app
```

2. **Launch the Application:**
```sh
docker-compose up
```
### This starts the [cities-service spring boot application](https://github.com/petar-rusev/cities-service) and the cities-app SAP UI5 application

## Option 2: Manually Starting the cities-service and cities-app

1. **Clone and Start cities-service:**
### Clone the cities-service repository and follow the instructions in its README to start the service locally.

2. Start the Cities UI APP
### Navigate to the cities-app directory withing the cities-ui project:
```sh
cd cities-app
```
### Start the application 
```sh
npm start
```
This will spin up the cities-app on http://localhost:8080






