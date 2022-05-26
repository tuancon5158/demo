/**
 * @param fileName: string
 * @return string
 * getExtensionFile('1.txt') // 'txt'
 */
export const getExtensionFile = (fileName: string) => {
  return fileName.substr(fileName.lastIndexOf('.') + 1)
}

/**
 * @param fileName: string
 * @return string
 * getExtensionFile('abcdef.txt') // 'abcdef'
 */
export const getFileName = (fileName: string) => {
  return fileName.substr(0, fileName.lastIndexOf('.'))
}

/**
 * @param fileName: string
 * @param length: number
 * @return string
 * getExtensionFile('abcdefgh123456789.txt') // 'abcdef...6789.text'
 */
export const getTruncateFileName = (fileName: string, length = 10) => {
  const extension = getExtensionFile(fileName)
  const name = getFileName(fileName)

  if (name.length <= length) return fileName

  const before = name.substr(0, 6)
  const after = name.substr(-4)

  return `${before}...${after}.${extension}`
}

export const openFileNewTab = (file: string) => {
  if (file) {
    const url = file.startsWith(`http`) ? file : `http://${file}`

    window.open(url)
  }
}
