import axios from 'axios';

export async function getJoke() {
    const res = await axios.get("https://api.chucknorris.io/jokes/random")
    if( res.status === 200){
        return res.data.value
    }
}