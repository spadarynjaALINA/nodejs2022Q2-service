-- CreateTable
CREATE TABLE "album" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "track" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "duration" INTEGER,

    CONSTRAINT "track_pkey" PRIMARY KEY ("id")
);
