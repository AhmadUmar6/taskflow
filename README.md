# TaskFlow - Task Manager with Obsidian Graph Visualization

**Live Application:** [https://taskflow-nine-xi.vercel.app](https://taskflow-nine-xi.vercel.app/)

TaskFlow is a modern task management application designed to provide a fluid and insightful user experience. It combines a traditional Kanban board for structured workflow management with an innovative Obsidian-style graph visualization to help users discover hidden connections and patterns in their tasks.


## Core Features

* **Kanban Board:** Add, edit, and delete tasks on a clean Kanban board with "To Do", "In Progress", and "Completed" columns. Move tasks seamlessly with both drag-and-drop and one-click action buttons.
* **Obsidian Graph View:** Visualize the relationships between your tasks in an interactive graph. Connections are automatically generated based on shared categories, tags, and deadline proximity.
* **Smart Filtering & Search:** Quickly find any task with a responsive filter bar that supports searching by keyword, category, and tag.
* **Secure User Authentication:** Full authentication system supporting both email/password and Google Sign-In, with all user data protected by Firebase Security Rules.
* **Real-Time Data Sync:** All task and user data is synchronized in real-time across all your devices using Firestore's live listeners.
* **In-App Notifications:** Receive timely, client-side notifications for tasks that are due today or have become overdue.
* **Mobile-First Design:** The application was designed with a **mobile-first philosophy**, ensuring a seamless and intuitive experience on phones.

## Tech Stack

* **Frontend:** React (with Vite)
* **UI Library:** Material-UI (MUI)
* **Data Visualization:** D3.js
* **Backend-as-a-Service (BaaS):** Firebase (Authentication & Firestore)
* **Deployment:** Vercel

## How to Run the Project Locally

To run TaskFlow on your local machine, please follow these steps:

1.  **Clone the Repository**
    ```
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install Dependencies**
    ```
    npm install
    ```

3.  **Set Up Environment Variables**
    * Create a file named `.env` in the root of the project.
    * You will need to create your own project on [Firebase](https://firebase.google.com/) to get your configuration keys.
    * Add your Firebase project configuration keys to the `.env` file as shown here.
        ```
        VITE_API_KEY="YOUR_API_KEY"
        VITE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
        VITE_PROJECT_ID="YOUR_PROJECT_ID"
        VITE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
        VITE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
        VITE_APP_ID="YOUR_APP_ID"
        ```

4.  **Run the Development Server**
    ```
    npm run dev
    ```
    
    The application will be available at `http://localhost:5173`.

## Assumptions Made

* **Notifications:** The notification system is implemented client-side for this prototype. It generates alerts based on the user's currently loaded tasks and does not rely on server-side push notifications.
* **Graph Layout:** The Obsidian graph uses a static, deterministic layout algorithm. This was chosen to provide a consistent and predictable user experience, prioritizing clarity and performance over a dynamic physics-based simulation.
