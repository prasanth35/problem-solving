const express = require('express');
const app = express();
const port = 3000;

const store = {};

const rateLimitMiddleware = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.ip;
  console.log(ip);
  const currentDate = Date.now();

  if (!store[ip]) {
    store[ip] = {
      count: 1,
      last_accessed: currentDate,
    };
    return next();
  }

  const ipData = store[ip];
  const timeDiff = currentDate - ipData.last_accessed;

  if (timeDiff > 15 * 60 * 1000) {
    ipData.count = 1;
    ipData.last_accessed = currentDate;
    return next();
  }

  if (ipData.count >= 5) {
    return res.status(429).json({ message: 'Request limit exceeded' });
  }

  ipData.count += 1;
  ipData.last_accessed = currentDate;
  next();
};

app.get('/', rateLimitMiddleware, (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Problem Statement

// You are designing an API rate limiter for a Node.js application. Implement a middleware function in Express that limits each user to 100 requests per 15 minutes. The function should:
// 1. Track requests based on a user’s IP address.
// 2. Reject requests with a 429 Too Many Requests response if they exceed the limit.
// 3. Reset the counter every 15 minutes.

// Constraints:
// • Use in-memory storage (like a simple JS object or Map).
// • Optimize for performance and avoid memory leaks.
// • Handle concurrent requests efficiently.
