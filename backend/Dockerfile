FROM maven:3.9.11-sapmachine-21 as build

WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests

FROM openjdk:21
WORKDIR /app
COPY --from=build /build/target/*.jar /app/pet.jar
EXPOSE 8080
CMD ["java", "-XX:+UseG1GC", "-Xms512m", "-Xmx2048m", "-jar", "pet.jar"]
