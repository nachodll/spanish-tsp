import { useEffect, useState } from "react"
import { getProvincias, getComunidades, getMunicipios } from "../utils/geoapi.js"
import './ComProvMunDropdowns.css'


export function ComProvMunDropdowns() {
  let [comunidades, setComunidades] = useState(null)
  let [provincias, setProvincias] = useState(null)
  let [municipios, setMunicipios] = useState(null)
  let [selectedComunidad, setSelectedComunidad] = useState(null)
  let [selectedProvincia, setSelectedProvincia] = useState(null)
  let [selectedMunicipio, setSelectedMunicipio] = useState(null)

  useEffect(()=>{
    getComunidades()
      .then(data => setComunidades(data))

    return () => {setComunidades(null)}
  }, [])

  useEffect(()=>{
    if (selectedComunidad !== null){
      getProvincias(selectedComunidad.CCOM)
        .then(data => setProvincias(data))
    }
    setSelectedProvincia(null)

    return () => setProvincias(null)
  }, [selectedComunidad])

  useEffect(()=>{
    if (selectedProvincia !== null){
      getMunicipios(selectedProvincia.CPRO)
        .then(data => setMunicipios(data))
    }
    setSelectedMunicipio(null)

    return () => setMunicipios(null)
  }, [selectedProvincia])

  const handleChangeComunidad = e => {
    setSelectedComunidad({
      CCOM: e.target.value, 
      COM: e.target.options[e.target.selectedIndex].textContent
    })
  }

  const handleChangeProvincia = e => {
    setSelectedProvincia({
      CPRO: e.target.value, 
      PRO: e.target.options[e.target.selectedIndex].textContent
    })
  }

  const handleChangeMunicipio = e => {
    setSelectedMunicipio({
      CMUM: e.target.value, 
      DMUN50: e.target.options[e.target.selectedIndex].textContent
    })
  }

  return (
    <div className="dropdownsContainer">
      <select onChange={handleChangeComunidad}>
        {!selectedComunidad && <option value="">--selecciona comunidad--</option>}
        { comunidades &&
          comunidades.map(comunidad => (
            <option key={comunidad.CCOM} value={comunidad.CCOM}>
              {comunidad.COM}
            </option>
          ))
        }
      </select>

      <select disabled={selectedComunidad===null} onChange={handleChangeProvincia}>
        {!selectedProvincia && <option value="">--selecciona provincia--</option>}
        { provincias &&
          provincias.map(provincia => (
            <option key={provincia.CPRO} value={provincia.CPRO}>
              {provincia.PRO}
            </option>
          ))
        }
      </select>

      <select disabled ={selectedProvincia===null} onChange={handleChangeMunicipio}>
        {!selectedMunicipio && <option value="">--selecciona municipio--</option>}
        { municipios &&
          municipios.map(municipio => (
            <option key={municipio.CMUM} value={municipio.CMUM}>
              {municipio.DMUN50}
            </option>
          ))
        }
      </select>
    </div>
  )
}
