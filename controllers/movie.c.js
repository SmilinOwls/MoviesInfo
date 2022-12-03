const movieM = require('../models/movie.m');

module.exports = {
    all: async () => {
        try {
            const rs = await movieM.all();
            return rs;
        } catch (error) {
            console.log(error);
        }
    },
    getByRating: async () => {
        try {
            const rs = await movieM.getByRating();
            return rs;
        } catch (error) {
            console.log(error);
        }
    },
    getByCasId: async (id) => {
        try {
            const rs = await movieM.getByCasId(id);
            return rs;
        } catch (error) {
            console.log(error);
        }
    },
    getById: async (id) => {
        try {
            const rs = await movieM.getById(id);
            return rs;
        } catch (error) {
            console.log(error);
        }
    },
    del: async (cast) => {
        try {
            const rs = await movieM.del(cast);
            return rs; 
        } catch (error) {
            console.log(error);
        }
    },
    add: async (cast) => {
        try {
            const rs = await movieM.add(cast);
            return rs; 
        } catch (error) {
            console.log(error);
        }
    },
    update: async (cast) => {
        try {
            const rs = await movieM.update(cast);
            return rs; 
        } catch (error) {
            console.log(error);
        }
    }
};