const pdb = require('../db/pdb');

module.exports = {
    all: async() => {
        const rs = await pdb.load('SELECT * FROM "Movies"',[]);
        return rs;
    }, 
    getByRating: async() => {
        const rs = await pdb.load('SELECT * FROM "Movies" WHERE "MovRating" IS NOT NULL ORDER BY "MovRating" DESC',[]);
        return rs;
    },
    getById: async(id) => {
        const rs = await pdb.load('SELECT * FROM "Movies" WHERE "MovId" = $1',[id]);
        return rs;
    },
    getByCasId: async(id) => {
        const sql = `SELECT * FROM (SELECT *,jsonb_array_elements_text("MovCasts"->'casts')::jsonb->>'id' AS "Info" FROM "Movies") as S
        WHERE "Info" = $1`
        const rs = await pdb.load(sql,[id]);
        return rs;
    },
    del: async(movie) => {
        const rs = await pdb.load('DELETE FROM "Movies" WHERE "MovId" = $1 RETURNING *',[movie.id]);
        return rs;
    },
    add: async(movie) =>{
        const rs = await pdb.load('INSERT INTO "Movies" VAlUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ' +  
        'ON CONFLICT ("MovId") DO UPDATE SET "MovTitle" = excluded."MovTitle" RETURNING *',
        [movie.id,movie.img,movie.title,movie.year,movie.topRank,movie.rating,movie.ratingCount,{genres: movie.genres},{reviews: movie.reviews},{synopses: movie.synopses},{casts: movie.casts}]);
        return rs;
    },
    update: async(movie) => {
        const rs = await pdb.load('UPDATE "Movies" SET "MovTitle" = $1 WHERE "MovId" = $2 RETURNING *',[movie.title,movie.id]);
        return rs;
    }
};