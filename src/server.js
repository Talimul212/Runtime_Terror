import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

let server;
let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  try {
    await mongoose.connect(config.database_url);
    console.log("🛢 Database is connected successfully");
    isConnected = true;
  } catch (err) {
    console.error("Failed to connect database", err);
  }
}

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception:", error);
  process.exit(1);
});

// Bootstrap only when running locally (not in Vercel)
if (process.env.NODE_ENV !== "production") {
  (async () => {
    await connectToDatabase();
    server = app.listen(config.port, () => {
      console.log(`🚀 Application listening on port ${config.port}`);
    });
  })();
}

// Graceful shutdown
process.on("SIGTERM", (error) => {
  console.log("SIGTERM received:", error);
  if (server) {
    server.close();
  }
});

// ✅ Vercel-specific export
export default async function handler(req, res) {
  await connectToDatabase();
  return app(req, res);
}
