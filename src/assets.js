const imageAssets = import.meta.glob('../images/*', {
  eager: true,
  import: 'default',
  query: '?url',
});

export function assetUrl(path) {
  if (!path || /^(https?:|data:)/.test(path)) return path;
  const normalized = path.replace(/^\//, '');
  return imageAssets[`../${normalized}`] || `/${normalized}`;
}
