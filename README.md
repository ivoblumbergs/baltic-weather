# Baltic Data Weather App 🌤️

Hi! This is my submission for the technical assignment.
I built a full-stack weather app that lets you track weather in different cities.

**Live Demo:** (http://135.181.110.141)
*(Running on my personal VPS (Ubuntu) that i have built)*

## 🏗️ How I Built It (My Thought Process)

### 1. Choosing the Tech Stack
Since the assignment required **React Router v7**, I took the opportunity to fully leverage its **Server-Side Loader** feature.
Instead of using standard client-side `useEffect` fetching, I moved the data logic to the server. This keeps the app fast and ensures my API keys are secure on the backend, which I think is a much cleaner approach than the traditional React way.

### 2. The Database (Prisma + Postgres)
For the bonus task, I used **PostgreSQL**.
To connect to it, I chose **Prisma ORM**. Writing raw SQL queries can be messy, and Prisma makes it really easy to define the database structure (Schema) and see exactly what data I'm working with in my code.

### 3. Docker (Making it run everywhere)
I used **Docker Compose** to bundle the app and the database together.
This was important to me because I didn't want you to have to install Postgres manually just to run my code. With Docker, you just run one command and it works!

### 4. Design & UI (Shadcn + Tailwind)
To meet the requirement of making it **"visually attractive"**, I used **Tailwind CSS** for rapid styling and **Shadcn/ui** for accessible, enterprise-grade components.



---

## 🛠️ Features
*   **Live Weather:** Fetches real-time data from OpenWeatherMap.
*   **Add/Delete Cities:** You can save cities to the database.
*   **Unit Switcher:** A button to switch between Celsius (°C) and Fahrenheit (°F).
*   **Mobile Friendly:** I used Tailwind CSS to make sure it looks good on phones too.

---

## ☁️ Infrastructure & Deployment
I deployed this to my own **personal Cloud Server (VPS)**.
Instead of using automated platforms like Vercel, I wanted to understand how things work under the hood:
*   I set up an **Ubuntu Linux** server from scratch.
*   I configured **Nginx** manually as a Reverse Proxy.
*   I managed the **Node.js** runtime and **Docker** containers directly on the shell.

---

## 📦 How to Run It Locally

1.  **Clone the repo**
    ```bash
    git clone https://github.com/ivoblumbergs/baltic-weather.git
    cd baltic-weather
    ```

2.  **Setup Keys**
    Create a `.env` file with your Database URL and Weather API Key.

3.  **Start it up**
    ```bash
    docker compose up -d  # Starts the Database
    npx prisma db push    # Sets up the Tables
    npm run dev           # Starts the App
    ```

*Built by Ivo Blumbergs*
