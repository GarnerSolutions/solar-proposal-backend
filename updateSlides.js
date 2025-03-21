const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const credentials = require('./credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/presentations', 'https://www.googleapis.com/auth/drive'];
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES
});
const slides = google.slides({ version: 'v1', auth });
const presentationId = '1tZF_Ax-e2BBeL3H7ZELy_rtzOUDwBjxFSoqQl13ygQc'; // Your presentation

async function updateSlides(params) {
  await slides.presentations.batchUpdate({
    presentationId,
    requestBody: {
      requests: [
        { deleteText: { objectId: "p4_i4", textRange: { type: "ALL" } } },
        { insertText: { objectId: "p4_i4", text: `${params.solarSize} kW` } },
        { deleteText: { objectId: "p4_i7", textRange: { type: "ALL" } } },
        { insertText: { objectId: "p4_i7", text: `${params.batterySize}` } },
        { deleteText: { objectId: "p4_i10", textRange: { type: "ALL" } } },
        { insertText: { objectId: "p4_i10", text: `$${params.systemCost}` } },

        { deleteText: { objectId: "p5_i6", textRange: { type: "ALL" } } },
        { insertText: { objectId: "p5_i6", text: `${params.solarSize} kW system size` } },
        { deleteText: { objectId: "p5_i7", textRange: { type: "ALL" } } },
        { insertText: { objectId: "p5_i7", text: `${params.energyOffset} Energy Offset` } },
        { deleteText: { objectId: "p5_i8", textRange: { type: "ALL" } } },
        { insertText: { objectId: "p5_i8", text: `${params.panelCount} Jinko Solar panels` } },
        { deleteText: { objectId: "p5_i19", textRange: { type: "ALL" } } },
        { insertText: { objectId: "p5_i19", text: `$${params.systemCost} financed` } },
        { deleteText: { objectId: "p5_i20", textRange: { type: "ALL" } } },
        { insertText: { objectId: "p5_i20", text: `$${params.monthlyWithSolar} monthly payments` } },

        { deleteText: { objectId: "p6_i5", textRange: { type: "ALL" } } },
        { insertText: { objectId: "p6_i5", text: `$${params.monthlyWithSolar}` } },
        { deleteText: { objectId: "p6_i10", textRange: { type: "ALL" } } },
        { insertText: { objectId: "p6_i10", text: `$${params.currentMonthlyBill}` } }
      ]
    }
  });
}

module.exports = updateSlides;
