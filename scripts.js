#!/usr/bin/env node

const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const env = process.env.NODE_ENV || process.env.NODE || "development";
const appName = process.env.PM2_APP_NAME || path.basename(process.cwd());
const root = __dirname;

function run(command, args = []) {
  console.log(`\n$ ${[command].concat(args).join(" ")}\n`);
  const res = spawnSync(command, args, { stdio: "inherit" });
  return res.status === 0;
}

function runNodeScript(filePath) {
  const node = process.execPath; // absolute path to node
  return run(node, [filePath]);
}

function checkoutBranch(branchName) {
  console.log(`Checking out ${branchName} branch...`);
  const success = run("git", ["checkout", branchName]);
  if (!success) {
    console.error(`Failed to checkout ${branchName} branch. Aborting.`);
    process.exit(1);
  }
  console.log(`Successfully checked out ${branchName} branch.`);
}

(async function main() {
  try {
    // Set PORT environment variable based on environment
    if (env === "production") {
      process.env.PORT = "4002";
      console.log("Set PORT=4002 for production");
    } else if (env === "test" || env === "development" || env === "local") {
      process.env.PORT = "5002";
      console.log("Set PORT=5002 for test/local/development");
    }

    // Handle branch checkout based on environment (except for local)
    if (env === "test") {
      checkoutBranch("testing");
    } else if (env === "production") {
      checkoutBranch("main");
    }
    // For development/local, stay on current branch
    // 1) Run swagger.js if it exists (non-fatal)
    const swaggerFile = path.join(root, "swagger.js");
    if (fs.existsSync(swaggerFile)) {
      console.log("Found swagger.js — running it to (re)generate docs...");
      const ok = runNodeScript(swaggerFile);
      if (!ok)
        console.warn(
          "swagger.js exited with a non-zero status (continuing)..."
        );
    } else {
      console.log("No swagger.js found — skipping swagger generation.");
    }

    // 2) Start app depending on environment
    if (env === "development" || env === "local") {
      console.log(
        `Environment is '${env}' — starting server with nodemon index.js`
      );
      const indexFile = path.join(root, "index.js");
      if (!fs.existsSync(indexFile)) {
        console.error("index.js not found in project root. Aborting.");
        process.exit(1);
      }
      const ok = run("nodemon", [indexFile]);
      process.exit(ok ? 0 : 1);
    }

    // For test/production (and any other non-development env) use pm2
    const pm2AppName =
      env === "production"
        ? "adflow-influencers-backend"
        : env === "test"
        ? "adflow-influencers-backend-test"
        : appName;

    console.log(
      `Environment is '${env}' — using pm2 to start or restart the app named '${pm2AppName}'`
    );

    // Check pm2 is available
    const pm2Available = run("pm2", ["--version"]);
    if (!pm2Available) {
      console.error(
        "pm2 is not available in PATH. Install pm2 globally (npm i -g pm2) or run the server in development mode."
      );
      process.exit(1);
    }

    // Try to restart first; if that fails, start a new process
    const restarted = run("pm2", ["restart", pm2AppName]);
    if (!restarted) {
      console.log(`pm2 restart failed — attempting to start the app with pm2`);
      const indexFile = path.join(root, "index.js");
      if (!fs.existsSync(indexFile)) {
        console.error("index.js not found in project root. Aborting.");
        process.exit(1);
      }
      const started = run("pm2", [
        "start",
        indexFile,
        "--name",
        pm2AppName,
        "--env",
        env,
      ]);
      if (!started) {
        console.error("pm2 start failed. Check pm2 logs for details.");
        process.exit(1);
      }
    }

    // Save the current pm2 process list so it persists across reboots
    run("pm2", ["save"]);

    console.log("Application started via pm2 successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error running scripts.js:", err);
    process.exit(1);
  }
})();
