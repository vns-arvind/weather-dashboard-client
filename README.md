---
# High-Level Integration Overview

## Component Integration
```mermaid
flowchart LR
    subgraph Frontend["React Frontend"]
        A1[SearchBar Component]
        A2[WeatherDisplay Component]
        A3[DefaultLocation Component]
        A4[useWeather Hook]
        A5[useUserPreferences Hook]
    end

    subgraph Backend["ASP.NET Core Web API"]
        B1[WeatherController]
        B2[UserPreferenceController]
        B3[WeatherService]
        B4[UserPreferenceService]
        B5[IMemoryCache]
        B6[Polly Retry Policy]
    end

    subgraph External["External APIs"]
        C1[(OpenWeatherMap API)]
    end

    A1 -->|fetchWeather()| B1
    A3 -->|setDefaultCity()| B2
    B1 -->|calls| B3
    B3 -->|retry + cache| B5
    B3 -->|fetch weather data| C1
    B2 -->|cache default city| B4
    B4 --> B5
```

---

# React Weather Dashboard Application Setup Guide

A lightweight React frontend for the Weather Dashboard Application that connects to an ASP.NET Core Web API backend.

---

## Features

- Search and display current weather by city name.
- Set and store default city.
- Fetches weather data from ASP.NET Web API.
- Responsive UI for desktop and mobile.

---

## Prerequisites

Before setting up the React app, ensure you have the following installed:

- Node.js (v18 or later)
- npm (comes with Node.js)
- A running instance of the backend API (http://localhost:5290)

---

## Setup Instructions

### 1️ Navigate to the project folder
```bash
cd client
```

### 2️ Install dependencies
```bash
npm install
```

### 3️ Create `.env` file

In the `client` folder, create a file named `.env` and add the following content:

```env
# Local ASP.NET Web API endpoint
REACT_APP_LOCAL_API_URL=http://localhost:5290/api/Weather

# Optional - user preferences (default city)
REACT_APP_USER_API_URL=http://localhost:5290/api/UserPreferences

---

## Running the Application

### Start the development server
```bash
npm start
```

This will start the app on:
http://localhost:3000

Ensure the backend API is running on:
http://localhost:5290

---

## Build for Production

To create an optimized build for deployment:
```bash
npm run build
```

The build output will be generated in the `/build` folder.

---

