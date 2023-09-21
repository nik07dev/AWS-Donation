# Use an official Node.js runtime as the base image
FROM alpine

WORKDIR /app

# Copy package.json only to the container
COPY package.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your NestJS application is listening on
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run" ,"start:dev"]
