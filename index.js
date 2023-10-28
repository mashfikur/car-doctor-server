const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to car doctor server");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rnoho8k.mongodb.net/?retryWrites=true&w=majority`;


// const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-okdsnkc-shard-00-00.rnoho8k.mongodb.net:27017,ac-okdsnkc-shard-00-01.rnoho8k.mongodb.net:27017,ac-okdsnkc-shard-00-02.rnoho8k.mongodb.net:27017/?ssl=true&replicaSet=atlas-400qx6-shard-0&authSource=admin&retryWrites=true&w=majority`;

// const uri = "mongodb://localhost:27017"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const servicesCollection = client
      .db("carDoctorDB")
      .collection("servicesCollection");

    app.get("/services", async (req, res) => {
      const cursor = servicesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is runnnig on port ${port}`);
});
