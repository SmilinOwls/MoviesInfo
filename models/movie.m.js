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
    },
    addF: async(user,movie) =>{
        const rs = await pdb.load('INSERT INTO "FavoriteMovies" VAlUES($1,$2) ON CONFLICT("f_ID", "MovId") DO UPDATE SET "MovId" = excluded."MovId" RETURNING *',[user.f_ID,movie.MovId]);
        return rs;
    },
    allF: async(id) => {
        const rs = await pdb.load('SELECT * FROM "Movies" WHERE "MovId" IN (SELECT "MovId" FROM "FavoriteMovies" WHERE "f_ID" = $1)',[id]);
        return rs;
    }, 
    delF:  async(user_id,movie_id) => {
        const rs = await pdb.load('DELETE FROM "FavoriteMovies" WHERE "f_ID" = $1 AND "MovId" = $2 RETURNING *',[user_id,movie_id]);
        return rs;
    },
    updateF: async(mov) =>{
        const rs = await pdb.load('UPDATE "Movies" SET "MovTitle" = $1, "MovYear" = $2, "MovRating" = $3 WHERE "MovId" = $4 RETURNING *',[mov.MovTitle,parseInt(mov.MovYear),parseFloat(mov.MovRating),mov.MovId]);
        return rs;
    },
    search: async(key) => {
        const sql = `SELECT * FROM "Movies" AS M1 WHERE "MovTitle" LIKE '%${key}%' OR $1 IN (SELECT jsonb_array_elements_text("MovGenres"->'genres') FROM "Movies" AS M2 WHERE M1."MovId" = M2."MovId")`
        const rs = await pdb.load(sql,[key]);
        return rs;
    }
};