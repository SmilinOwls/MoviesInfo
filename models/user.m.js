const pdb = require('../db/pdb');

module.exports = {
    all: async() => {
        const rs = await pdb.load('SELECT * FROM "Users"',[]);
        return rs;
    },

    add: async (u) => {
        const rs = await pdb.load('INSERT INTO "Users"("f_Username","f_Password","f_Name","f_Email","f_DOB","f_Permission") VALUES($1,$2,$3,$4,$5,$6) RETURNING *',[u.Username,u.Password,u.Name,u.Email,u.Dob,u.Permission]);
        return rs;
    },

    byname: async username => {
        const rs = await pdb.load('SELECT * FROM "Users" WHERE "f_Username" = $1',[username]); 
        return rs;
    },
};