# Getting Started with the App

This guide provides step-by-step instructions for starting the app using two different methods: Docker-compose and npm start. Additionally, it includes information on accessing the Swagger documentation and authorization.

## Table of Contents

1. [Starting the App with Docker-compose](#starting-the-app-with-docker-compose)
2. [Starting the App with npm start](#starting-the-app-with-npm-start)
3. [Accessing Swagger Documentation](#accessing-swagger-documentation)
4. [Authorization](#authorization)

## Starting the App with Docker-compose

Follow these steps to start the app using Docker-compose:

1. Create a `.env` file in the project root.
2. Copy the contents of `.env.example` into the `.env` file.
3. Run the following command: `npm run docker:up`

## Starting the App with npm start

Follow these steps to start the app using npm start:

1. Create a `.env` file in the project root.
2. Populate the `.env` file with environment variables. You can find the list of required variables in the `.env.example` file.
3. If you specify a value for `NODE_ENV` other than "dev", create and run migrations:
   1. Run the following command: `npm run typeorm:generate-migration` (or `npm run typeorm:generate-migration:windows` on a Windows machine)
   2. Run the following command: `npm run typeorm:run-migrations`
4. Start the app by running the following command: `npm run start`

## Accessing Swagger Documentation

Once the app is running, you can access the Swagger documentation at `{{host:port}}/swagger`.

## Authorization

To authorize your requests, provide a your user's id as a Bearer token in the header of your API calls.
