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
const NotificationsRoutes = require("./modules/notifications/notifications.routes");
const InfluencerDetailsRoutes = require("./modules/influencerDetails/influencerDetails.routes");
const CampaignInfluencerReportRoutes = require("./modules/campaignInfluencersReports/campaignInfluencersReports.routes");
const CampaignInfluencersRoutes = require("./modules/campaignInfluencers/campaignInfluencers.routes");
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
app.use(express.json());
app.use(cors());
app.use(bodyParser.text({ type: "text/plain" }));

// API Routes
app.use("/users", UsersRoutes);
app.use("/notifications", NotificationsRoutes);
app.use("/messages", MessagesRoutes);
app.use("/invoices", InvoicesRoutes);
app.use("/campaigns", CampaignsRoutes);
app.use("/stats", StatsRoutes);
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
    const url = await getUrl(req);
    successResponse(res, url);
  } catch (error) {
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
