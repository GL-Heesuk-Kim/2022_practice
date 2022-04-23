if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}


// process.env.NODE_ENV 로 현재 모드가 production인지 development인지 파악가능