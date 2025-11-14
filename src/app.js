import cors from "cors";
import express from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";

import cookieParser from "cookie-parser";
import routes from "./app/routes/index.js";

const app = express();

app.use(cors());
app.use(cookieParser());

// access static file
app.use(express.static("src"));
app.use("uploads/profile", express.static("profile"));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);
app.post("/extract", async (req, res) => {
  const file = req.files.pdf;
  const data = await pdf(file.data);

  res.send({ text: data.text });
});
//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
