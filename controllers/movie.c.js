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
    },
    addF: async(user,movie) => {
        try {
            const rs = await movieM.addF(user,movie);
            return rs; 
        } catch (error) {
            console.log(error);
        }
    },
    allF: async(id) => {
        try {
            const rs = await movieM.allF(id);
            return rs; 
        } catch (error) {
            console.log(error);
        }
    },
    delF: async(user_id,movie_id) => {
        try {
            const rs = await movieM.delF(user_id,movie_id);
            return rs; 
        } catch (error) {
            console.log(error);
        }
    },
    updateF: async(mov) => {
        try {
            const rs = await movieM.updateF(mov);
            return rs; 
        } catch (error) {
            console.log(error);
        }
    },
    search: async(key) => {
        try {
            const rs = await movieM.search(key);
            return rs; 
        } catch (error) {
            console.log(error);
        }
    },
};