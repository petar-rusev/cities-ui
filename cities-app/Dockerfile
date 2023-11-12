# --- Build Stage ---
# Use a Node image to build the SAP UI5 application
FROM node:18.14.2-bullseye as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# --- Production Stage ---
# Use an NGINX image to serve the built application
FROM nginx:alpine as production-stage

# Copy the built application from the build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
