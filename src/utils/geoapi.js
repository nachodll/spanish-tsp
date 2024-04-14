
// const geoapiKey = import.meta.env.GEOAPI_KEY
const geoapiKey = '995c199bdd0f89bca989fd729d06a44883b5912a9f4fd316e580a6e01ce331b0'

/**
 * Returns all Comunidades in Spain with the following format
 */
export const getComunidades = () => {
  const endpoint = 'https://apiv1.geoapi.es/comunidades?'
  const queryParams = new URLSearchParams({
    key: geoapiKey
  })

  return fetch(endpoint + queryParams)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Something went wrong fetching')
    })
    .then(json => json.data)
    .catch(error => console.log(error))
}

/**
 * Returns all Provincias in a given Comunidad
 * If no Comunidad is provided, all Provincias in Spain are returned
 */
export const getProvincias = (CCOM) => {
  const endpoint = 'https://apiv1.geoapi.es/provincias?'
  const queryParams = new URLSearchParams({
    key: geoapiKey
  })
  if (CCOM) queryParams.append('CCOM', CCOM)
  
  return fetch(endpoint + queryParams)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Something went wrong fetching')
    })
    .then(json => json.data)
    .catch(error => console.log(error))
}

/**
 * Returns all Municipios in a given Provincia
 */
export const getMunicipios = (CPRO) => {
  const endpoint = 'https://apiv1.geoapi.es/municipios?'
  const queryParams = new URLSearchParams({
    key: geoapiKey,
    CPRO: CPRO
  })
  
  return fetch(endpoint + queryParams)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Something went wrong fetching')
    })
    .then(json => json.data)
    .catch(error => console.log(error))
}