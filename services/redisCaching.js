const { createClient } = require("redis");
const { promisify } = require("util");


const client = createClient({
  url:'rediss://red-cgmqo9ndvk4i81asf1e0:mXGEeZUyIEW1jpORMVY4S9sw4zWYmNZS@singapore-redis.render.com:6379'
});

client.connect();

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("error", (err) => {
  console.log(`Redis client error: ${err}`);
  process.on("SIGINT", () => {
    client.quit();
    process.exit();
  });
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

async function getFromCache(key) {
  try {
    const data = await client.get(key);
    return JSON.parse(data);
  } catch (err) {
    throw new Error(err);
  }
}

async function setCache(key, data, expireSeconds = 60) {
  try {
    await client.set(key, JSON.stringify(data));
    await client.expire(key, expireSeconds);
  } catch (err) {
    throw new Error(err);
  }
}

async function delCache(key) {
  try {
    await client.del(key);
  } catch (err) {
    throw new Error(err);
  }
}


module.exports = { getFromCache, setCache,delCache };