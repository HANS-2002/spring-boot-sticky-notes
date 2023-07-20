FROM maven:3.5-jdk-8-slim AS build
WORKDIR /home/app
COPY src     /home/app/src
COPY pom.xml /home/app
RUN mvn clean package

FROM eclipse-temurin:17
LABEL maintainer="pattnaikhans@gmail.com"
WORKDIR /app
COPY /target/stickyNotesAPI-0.0.1-SNAPSHOT.jar /app/stickyNotesAPI-0.0.1.jar
ENTRYPOINT ["java", "-jar", "stickyNotesAPI-0.0.1.jar"]