# 1+2 — Educational Web Application

An interactive educational web application for children focused on **mathematics and language learning**.

The project combines interactive exercises, games and AI-generated educational content in a bilingual interface.

## Live Project

**[1+2](https://1plus2.vercel.app/)**

## Features

### Mathematics

- Randomly generated mathematical exercises
- Interactive tests
- Different types of tasks for practising basic mathematical skills
- Immediate feedback on answers

### Language Learning

- Language exercises for different language pairs
- AI-generated tests based on the selected languages and difficulty level
- Interactive vocabulary exercises
- Dynamically generated educational content

### Games

- Hangman game with AI-generated words and hints
- Interactive drag-and-drop exercises
- Support for both mouse and touch interactions
- Animated interactions and visual feedback

## AI Integration

The application uses AI to generate educational content dynamically.

AI is used for:

- Generating language exercises
- Generating vocabulary for the Hangman game
- Generating hints
- Creating tests for different language combinations and difficulty levels

Generated game content is stored in **PostgreSQL** when appropriate, allowing the application to reuse generated data.

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Context API

### Backend & Data

- Next.js
- PostgreSQL
- Server-side data processing

### AI

- Google Gemini / Google AI API

### Deployment

- Vercel
- Git / GitHub

## Architecture

The application is built as a full-stack **Next.js** application.

The frontend uses React components and Context for application state. Interactive exercises are implemented as reusable components, while server-side functionality handles data access and AI-related operations.

The application separates interactive client-side functionality from server-side operations such as database access and AI requests.

## Interactive UI

One of the main technical aspects of the project is building educational interactions that work across different input methods.

Drag-and-drop exercises support:

- Mouse interaction
- Touch interaction
- Animated feedback
- Reusable exercise components

This required handling different browser input behaviours while keeping the interaction simple for children.

## Project Structure

The application is organized around reusable React components and separate functionality for:

- Educational exercises
- Games
- AI-generated content
- Database operations
- Shared UI components
- Application state

## Development

The project was developed as an independent full-stack application, including the frontend, backend functionality, database integration, AI integration and deployment.

## Author

**Sergiy Gubriy**

Full-Stack Developer
JavaScript / TypeScript · React · Next.js · Node.js · PostgreSQL
