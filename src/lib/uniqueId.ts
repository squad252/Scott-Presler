// utils/uniqueId.ts
export function generateUniqueId(): string {
    return crypto.randomUUID();
}