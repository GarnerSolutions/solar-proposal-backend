const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const updateSlides = require('./updateSlides');
const { getSunHours } = require('./utils');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/process', async (req, res) => {
  try {
    const {
      annualConsumption,
      desiredProduction,
      direction,
      shading,
      address,
    } = req.body;

    const sunHours = await getSunHours(address);
    const shadingFactor = {
      Light: 0.95,
      Medium: 0.875,
      Heavy: 0.80,
    }[shading];

    const adjustedSunHours = sunHours * shadingFactor;
    const systemSize = (desiredProduction / 365 / adjustedSunHours).toFixed(2);
    const panelCount = Math.ceil(systemSize * 1000 / 430); // Assume 430W panels
    const energyOffset = `${((desiredProduction / annualConsumption) * 100).toFixed(1)}%`;
    const systemCost = Math.round(systemSize * 4500); // Estimate $4.50/W
    const monthlyWithSolar = Math.round(systemCost * 0.0075); // Financing approx
    const currentMonthlyBill = Math.round(annualConsumption * 0.30 / 12); // Estimate $0.30/kWh

    const params = {
      solarSize: systemSize,
      batterySize: "32 kWh (2x 16 kWh)",
      systemCost,
      panelCount,
      energyOffset,
      monthlyWithSolar,
      currentMonthlyBill
    };

    await updateSlides(params);
    res.json(params);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(3001, () => console.log('API running on http://localhost:3001'));
