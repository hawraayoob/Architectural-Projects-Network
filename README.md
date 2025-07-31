# Architectural-Design-Portfolio-Management-

Overview
This project showcases a robust portfolio management system created with Express.js and MongoDB using the Model-View-Controller (MVC) architecture. It is designed for architectural firms, designers, and individual architects to manage their design portfolios, projects, and client interactions. The system includes JWT authentication, supporting both query parameters for web views and headers for API calls.

🏗️ MVC Architecture
What is MVC?
MVC (Model-View-Controller) is a software design pattern that separates an application into three interconnected components:
•	Model: Manages data, business logic, and rules
•	View: Displays data and handles user interface
•	Controller: Processes user input and coordinates between Model and View

MVC Implementation
<img width="900" height="698" alt="Picture2" src="https://github.com/user-attachments/assets/6e4360b5-82dc-4e64-964d-0708b642fde5" />

File Structure
<img width="2229" height="1444" alt="Home page (1)" src="https://github.com/user-attachments/assets/3263c218-bac1-42e8-8c86-df752e17379d" />

🚀 Production Deployment
Docker Deployment
# Build Docker image
docker build -t architectural-portfolio .

# Run with Docker Compose
docker-compose up -d

# Scale services
docker-compose up -d --scale app=3
Environment Setup













