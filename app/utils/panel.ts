/**
 * Background for anything that frames a screenshot: soft blooms of a brand
 * colour (6-digit hex) on a warm off-white, so each company gets its own light
 * without needing a photograph.
 */
export function panelBackground(brand: string) {
  return [
    `radial-gradient(90% 80% at 12% 0%, ${brand}30 0%, transparent 62%)`,
    `radial-gradient(80% 90% at 100% 100%, ${brand}55 0%, transparent 65%)`,
    'radial-gradient(60% 60% at 70% 30%, #ffffff 0%, transparent 70%)',
    '#f3f2f0',
  ].join(', ')
}
