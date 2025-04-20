-- CreateTable
CREATE TABLE "Guild" (
    "guildId" TEXT NOT NULL,
    "modChennel" TEXT,
    "voiceCategory" TEXT,
    "voiceLobby" TEXT,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("guildId")
);
