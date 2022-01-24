const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.svo64.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect()
        const database = client.db("Foodbee");
        const foodsCollection = database.collection("foods");

        app.get('/menuitems', async (req, res) => {
            const cursor = foodsCollection.find({});
            const foods = await cursor.toArray();
            res.send(foods)
        })

        app.get('/', async (req, res) => {
            res.send('this is server')
        })



    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir);
