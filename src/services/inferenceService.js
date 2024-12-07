const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function inferenceService(model, image) {
    if (!image) {
        throw new InputError('Image is required');
    }

    try {
        const tensor = tf.node.decodeImage(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat();

        const prediction = await model.predict(tensor).data();
        const confidence = Math.max(...prediction) * 100;

        let recommendations, tag;

        if (confidence > 50) {
            tag = "Cancer";
            recommendations = "Segera periksa ke dokter!";
        }

        if (confidence < 50) {
            tag = "Non-cancer";
            recommendations = "Penyakit kanker tidak terdeteksi.";
        }

        return{ tag, recommendations };
    } catch (error) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
    }
}

module.exports = inferenceService;