import type { Prisma } from "@prisma/client";
import { getNextDocumentNumber } from "./documentNumber";

/**
 * Generates the next sequential "our own" barcode number, e.g.
 * EZE-2026-00001. Same race-safe counter as invoice/purchase numbers, just
 * a distinct document type — so this never collides with those sequences,
 * and its own prefix ("EZE-") makes a self-minted code instantly
 * distinguishable from a scanned-in manufacturer barcode (which never looks
 * like this). Must be called inside the same transaction that inserts the
 * GeneratedBarcode row.
 */
export async function generateBarcodeNumber(tx: Prisma.TransactionClient): Promise<string> {
  return getNextDocumentNumber(tx, "BARCODE", "EZE-");
}
