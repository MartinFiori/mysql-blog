import axios from 'axios';
async function joke() {
  try {
    const prueba = await axios.get('https://rickandmortyapi.com/api/character')
    console.log(prueba.data.results)
    const data = await prueba.data.results
    return data
  } catch (err) {
    throw new Error({ error: err.message })
  }
}

export default joke