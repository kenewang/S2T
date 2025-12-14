FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY ./target/share2teach-0.0.1-SNAPSHOT.jar app.jar
COPY src/main/resources/application-docker.properties /app/application-docker.properties

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar", "--spring.config.additional-location=file:/app/application-docker.properties"]
