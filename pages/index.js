import { useState } from "react";

export default function Home() {
  const [termo, setTermo] = useState("");
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const buscar = async () => {
    if (!termo) return;
    setCarregando(true);
    setErro(null);
    setResultados([]);
    try {
      const res = await fetch(`/api/busca?termo=${encodeURIComponent(termo)}`);
      if (!res.ok) throw new Error("Erro ao buscar dados.");
      const data = await res.json();
      setResultados(data);
    } catch (e) {
      setErro(e.message);
    }
    setCarregando(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") buscar();
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-start px-4">
      <header className="w-full max-w-2xl flex flex-col items-center pt-10 pb-4">
        <img src="/logoguiaseg.png" alt="Guia SEGCI" className="h-16 mb-4" />
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-1 text-center">
          Encontre a carga de incêndio da sua ocupação
        </h1>
        <p className="text-neutral-300 text-center">
          Busca rápida, prática e confiável para projetos de PPCI
        </p>
      </header>
      <main className="w-full max-w-2xl flex flex-col items-center mt-8">
        <div className="flex w-full gap-2 mb-8">
          <input
            className="flex-1 p-3 rounded-l-xl text-lg bg-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Digite o nome ou código da ocupação (ex: apartamento, F-10)"
          />
          <button
            onClick={buscar}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-r-xl font-semibold transition"
          >
            Buscar
          </button>
        </div>
        {carregando && (
          <span className="text-neutral-200 mb-4">Buscando informações...</span>
        )}
        {erro && <div className="text-red-400 mb-4">{erro}</div>}
        {!carregando && resultados.length === 0 && !erro && (
          <span className="text-neutral-400">
            Digite um termo e clique em Buscar para iniciar sua pesquisa.
          </span>
        )}
        <ul className="w-full mt-2">
          {resultados.map((item) => (
            <li
              key={item.id}
              className="mb-4 bg-white/90 rounded-2xl shadow p-5 flex flex-col gap-1 border-l-4 border-orange-500 break-words"
            >
              <div className="flex items-center gap-6">
                <span className="font-bold text-orange-500 text-xl min-w-[90px]">
                  {item.codigo}
                </span>
                <span className="text-lg font-semibold">{item.descricao}</span>
              </div>
              <div className="text-sm text-neutral-600">
                <b>Divisão:</b> {item.divisao}
                &nbsp;|&nbsp;
                <b>Carga:</b>{" "}
                <span className="text-orange-600 font-bold">{item.carga} MJ/m²</span>
              </div>
              {item.referencia && (
                <div className="text-xs text-neutral-500 italic pt-2">
                  <b>Referência:</b> {item.referencia}
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
      <footer className="mt-8 mb-4 text-xs text-neutral-400 text-center">
        © {new Date().getFullYear()} Guia SEGCI · Powered by SaasCarga
      </footer>
    </div>
  );
}
