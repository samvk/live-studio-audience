module.exports.keyById = (arr, id = 'id') => (
    arr.reduce((acc, item) => ({ ...acc, [item[id]]: item }), {})
);

const randomPop = (arr) => arr[Math.floor(Math.random() * arr.length)];
module.exports.randomPop = randomPop;

module.exports.audioSsml = (...paths) => `<speak><audio src='https://samvk.com/audio/${randomPop(paths)}' /></speak>`;
