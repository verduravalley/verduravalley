export function localizedField(item: any, field: string, locale: string): string {
  if (locale === 'ar') {
    return item[`${field}_ar`] || item[field] || '';
  }
  return item[field] || '';
}
