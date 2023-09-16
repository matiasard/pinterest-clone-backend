-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "liked_by_user" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "alt_description" TEXT NOT NULL,
    "donwload" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "user_profile_image" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);
