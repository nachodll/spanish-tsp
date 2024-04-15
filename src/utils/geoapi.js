const geoapiKey = '995c199bdd0f89bca989fd729d06a44883b5912a9f4fd316e580a6e01ce331b0'

/**
 * Returns all Comunidades in Spain with the following format
 */
export const getComunidades = async () => {
  try {
    const endpoint = `https://apiv1.geoapi.es/comunidades?key=${geoapiKey}`
    const response = await fetch(endpoint)
    const json = await response.json()

    return json.data.map(comunidad => ({
      id: comunidad.CCOM,
      name: comunidad.COM
    }))
  } catch (e){
    throw new Error('Error getting comunidades')
  }
}

/**
 * Returns all Provincias in a given Comunidad
 * If no Comunidad is provided, all Provincias in Spain are returned
 */
export const getProvincias = async (CCOM) => {
  try {
    const endpoint = `https://apiv1.geoapi.es/provincias?key=${geoapiKey}${CCOM ? '&CCOM='+CCOM : ''}`
    const response = await fetch(endpoint)
    const json = await response.json()

    return json.data.map(provincia => ({
      id: provincia.CPRO,
      name: provincia.PRO
    }))
  } catch (e){
    throw new Error('Error getting provincias')
  }
}

/**
 * Returns all Municipios in a given Provincia
 */
export const getMunicipios = async (CPRO) => {
  try {
    const endpoint = `https://apiv1.geoapi.es/municipios?key=${geoapiKey}&CPRO=${CPRO}`
    const response = await fetch(endpoint)
    const json = await response.json()

    return json.data.map(municipio => ({
      id: municipio.CMUM,
      name: municipio.DMUN50
    }))
  } catch (e){
    throw new Error('Error getting municipios')
  }
  
}