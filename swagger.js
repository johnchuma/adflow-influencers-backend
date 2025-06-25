const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Adflow influencer API Documentation",
    description: "Comprehensive API documentation for the Adflow influencer project, providing endpoints to facilitate business operations and data management.",
  },
  host: "influencerapi.adflow.africa",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const routes = ["./index.js"]; // Entry point for all routes

// Generate the Swagger docs
swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log("Swagger docs generated!");
});
