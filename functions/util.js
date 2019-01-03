module.exports.keyById = (arr, id = 'id') => (
    arr.reduce((acc, item) => ({ ...acc, [item[id]]: item }), {})
);

// module.exports.randomPop = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports.audioSsml = (path) => `<speak><audio src='https://samvk.com/audio/${path}' /></speak>`;
