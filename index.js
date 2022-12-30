const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT ||5000;
require('dotenv').config();

//middle wares
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://greendays:oKwznZxfspKGlyq9@cluster0.memgfjc.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 
async function run(){
    try{
        const serviceCollection = client.db('greenDays').collection('homeService');
        
        app.get('/services', async(req, res)=>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/service', async(req, res)=>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await (await cursor.toArray()).slice(0,3);
            res.send(services);
        });
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id:ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });
        
        
    }
    finally{

    }

}
run().catch(err=>console.error(err));

app.get('/', (req, res) => {
    res.send('server is running');
});


app.listen(port, () => {
    console.log(`ecohouse server running on ${port}`);
})