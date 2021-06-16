const merge = require('deepmerge');
const wdio = require('.wdio.conf.js');

exports.config = merge(wdio.config,{
    baseUrl: process.env.baseUrl
})