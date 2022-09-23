const express = require("express"); //import express
const mongoose = require("mongoose"); //import mongoose
const session = require("express-session"); //import express-session
const redis = require("redis"); //import redis
const cors = require("cors"); //import the cors
let RedisStore = require("connect-redis")(session);//define redis store
 
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
    REDIS_URL,
    SESSION_SECRET,
} = require("./config/config");

//define redis client
let RedisClient = redis.createClient({
    host: REDIS_URL,  //pass host url for redis server to listen on
    port: REDIS_PORT,
 });

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();


const mongoURL = 'mongoose://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin';

const connectWithRetry = () => {
    mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Successfully connected to DB"))
    .catch((e) => {
        console.log(e) //if you successfully log into db print else log error
        setTimeout(connectWithRetry, 5000) //if cant connect wait 5sec
    });
};

connectWithRetry();

app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({client: RedisClient}),
    secret: SESSION_SECRET,
    //properties for cookie
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 60000, //session time to be logged in redis
    },
  })
);

app.use(express.json());

//if a get request is sent to this root path, a response is sent back
app.get("/", (reg, res) => {  
    res.send("<h2>Hello Ed, je t'aime bien</h2>");
    console.log("yeah it rains");
});

//localhost:3000/api/v1/posts
app.use("api/v1/posts", postRouter)

app.use("/api/vi/users", userRouter);

//specify the port express server to live on
const port = process.env.PORT || 3000;   //if the env var (port) has been set, the the var is set to that value if not default it to 3000

app.listen(port, () => console.log('listening on port ${port}'));