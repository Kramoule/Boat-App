FROM openjdk:11-slim AS builder
ADD . /code/
WORKDIR "/code"
RUN ["sed", "-i", "s/\r$//", "mvnw"]
RUN ["./mvnw", "package"]

FROM openjdk:11-slim
COPY --from=builder /code/target/boat-app-0.0.1-SNAPSHOT.jar boat-app.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "boat-app.jar" ]