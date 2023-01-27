const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const colors = require("colors");
require("dotenv").config();
const cors = require("cors");
const schema = require("./schema/schema");
const { graphqlHTTP } = require("express-graphql");
const port = process.env.PORT || 5000;

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

// Server frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(port, () => console.log(`Listening on port ${port}`));
