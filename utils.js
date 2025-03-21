const axios = require('axios');

const NREL_API_KEY = '7lN93S5iLnZyNHBsYFGEtvjz2efd2VcRRSj98ETU';

async function getSunHours(address) {
  const url = `https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=${NREL_API_KEY}&address=${encodeURIComponent(address)}`;
  const res = await axios.get(url);
  const annual = res.data.outputs.avg_annual_radiation?.fixed;
  return annual || 5.0; // fallback
}

module.exports = { getSunHours };
