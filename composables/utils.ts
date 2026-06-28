import assets from './assets.json'

export function getStaticImagePath(path: string): string {
  if (!path) return ''
  // Content stores web paths (e.g. "/foo.svg"); tolerate a legacy "public/" prefix too.
  return path.replace('public/', '')
}

export function getImageAlt(path: string): string {
  if (!path) return ''
  const file = path.replace(/^\//, '').replace(/^public\//, '')
  const asset = assets.find(a => a.path.replace(/^public\//, '') === file)
  return asset?.alt || ''
}

// Resolve a relational entry by id. Server routes expose `ID` as an alias of the
// generated `id`, so client-side grouping (e.g. TabSection) keeps working.
export function getRelationalFields<T extends { ID: string }>(data: T[], id: string): T | undefined {
  return data.find(item => item.ID === id)
}
