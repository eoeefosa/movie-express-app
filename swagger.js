import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "Movie Streaming API",
    description: "API for movie streaming and downloading",
  },
  host: "https://movie-express-app.vercel.app/",
  schemes: ["http"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/*.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
