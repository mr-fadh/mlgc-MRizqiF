const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {    
    const firestoreDb = new Firestore();
    
    const collectionPredict = firestoreDb.collection('data');
    return await collectionPredict.doc(id).set(data);
}

module.exports = storeData;