const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const UsersRoutes = require("./modules/users/users.routes");
const CampaignsRoutes = require("./modules/campaigns/campaigns.routes");
const MessagesRoutes = require("./modules/messages/messages.routes");
const InvoicesRoutes = require("./modules/invoices/invoices.routes");
const StatsRoutes = require("./modules/stats/stats.routes");
const BannerRoutes = require("./modules/banners/banners.routes");
const InfluencerBrandMentionsRoutes = require("./modules/influencerBrandMentions/influencerBrandMentions.routes");
const NotificationsRoutes = require("./modules/notifications/notifications.routes");
const InfluencerDetailsRoutes = require("./modules/influencerDetails/influencerDetails.routes");
const CampaignInfluencerReportRoutes = require("./modules/campaignInfluencersReports/campaignInfluencersReports.routes");
const CampaignInfluencersRoutes = require("./modules/campaignInfluencers/campaignInfluencers.routes");
const PaymentsRoutes = require("./modules/payments/payments.routes");
const InfluencerGroupMembersRoutes = require("./modules/influencerGroupMembers/influencerGroupMembers.routes");
const InfluencerGroupRoutes = require("./modules/influencerGroup/influencerGroup.routes");
const { successResponse, errorResponse } = require("./utils/responses");
const { upload } = require("./utils/upload");
const { getUrl } = require("./utils/get_url");
const campaigninfluencerreport = require("./models/campaigninfluencerreport");
const userSockets = {};
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const swaggerDocument = require("./swagger-output.json");

// Serve static files
app.use("/files", express.static("files"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use((req, res, next) => {
  req.userSockets = userSockets;
  next();
});

// John
app.use(express.json({ limit: "100mb" })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: "100mb", extended: true })); // Add URL encoded support
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Content-Length",
      "X-Requested-With",
    ],
    exposedHeaders: ["Content-Length", "Content-Type"],
    credentials: false,
    maxAge: 86400, // Cache preflight response for 24 hours
  })
);
app.use(bodyParser.text({ type: "text/plain", limit: "100mb" }));

// API Routes
app.use("/users", UsersRoutes);
app.use("/notifications", NotificationsRoutes);
app.use("/messages", MessagesRoutes);
app.use("/influencer-groups", InfluencerGroupRoutes);
app.use("/influencer-group-members", InfluencerGroupMembersRoutes);
app.use("/invoices", InvoicesRoutes);
app.use("/campaigns", CampaignsRoutes);
app.use("/stats", StatsRoutes);
app.use("/payments", PaymentsRoutes);
app.use("/influencer-brand-mentions", InfluencerBrandMentionsRoutes);
app.use("/banners", BannerRoutes);
app.use("/influencer-details", InfluencerDetailsRoutes);
app.use("/campaign-influencer-reports", CampaignInfluencerReportRoutes);
app.use("/campaign-influencers", CampaignInfluencersRoutes);

// Test route
app.get("/", (req, res) => {
  try {
    successResponse(res, "Server is running fine");
  } catch (error) {
    errorResponse(res, error);
  }
});

app.post("/upload-file", upload.single("file"), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("File uploaded:", {
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    const url = await getUrl(req);
    successResponse(res, url);
  } catch (error) {
    console.error("Upload error:", error);

    // Handle multer-specific errors
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        message: "File too large. Maximum size is 100MB.",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: "Unexpected file field. Use 'file' as the field name.",
      });
    }

    if (error.message && error.message.includes("File type")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    errorResponse(res, error);
  }
});

// WebSocket logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("register", (uuid) => {
    userSockets[uuid] = socket;
    console.log(`User ${uuid} registered socket: ${socket.id}`);
  });

  socket.on("disconnect", () => {
    // Clean up disconnected socket
    for (const [userId, sock] of Object.entries(userSockets)) {
      if (sock.id === socket.id) {
        delete userSockets[userId];
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

// Start server
server.listen(4002, () => {
  console.log("Server started at port 4002");
});

module.exports = { userSockets };
