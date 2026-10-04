// Detail to attach to a 500 response body.
// In production this returns undefined (and JSON.stringify drops the key), so
// driver messages - which carry the database host and tenant - stay in the
// server logs instead of going out to callers.
export function errorDetail(error: unknown): string | undefined {
  if (process.env.NODE_ENV === 'production') return undefined;
  return error instanceof Error ? error.message : String(error);
}
