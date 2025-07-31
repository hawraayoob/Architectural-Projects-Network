# Architectural-Design-Portfolio-Management-

Overview
This project showcases a robust portfolio management system created with Express.js and MongoDB using the Model-View-Controller (MVC) architecture. It is designed for architectural firms, designers, and individual architects to manage their design portfolios, projects, and client interactions. The system includes JWT authentication, supporting both query parameters for web views and headers for API calls.

🏗️ MVC Architecture
What is MVC?
MVC (Model-View-Controller) is a software design pattern that separates an application into three interconnected components:
•	Model: Manages data, business logic, and rules
•	View: Displays data and handles user interface
•	Controller: Processes user input and coordinates between Model and View
Our MVC Implementation
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     ROUTES      │    │   CONTROLLERS   │    │     MODELS      │
│                 │    │                 │    │                 │
│ • /projects     │───▶│ • dataController│───▶│ • Project       │
│ • /clients      │    │ • viewController│    │ • Client        │
│ • /portfolios   │    │ • apiController │    │ • Portfolio     │
│ • /users        │    │                 │    │ • User          │
│ • /api/*        │    │                 │    │ • Comment       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │      VIEWS      │
                       │                 │
                       │ • JSX Templates │
                       │ • JSON Responses│
                       │ • Image Gallery │
                       │ • Project Views │
                       └─────────────────┘
File Structure
![text](C:\Users\salma\Downloads\Home page (1).png)







