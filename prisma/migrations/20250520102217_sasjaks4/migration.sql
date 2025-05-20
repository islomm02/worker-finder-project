-- CreateTable
CREATE TABLE "AboutCompany" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AboutCompany_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AboutCompany" ADD CONSTRAINT "AboutCompany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
