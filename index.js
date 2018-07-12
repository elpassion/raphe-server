#!/usr/bin/env node

const argv = require('yargs').argv;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const { RecordingRepository } = require("raphe");
const recordingRepository = new RecordingRepository(argv._[0]);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/recordings/:name", async (req, res) => {
  const { name } = req.params;
  const recordings = await recordingRepository.getAll(name);
  res.send(JSON.stringify(recordings));
})

app.delete("/recordings/:name", () => {
  const { name } = req.params;
  recordingRepository.deleteAll(name);
  res.status(204).send();
})

app.post("/recordings", (req, res) => {
  const { name, args, result } = req.body;
  recordingRepository.create({ name, args, result });
  res.status(201).send();
});

const port = argv.port || 3000;

app.listen(port, () => console.log(`Raphe is running on port ${port}!`));
