import http from "node:http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Allow requests from the React development server
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/api/health" && req.method === "GET") {
    res.writeHead(200);

    res.end(
      JSON.stringify({
        status: "ok",
        message: "TaskFlow Node.js server is running",
        timestamp: new Date().toISOString(),
      })
    );

    return;
  }

  res.writeHead(404);

  res.end(
    JSON.stringify({
      status: "error",
      message: "Route not found",
    })
  );
});

server.listen(PORT, () => {
  console.log(`TaskFlow server running on http://localhost:${PORT}`);
});
