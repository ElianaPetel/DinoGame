const { MongoClient, ServerApiVersion } = require('mongodb');
const UsersDAO = require("./dao/usersDAO");
const app = require("./app");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Inject the database client into your Users Data Access Object (DAO)
    await UsersDAO.injectDB(client);
    
    return app;

  } catch (err) {
    console.error("Failed to connect to database", err.stack)
    process.exit(1)
  } 
}

if (require.main === module) {
  run().then(app => {
    // Define the port the app will listen on, falling back to 5000 if not provided
    const PORT = process.env.PORT || 4000;

    // Start the Express app
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  });
}

module.exports = run;






  