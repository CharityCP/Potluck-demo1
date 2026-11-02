Potluck Extraordinaire

Project Overview

Potluck Extraordinaire is a React application that allows guests to view, add, and remove dishes for a shared potluck event.

The project demonstrates how to connect a React frontend to a Supabase PostgreSQL database and perform basic CRUD operations.

Technologies Used

React and Vite
JavaScript and JSX
Supabase and PostgreSQL
Pico CSS and custom CSS
Git and GitHub
Netlify (deployment)
Features

Display meals retrieved from Supabase.
Add a meal using a form.
Remove a specific meal using its unique database ID.
Display meal names, guests, servings, and ingredients.
Show loading, empty-table, and error messages.
Display responsive meal cards using CSS Grid.
Database Structure

Supabase table: meals

Column

Type

Purpose

id

int8

Unique meal identifier

created_at

timestamptz

Record creation timestamp

name

text

Name of the dish

guest

text

Guest bringing the dish

servings

numeric

Number of servings

ingredients

json

Optional ingredient list

Project Structure

src/App.jsx — Main application, meal form, and add/remove handlers.
src/MealCard.jsx — Reusable component displaying individual meals.
src/useTable.js — Custom React hook for retrieving database records and managing loading/error states.
src/supabaseClient.js — Configures the Supabase client.
src/index.css — Custom styling and responsive layout.
CRUD Operations

CREATE: Supabase .insert() adds a new meal.
READ: Supabase .select('*') retrieves existing meals.
DELETE: Supabase .delete().eq('id', id) removes a selected meal.
UPDATE functionality is not included in this version.

Supabase Security

Row Level Security (RLS) is enabled on the meals table.

The classroom demonstration uses public SELECT, INSERT, and DELETE policies. These permissions support the assignment but are not appropriate for storing sensitive or production data because unauthenticated visitors can modify the meal records.

Environment Variables

Create a .env.local file in the project root containing:

VITE_SUPABASE_URL=your_supabase_project_url

VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

Use your own Supabase project values. Never commit .env.local or private credentials to GitHub.

Local Setup

Clone the GitHub repository.
Open the project directory.
Install dependencies using bun install.
Configure .env.local.
Start the development server using bun run dev.
Open the local URL provided by Vite.
Testing

The application has been tested locally for reading existing meals, inserting new records, and deleting individual meals. The meal cards update after deletion without reloading the page.

Development Workflow

The project uses GitHub Issues to organize tasks and a development branch for implementation and review.

Reflection

This project strengthened my understanding of React state, props, custom hooks, asynchronous database requests, and Supabase CRUD operations. I also practiced debugging JavaScript scope errors, restructuring reusable components, and configuring database access policies.


