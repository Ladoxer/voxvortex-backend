import cron from "node-cron";
import https from "https";

function pingServer() {
  console.log("Pinging server to keep it alive...");

  const options = {
    hostname: "feeton.onrender.com",
    method: "GET",
    timeout: 60000,
  };

  const req = https.request(options, (res) => {
    console.log(`Ping response: ${res.statusCode}`);
  });

  req.on("timeout", () => {
    req.destroy();
    console.error("Request timed out");
  });

  req.on("error", (err) => {
    console.error("Ping error:", err.message);
  });

  req.end();
}

export const job = cron.schedule("*/14 * * * *", pingServer);