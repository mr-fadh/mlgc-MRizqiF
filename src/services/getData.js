const { Firestore } = require('@google-cloud/firestore');
const { mod } = require('@tensorflow/tfjs-node');

async function getData() {
    const firestoreDb = new Firestore();

    const collectionPredict = firestoreDb.collection('data');
    const history = await collectionPredict.get();

    if (history.empty) {
        throw new Error('Histori tidak ditemukan');
    }

    const data = [];
    history.forEach(doc => {
        data.push(
            {
                id: doc.id,
                ...doc.data()
            }
        );
    });
    return data;
}

module.exports = getData;