import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"; 

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Personal Finance Tracker",
        version: "0.1.0",
        description: "API documentation for the personal finance tracker",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:4000",
          description: "Local server",
        },
      ],
    },
    apis: ["./routes/*.js"], // Make sure this path is correct
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 
    console.log("Swagger docs available at http://localhost:4000/api-docs");
};

export default swaggerDocs;
