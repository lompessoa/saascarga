import { useState } from "react"

export default function Home() {
  const [termo, setTermo] = useState("")
  const [resultados, setResultados] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  const buscar = async () => {
    if (!termo) return
    setCarregando(true)
    setErro(null)
    try {
      const res = await fetch(`/api/busca?termo=${encodeURIComponent(termo)}`)
      if (!res.ok) throw new Error("Erro ao buscar dados.")
      const data = await res.json()
      setResultados(data)
    } catch (e) {
      setErro(e.message)
    }
    setCarregando(false)
  }

  // Permite buscar ao apertar Enter
  const onKeyDown = (e) => {
    if (e.key === "Enter") buscar()
  }

  return (
    <div style={{
      maxWidth: 700,
      margin: "40px auto",
      padding: 24,
      borderRadius: 8,
      boxShadow: "0 2px 16px #0001",
      background: "#fff"
    }}>
      <h1 style={{textAlign: "center", marginBottom: 32}}>SaaS Carga de Incêndio</h1>
      <div style={{display: "flex", gap: 8, marginBottom: 24}}>
        <input
          value={termo}
          onChange={e => setTermo(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Digite a descrição ou código (ex: apartamento, F-10)..."
          style={{
            flex: 1,
            padding: "10px 16px",
            fontSize: 18,
            borderRadius: 6,
            border: "1px solid #aaa"
          }}
        />
        <button
          onClick={buscar}
          style={{
            padding: "10px 24px",
            fontSize: 18,
            borderRadius: 6,
            border: "none",
            background: "#b71c1c",
            color: "#fff",
            cursor: "pointer"
          }}>
          Buscar
        </button>
      </div>
      {carregando && <div>Buscando...</div>}
      {erro && <div style={{color: "red"}}>Erro: {erro}</div>}
      <ul style={{listStyle: "none", padding: 0}}>
        {resultados.length === 0 && !carregando && <li>Nenhum resultado encontrado.</li>}
        {resultados.map(item => (
          <li key={item.id} style={{
            padding: 16,
            borderBottom: "1px solid #eee"
          }}>
            <div>
              <b>{item.codigo}</b> — {item.descricao}
            </div>
            <div>
              <b>Divisão:</b> {item.divisao} &nbsp;|&nbsp;
              <b>Carga:</b> {item.carga} MJ/m²
            </div>
            {item.referencia && (
              <div style={{fontSize: 13, color: "#555"}}>
                <b>Referência:</b> {item.referencia}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
