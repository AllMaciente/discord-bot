-- AddForeignKey
ALTER TABLE "Guild" ADD CONSTRAINT "Guild_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Member"("memberId") ON DELETE SET NULL ON UPDATE CASCADE;
