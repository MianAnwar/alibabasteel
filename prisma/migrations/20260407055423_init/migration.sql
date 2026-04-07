-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "referenceNumber" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'standard',
    "category" TEXT NOT NULL,
    "referenceProductSlug" TEXT,
    "requirements" TEXT NOT NULL,
    "dimensions" TEXT,
    "standingRequired" BOOLEAN NOT NULL DEFAULT false,
    "materialPreference" TEXT,
    "finish" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "uploadedImages" TEXT NOT NULL DEFAULT '[]',
    "contactName" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "contactEmail" TEXT,
    "contactCity" TEXT,
    "companyName" TEXT,
    "industry" TEXT,
    "budgetRange" TEXT,
    "timeline" TEXT,
    "preferredContactMethod" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "internalNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "QAEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productSlug" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "askedBy" TEXT NOT NULL,
    "answer" TEXT,
    "answeredBy" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answeredAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "Inquiry_referenceNumber_key" ON "Inquiry"("referenceNumber");
