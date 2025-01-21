import axios from "axios";

// Define o tipo para a resposta da API
interface JokeResponse {
  value: string;
}

export async function getJoke(): Promise<string> {
  try {
    const res = await axios.get<JokeResponse>("https://api.chucknorris.io/jokes/random");
    
    if (res.status === 200) {
      return res.data.value; // Retorna o valor da piada
    } else {
      throw new Error(`Unexpected response status: ${res.status}`);
    }
  } catch (error) {
    console.error("Error fetching joke:", error);
    throw error; // Propaga o erro para ser tratado pelo chamador
  }
}
