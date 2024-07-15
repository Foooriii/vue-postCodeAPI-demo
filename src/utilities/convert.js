import kanaMap from '@/config/kanaMap.js'

/**
 * 半角カタカナを全角カタカナに変換
 * @param str
 * @returns {string}
 */
const kanaRegex = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g')
export const hankakuToZenkaku = str => {
  return str.replace(kanaRegex, match => kanaMap[match])
    .replace(/゛/g, 'ﾞ')
    .replace(/゜/g, 'ﾟ')
}

/**
 * 全角カタカナをひらがなに変換
 * @param str
 * @returns {string}
 */
export const kanaToHiragana = str => {
  return str.replace(/[\u30a1-\u30f6]/g, s => String.fromCharCode(s.charCodeAt(0) - 0x60))
}