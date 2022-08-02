-- CreateTable
CREATE TABLE "artist" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);
