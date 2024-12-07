const handler = require('../server/handler');

const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: handler.postClassificationPredict,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1000000,
            },
        },
    },
    {
        path: '/predict/history',
        method: 'GET',
        handler: handler.getHistory,
    }
];

module.exports = routes;
