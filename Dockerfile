# Use an official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock /app/

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . /app

# Expose ports
EXPOSE 5173 3001

# Start the client and server
CMD yarn start