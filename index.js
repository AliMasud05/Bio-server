const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


//middle wares
app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://greendays:oKwznZxfspKGlyq9@cluster0.memgfjc.mongodb.net/?retryWrites=true&w=majority";
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const homeServiceCollection = client.db('greendays').collection('homeService');
        app.get('/homeservice', async (req, res) => {
            const query = {};
            const cursor =homeServiceCollection.find(query);
            const services = await cursor.toArray();
            console.log(services);
        });

       





    }
    finally {

    }

}
run().catch(err => console.error(err));



app.get('/', (req, res) => {
    res.send('server ids running');
});


app.listen(port, () => {
    console.log(` server running on ${port}`);
})