const axios = require("axios")
const { Country , Activity } = require("../db")



async function getCountriesApi ()   {
    try {
            let url = await axios.get(`https://restcountries.com/v3.1/all`)
            let countries = url.data;
            let filteredCountriesApi  = countries.map((c ) => {
                return {
                    id: c.cca3,
                    name: c.name.common,
                    flag: c.flags.svg,
                    continent: c.continents[0],
                    capital: c.capital ? c.capital[0] : 'No capital',
                    subregion: c.subregion,
                    area: c.area.toString(),
                    population: c.population.toString(),
                    populationVirtual: c.populationVirtual,
                    unMember: c.unMember,
                    location: c.maps.googleMaps,
                    timezones: c.timezones[0]
                }
            })
            return filteredCountriesApi
        
    } catch (e) {
        console.log(e)
        return 'Error'
    }
}

const getDataBaseInfo = async () => {
    try{
    return await Country.findAll({
        include: {
            model: Activity,
            attributes: ["name"],
            through: {
                attributes: []
            } 
        }
     })
    } catch (e) {
        console.log(e)
 }
}

const getAllCountries = async () => {

    const apiCountriesProm =   await getCountriesApi();
    const dbInfoProm =  await  getDataBaseInfo()

    const [apiCountries, dbInfo] = await Promise.all([apiCountriesProm, dbInfoProm]) 

    return [...apiCountries, ...dbInfo];
}

module.exports = {
    getAllCountries  
}