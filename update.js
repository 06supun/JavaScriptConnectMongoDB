const { MongoClient } = require("mongodb")
const { ObjectId } = require("mongodb")

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
        console.log(`Connected to the ${dbname} database`)
    }   catch (err) {
        console.error(`Error connecting to the database: ${err}`)
    }
}
// Filter used to find the document to update
const documentToUpdate = { _id: new ObjectId("63f0b8fd93750aa3f3ec1f74") }

// Operation(s) to perform on the document
const update = { $inc: {year: 5} }

const main = async () => {
    try  {
        await connectToDatabase()
        let result = await dataCollection.updateOne(documentToUpdate, update)
        result.modifiedCount === 1
        ? console.log("Updated one Document")
        : console.log("No document updated")
    }   catch (err) {
        console.error(`Error updating documents: ${err}`)
    }   finally {
        await client.close()
    }
};

// Run the main function
main();