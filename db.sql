/*
 Target Server Type    : PostgreSQL
*/

-- ----------------------------
-- Table structure for FavoriteMovies
-- ----------------------------

DROP TABLE IF EXISTS "FavoriteMovies";
CREATE TABLE "FavoriteMovies" (
  "f_ID" int4 DEFAULT NULL,
  "MovId" varchar(50) NOT NULL
)
;

-- ----------------------------
-- Table structure for Movies
-- ----------------------------
DROP TABLE IF EXISTS "Movies";
CREATE TABLE "Movies" (
  "MovId" varchar(50) NOT NULL,
  "MovImg" text,
  "MovTitle" varchar(255) NOT NULL,
  "MovYear" numeric(4,0),
  "MovTopRank" numeric,
  "MovRating" numeric(2,1),
  "MovRatingCount" integer,
  "MovGenres" jsonb,
  "MovReviews" jsonb,
  "MovSynopses" jsonb,
  "MovCasts" jsonb
)
;

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS "Users";
CREATE TABLE "Users" (
  "f_ID" serial,
  "f_Username" varchar(50) NOT NULL,
  "f_Password" varchar(255) NOT NULL,
  "f_Name" varchar(50) NOT NULL,
  "f_Email" varchar(50) NOT NULL,
  "f_DOB" timestamp NOT NULL,
  "f_Permission" int4 NOT NULL
)
;

-- ----------------------------
-- Table structure for Casts
-- ----------------------------
DROP TABLE IF EXISTS "Casts";
CREATE TABLE "Casts" (
  "CasId" varchar(50) NOT NULL,
  "CasImg" text,
  "CasLegacyNameText" varchar(255) NOT NULL,
  "CasName" varchar(255) NOT NULL,
  "CasBirthDate" text,
  "CasBirthPlace" text,
  "CasGender" varchar(10),
  "CasHeightCentimeters" numeric(5,2),
  "CasNickNames" jsonb,
  "CasRealName" varchar(255)
)
;

-- ----------------------------
-- Primary Key structure for table Movies
-- ----------------------------
ALTER TABLE "Movies" ADD CONSTRAINT "PK__Movies" PRIMARY KEY ("MovId");

-- ----------------------------
-- Primary Key structure for table Users
-- ----------------------------
ALTER TABLE "Users" ADD CONSTRAINT "PK__Users" PRIMARY KEY ("f_ID");

-- ----------------------------
-- Primary Key structure for table Cast
-- ----------------------------
ALTER TABLE "Casts" ADD CONSTRAINT "PK__Casts" PRIMARY KEY ("CasId");

-- ----------------------------
-- Primary Key structure for table FavoriteMovies
-- ----------------------------
ALTER TABLE "FavoriteMovies" ADD CONSTRAINT "PK__FavoriteMovies" PRIMARY KEY ("f_ID","MovId");

-- ----------------------------
-- Foreign Keys structure for table FavoriteMovies
-- ----------------------------
ALTER TABLE "FavoriteMovies" ADD CONSTRAINT "FK_FavoriteMovies_Users" FOREIGN KEY ("f_ID") REFERENCES "Users" ("f_ID") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FavoriteMovies" ADD CONSTRAINT "FK_FavoriteMovies_Movies" FOREIGN KEY ("MovId") REFERENCES "Movies" ("MovId") ON DELETE CASCADE ON UPDATE CASCADE;