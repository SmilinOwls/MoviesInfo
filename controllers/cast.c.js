const castM = require('../models/cast.m');

module.exports = {
    all: async () => {
        try {
            const rs = await castM.all();
            return rs;
        } catch (error) {
            console.log(error);
        }
    },
    allByCastId: async (id) => {
        try {
            const rs = await castM.allByCastId(id);
            return rs;
        } catch (error) {
            console.log(error);
        }
    },
    add: async (cast) => {
        try {
            const rs = await castM.add(cast);
            return rs; 
        } catch (error) {
            console.log(error);
        }
    },
    search: async(key) => {
        try {
            const rs = await castM.search(key);
            return rs; 
        } catch (error) {
            console.log(error);
        }
    },
};