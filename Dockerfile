# ===========================
# 1️⃣ Build stage — with Maven + JDK 21
# ===========================
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set working directory
WORKDIR /app

# Copy the project files
COPY . .

# Build the application without running tests
RUN mvn clean package -DskipTests

# ===========================
# 2️⃣ Runtime stage — with lightweight JRE 21
# ===========================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy only the built jar from previous stage
COPY --from=build /app/target/makemytrip-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
