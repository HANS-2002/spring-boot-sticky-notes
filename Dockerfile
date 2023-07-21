# Build Jar File
FROM maven:3.9.3-amazoncorretto-20 as stage1
WORKDIR /home/app
COPY . .
RUN mvn -f /home/app/pom.xml clean package

# Create an Image
FROM openjdk:11-jre-slim
EXPOSE 8080
COPY --from=stage1 /home/app/target/stickyNotesAPI-0.0.1-SNAPSHOT.jar myapp.jar
ENTRYPOINT ["java", "-jar", "myapp.jar"]