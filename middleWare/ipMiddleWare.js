
module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    const ipAddresses = [
        '78.140.172.231',
        '78.140.135.130',
        '167.99.253.235',
        '62.113.223.114',
        '62.113.223.116',
        '212.83.61.161',
        '185.172.90.66',
        '185.172.90.74',
        '185.172.90.75',
        '185.172.90.115',
        '185.172.90.119',
        '109.108.88.242'
    ];


    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (ipAddresses.includes(clientIp)) {
        next();
    } else {
        return res.status(403).json('Access denied');
    }


}