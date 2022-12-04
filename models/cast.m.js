const pdb = require('../db/pdb');

module.exports = {
    all: async() => {
        const rs = await pdb.load('SELECT * FROM "Casts"',[]);
        return rs;
    }, 
    add: async(cast) =>{
        const rs = await pdb.load('INSERT INTO "Casts" VAlUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ' +  
        'ON CONFLICT ("CasId") DO UPDATE SET "CasName" = excluded."CasName" RETURNING *',
        [cast.id,cast.image,cast.legacyNameText,cast.name,cast.birthDate,cast.birthPlace,cast.gender,cast.heightCentimeters,{nicknames: cast.nicknames},cast.realName]);
        return rs;
    },
    allByCastId: async (id) =>{
        const rs = await pdb.load('SELECT * FROM "Casts" WHERE "CasId" = $1',[id]);
        return rs;
    },
    search: async(key) => {
        const sql = `SELECT * FROM "Casts" AS C1 WHERE "CasName" LIKE '%Ang%' 
        OR "CasBirthPlace" LIKE '%${key}%' 
        OR "CasRealName" LIKE '%${key}%' 
        OR $1 IN (SELECT jsonb_array_elements_text("CasNickNames"->'nicknames') FROM "Casts" AS C2 WHERE C1."CasId" = C2."CasId")`
        const rs = await pdb.load(sql,[key]);
        return rs;
    }
};