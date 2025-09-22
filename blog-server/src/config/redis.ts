import { createClient } from "redis";

const redisClient = createClient({});

redisClient.on("error", (err) => {
  console.error("redis client error : ", err);
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log(`redis connected successfully`);
  } catch (error) {
    console.error(`redis connection failed:`, error);
    process.exit(1);
  }
};

export { redisClient, connectRedis };
