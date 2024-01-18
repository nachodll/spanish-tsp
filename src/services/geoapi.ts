/**
 * - escrito con sintaxis de js, no domino mucho ts
 * - 
 */

const geoapiKey = import.meta.env.GEOAPI_KEY

/**
 * Returns all Comunidades in Spain with the following format
 */
export const getComunidades = async (): Promise<Array<any>> => {
  const endpoint = 'https://apiv1.geoapi.es/comunidades?'
  const queryParams = new URLSearchParams({
    key: geoapiKey
  })
  const response = await fetch(endpoint + queryParams)

  if (response.status === 200){
    const { data } = await response.json()
    return data
  } else {
    throw new Error('Failed to fetch data')
  }
}


/**
 * Returns all Provincias in a given Comunidad
 * If no Comunidad is provided, all Provincias in Spain are returned
 */
export const getProvincias = async (CCOM?: string): Promise<Array<any>>  => {
  const endpoint = 'http://apiv1.geoapi.es/provincias?'
  const queryParams = new URLSearchParams({
    key: geoapiKey
  })
  if (CCOM) {
    queryParams.append('CCOM', CCOM)
  }
  const response = await fetch(endpoint + queryParams)

  if (response.status === 200){
    const { data } = await response.json()
    return data
  } else {
    throw new Error('Failed to fetch data')
  } 
}

/**
 * Returns all Municipios in a given Provincia
 */
export const getMunicipios = async (CPRO: string): Promise<Array<any>> =>{
  const endpoint = 'http://apiv1.geoapi.es/municipios?'
  const queryParams = new URLSearchParams({
    key: geoapiKey,
    CPRO: CPRO
  })
  const response = await fetch(endpoint + queryParams)

  if (response.status === 200){
    const { data } = await response.json()
    return data
  } else {
    throw new Error('Failed to fetch data')
  }
}