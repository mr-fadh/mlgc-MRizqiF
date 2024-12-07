const classifactionPredict = require('../services/inferenceService');
const crypto = require('crypto');

const getData = require('../services/getData');
const storeData = require('../services/storeData');

async function postClassificationPredict(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;
    const { tag, recommendations } = await classifactionPredict(model, image);

    const id = crypto.randomUUID();
    const createdData = new Date().toISOString();
    
    const newData = {
        id: id,
        result: tag,
        suggestion: recommendations,
        createdAt: createdData,
    };

    await storeData(id, newData);

    return h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data: newData,
    }).code(201);
}


async function getHistory(request, h) {
    const data = await getData();
    return h.response({
        status: 'success',
        data: data,
    }).code(200);
}

module.exports = { postClassificationPredict, getHistory };