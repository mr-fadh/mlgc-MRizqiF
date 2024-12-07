const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, newData) {    
    const firestoreDb = new Firestore();
    
    const collectionPredict = firestoreDb.collection('predictions');
    return await collectionPredict.doc(id).set(newData);
}

module.exports = storeData;