const express = require('express');
const Joi = require('joi');
const port = 3000;
const app = express();
app.use(express.json());

let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

const planetSchema = Joi.object({
  name: Joi.string().required(),
});

app.get('/api/planets', (req, res) => {
  res.status(200).json(planets);
});

app.get('/api/planets/:id', (req, res) => {
  const planet = planets.find((p) => p.id === req.params.id);
  if (!planet) {
    res.status(404).json({ error: "planet not found!" });
  } else {
    res.status(200).json(planet);
  }
});

app.post('/api/planets', (req, res) => {
  const newPlanet = req.body;
  const { error } = planetSchema.validate(newPlanet);
  if (error) {
    res.status(400).json({ error: "planet not found!" });
  } else {
    planets.push(newPlanet);
    res.status(201).json({ msg: "planet created!" });
  }
});

app.put('/api/planets/:id', (req, res) => {
    const planet = planets.find(p => p.id === parseInt(req.params.id));
    if (!planet) return res.status(404).send("planet not found!");

    const { error } = planetSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    planet.name = req.body.name;
    res.json({ msg: "pianeta aggiornato!" });
});


app.delete('/api/planets/:id', (req, res) => {
    const planetIndex = planets.findIndex(p => p.id === parseInt(req.params.id));
    if (planetIndex === -1) return res.status(404).send("planet not found!");

    planets.splice(planetIndex, 1);
    res.json({ msg: "planet delete!" });
});

app.listen(port, () => console.log(`Server online on port ${port}`));
