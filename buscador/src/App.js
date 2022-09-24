import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './styles.css';
import api from "./services/api";

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch(){
    if(input === ''){
      alert('Preencha algum cep')
      return;      
    }

    try{
      const response = await api.get(`${input}/json`);
      //console.log(response.data) //só response ele retorna um objeto no console do browser
      setCep(response.data)
      setInput('')

    } catch {
      alert('Ops, erro ao buscar!')
      setInput('') //aqui ele limpa o campo de busca para o estado vazio
    }
  }

  return (
    <div className="container">
      <h1 className="title">BUSCADOR DE CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="buttonSearch" onClick={handleSearch}><FiSearch size={25} color="#000"/></button>
      </div>

      {Object.keys(cep).length > 0 && ( //se tiver algo dentro do objeto cep, então a aplicação mostrará a caixinha
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Localidade: {cep.localidade}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
