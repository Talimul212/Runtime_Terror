import cors from "cors";
import express from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";

import cookieParser from "cookie-parser";
import routes from "./app/routes/index.js";
import { VisitCount } from "./app/modules/properties/VisitCount.js";
import { PromoteCount } from "./app/modules/services/promoteVisit.js";
import { WorkCount } from "./app/modules/work/workCount.js";

const app = express();

app.use(cors());
app.use(cookieParser());

// access static file
app.use(express.static("src"));
app.use("uploads/team-member", express.static("team-member"));
app.use("uploads/property", express.static("property"));
app.use("uploads/agent", express.static("agent"));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);
app.get("/api/v1/visitCount", async (req, res) => {
  try {
    // Fetch all records from VisitCount
    const totalVisits = await VisitCount.find({});
    const promoteTotalVisits = await PromoteCount.find({});
    const workTotalVisits = await WorkCount.find({});

    // Calculate the total visits by summing the 'count' field of each document
    const total = totalVisits.reduce((sum, visit) => sum + visit.count, 0);
    const Promotetotal = promoteTotalVisits.reduce(
      (sum, visit) => sum + visit.count,
      0
    );
    const worktotal = workTotalVisits.reduce(
      (sum, visit) => sum + visit.count,
      0
    );

    res.json({
      success: true,
      message: "Total visit count for all properties",
      totalVisits: total, // Return the summed total of all visits
      promotetotalVisits: Promotetotal, // Return the summed total of all visits
      worktotalVisits: worktotal, // Return the summed total of all visits
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message, // Return the error message for debugging
      totalVisits: 0, // Default to 0 if there’s an error
    });
  }
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
