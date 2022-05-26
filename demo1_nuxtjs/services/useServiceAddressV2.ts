const BASE_API_URL = 'https://provinces.open-api.vn/api'

export const useServiceAddressV2 = () => {
  const getAddress = (
    provinceCode: number | null,
    districtCode: number | null,
    depth: number = 2
  ) => {
    let url: string = BASE_API_URL

    if (!provinceCode && !districtCode) {
      url = `${url}/p/`
    }

    if (provinceCode && !districtCode) {
      url = `${url}/p/${provinceCode}?depth=${depth}`
    }

    if (provinceCode && districtCode) {
      url = `${url}/d/${districtCode}?depth=${depth}`
    }

    // api fix interface

    return fetch(`${url}`)
      .then(res => res.json())
      .catch(e => console.log(e))
  }

  return {
    getAddress,
  }
}
