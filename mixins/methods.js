export function generateClasses(params) {
  const acc = []
  // eslint-disable-next-line array-callback-return
  params.map((param) => {
    acc.push(...Object.values(param))
  })
  return acc.join(' ').toString().replace(/\s+/g, ' ')
}
export function generateVariant(variant, filter) {
  const backgroundColor =
    filter === 'none'
      ? `bg-${variant}`
      : filter === 'darker'
      ? `bg-${variant}-800`
      : `bg-${variant}-50`
  const fontColor =
    filter === 'none'
      ? `text-white`
      : filter === 'darker'
      ? `text-${variant}-100`
      : `text-${variant}-500`
  return { backgroundColor, fontColor }
}
export function generateColorVariant(variant, filter, property) {
  const baseList = ['white', 'black', 'light', 'dark']
  const colorClasses =
    filter === 'none' || baseList.includes(variant)
      ? `${property}-${variant}`
      : filter === 'darker'
      ? `${property}-${variant}-800`
      : `${property}-${variant}-50`
  return { colorClasses }
}
export function findData(sectionName) {
  const filteredData = this.sections.filter(
    (d) => d.section.toLowerCase() === sectionName.toLowerCase()
  )
  return filteredData[0]
}
