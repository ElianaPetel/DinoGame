const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const { GridFSBucket } = require('mongodb');
require('dotenv').config();

router.get('/:filename', async (req, res) => {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    const bucket = new GridFSBucket(client.db());
    const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

    downloadStream.on('data', (chunk) => {
        res.write(chunk);
    });

    downloadStream.on('error', () => {
        res.sendStatus(404);
    });

    downloadStream.on('end', () => {
        res.end();
        client.close();
    });
});

module.exports = router;
