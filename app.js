const { MongoClient } = require("mongodb")
const uri = require("./atlas_uri")

console.log(uri)

const client = new MongoClient(uri)
const dbname = "Anual_change_forest_area"
const collection_name = "newdata"

const dataCollection = client.db(dbname).collection(collection_name)

// Connect to the Database
const connectToDatabase = async () => {
    try  {
        await client.connect()
        console.log(`Connected to the ${dbname} database \nFull connection string: ${uri}`)
    }   catch (err) {
        console.error(`Error connecting to the database: ${err}`)
    }
}

const sampleData = [
{

    entity: "Australia",
    ccode: "AUS",
    year: 2010,
    netForestConversion: 709680,
},
{
    entity: "Belarus",
    ccode: "BLR",
    year: 2010,
    netForestConversion: 26820,
},
]

const main = async () => {
    try  {
        await connectToDatabase()
        let result = await dataCollection.insertMany(sampleData)
        console.log(`Inserted ${result.insertedCount} documents`)
        console.log(result)
    }   catch (err) {
        console.error(`Error connecting to the database: ${err}`)
    }   finally {
        await client.close()
    }
};

// Run the main function
main();