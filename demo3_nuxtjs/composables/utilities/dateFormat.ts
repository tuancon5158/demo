// composables/utilities/dateFromat.ts

export function dateFormat() {
  const toDoubleDigits = function (num) {
    num = String(num)

    if (num.length === 1) num = `0${num}`

    return num
  }

  // YYYY/MM/DD
  const getYmd = (date: Date): string => {
    const newDate: Date = new Date(date)
    const year = newDate.getFullYear()
    const month = toDoubleDigits(newDate.getMonth() + 1)
    const day = toDoubleDigits(newDate.getDate())

    return `${year}/${month}/${day}`
  }

  // YYYY/MM/DD HH:MM
  const getYmdTime = (dateUTC: string): string => {
    const localDate = new Date(dateUTC)

    const date = toDoubleDigits(localDate.getDate())
    const month = toDoubleDigits(localDate.getMonth() + 1)
    const year = localDate.getFullYear()
    const hour = toDoubleDigits(localDate.getHours())
    const minute = toDoubleDigits(localDate.getMinutes())

    return `${year}/${month}/${date} ${hour}:${minute} `
  }

  // YYYY/MM/DD(DAY) HH:MM
  const getYmdwms = (date: Date, lang: string): string => {
    const newDate: Date = new Date(date)
    const year = newDate.getFullYear()
    const month = toDoubleDigits(newDate.getMonth() + 1)
    const day = toDoubleDigits(newDate.getDate())
    const hours = toDoubleDigits(newDate.getHours())
    const minute = toDoubleDigits(newDate.getMinutes())
    const dayOfWeek = newDate.getDay()
    const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][dayOfWeek]
    const dayOfWeekStrEng = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek]

    if (lang === 'ja') return `${year}/${month}/${day}(${dayOfWeekStr}) ${hours}:${minute}`

    return `${day}/${month}/${year}(${dayOfWeekStrEng}) ${hours}:${minute}`
  }

  return {
    getYmd,
    getYmdTime,
    getYmdwms
  }
}
