import React, { useState, useEffect } from "react";
import CartasPage from "./assets/CartasPage";

const atividadesSaudade = [
  { titulo: "📸 Reveja nossas fotos", descricao: "Que tal relembrar nossos melhores momentos?" },
  { titulo: "💝 Escreva uma mensagem", descricao: "Deixe um recadinho carinhoso para eu ler depois" },
  { titulo: "🎵 Ouça nossa música", descricao: "Aquelas que nos lembram um do outro" },
  { titulo: "📅 Planeje nosso reencontro", descricao: "O que vamos fazer quando nos vermos?" },
  { titulo: "✨ Lembre de algo especial", descricao: "Pense naquele momento que sempre te faz sorrir" }
];

const mensagensIniciais = {
  deMimParaVoce: [
    "Você é a melhor parte do meu dia",
    "Eu sou muito grato por ter você na minha vida",
    "Cada momento com você é especial",
    "Tenho muito orgulho de Você",
    "Você torna tudo muito especial",
    "Te amo muito, obrigado por tudo!",
    "Você me inspira a ser uma pessoa melhor todos os dias",
    "Você é a melhor escolha que eu ja fiz",
    "Tudo faz sentido quando estou com você"
  ],
  deVoceParaMim: ["Adicione suas próprias mensagens aqui 💝"]
};

const fotos = [
  "/fotos/foto1.jpeg", "/fotos/foto2.jpeg", "/fotos/foto4.jpeg",
  "/fotos/foto5.jpeg", "/fotos/foto6.jpeg", "/fotos/foto7.jpeg",
  "/fotos/foto8.jpeg", "/fotos/foto9.jpeg", "/fotos/foto10.jpeg",
];

function ContadorTempoClean() {
  const [tempoJuntos, setTempoJuntos] = useState({ dias: 0, meses: 0, anos: 0 });
  useEffect(() => {
    const dataInicio = new Date('2025-02-07');
    const calc = () => {
      const d = new Date() - dataInicio;
      setTempoJuntos({
        anos: Math.floor(d / (1000*60*60*24*365)),
        meses: Math.floor((d % (1000*60*60*24*365)) / (1000*60*60*24*30)),
        dias: Math.floor((d % (1000*60*60*24*30)) / (1000*60*60*24)),
      });
    };
    calc();
    const i = setInterval(calc, 60000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="mt-2">
      <h2 className="text-base font-semibold text-gray-800 mb-1">Tempo Juntos 💫</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center text-center">
          {[['Anos', tempoJuntos.anos], ['Meses', tempoJuntos.meses], ['Dias', tempoJuntos.dias]].map(([label, val], i) => (
            <React.Fragment key={label}>
              {i > 0 && <div className="text-gray-300 mx-2">•</div>}
              <div className="flex-1">
                <div className="text-2xl font-light text-gray-900">{val}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardImagens() {
  const [fotoAtual, setFotoAtual] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setFotoAtual(p => (p + 1) % fotos.length), 8000);
    return () => clearInterval(i);
  }, []);
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-1">Nossas fotos 📸</h2>
      <p className="text-xs text-gray-500 mb-2">Para você sempre lembrar da gente</p>
      <div className="relative">
        <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <img src={fotos[fotoAtual]} alt="Nossa foto" className="w-full aspect-[4/3] object-cover transition-all duration-700 ease-in-out" />
        </div>
        <button onClick={() => setFotoAtual((fotoAtual - 1 + fotos.length) % fotos.length)} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1.5 shadow">◀</button>
        <button onClick={() => setFotoAtual((fotoAtual + 1) % fotos.length)} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1.5 shadow">▶</button>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">{fotoAtual + 1} / {fotos.length}</div>
      </div>
    </div>
  );
}

function CardMensagens() {
  const [mensagemAtual, setMensagemAtual] = useState(0);
  const [categoriaAtiva, setCategoriaAtiva] = useState('deMimParaVoce');
  const [novaMensagem, setNovaMensagem] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mensagens, setMensagens] = useState(() => {
    const s = localStorage.getItem('mensagensApp');
    return s ? JSON.parse(s) : mensagensIniciais;
  });
  useEffect(() => { localStorage.setItem('mensagensApp', JSON.stringify(mensagens)); }, [mensagens]);
  useEffect(() => {
    const i = setInterval(() => {
      if (mensagens[categoriaAtiva].length > 0) setMensagemAtual(p => (p + 1) % mensagens[categoriaAtiva].length);
    }, 6000);
    return () => clearInterval(i);
  }, [categoriaAtiva, mensagens]);
  const adicionarMensagem = () => {
    if (novaMensagem.trim()) {
      setMensagens({ ...mensagens, [categoriaAtiva]: [...mensagens[categoriaAtiva], novaMensagem.trim()] });
      setNovaMensagem(''); setMostrarForm(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-gray-800">Mensagens 💌</h2>
        <button onClick={() => setMostrarForm(!mostrarForm)} className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-pink-600 transition-colors">{mostrarForm ? 'Cancelar' : '+ Mensagem'}</button>
      </div>
      {mostrarForm && (
        <div className="mb-4 p-3 bg-pink-50 rounded-lg border border-pink-200">
          <div className="flex gap-2 mb-2">
            {['deMimParaVoce','deVoceParaMim'].map(cat => (
              <button key={cat} onClick={() => setCategoriaAtiva(cat)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${categoriaAtiva === cat ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 border'}`}>{cat === 'deMimParaVoce' ? 'De mim pra você' : 'De você pra mim'}</button>
            ))}
          </div>
          <textarea value={novaMensagem} onChange={e => setNovaMensagem(e.target.value)} placeholder="Escreva sua mensagem..." className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none" rows="3" />
          <button onClick={adicionarMensagem} className="w-full bg-pink-500 text-white py-2 rounded-lg mt-2 hover:bg-pink-600 transition-colors">Adicionar Mensagem</button>
        </div>
      )}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-3">
        {['deMimParaVoce','deVoceParaMim'].map(cat => (
          <button key={cat} onClick={() => setCategoriaAtiva(cat)} className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${categoriaAtiva === cat ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-600'}`}>{cat === 'deMimParaVoce' ? 'De mim pra você' : 'De você pra mim'}</button>
        ))}
      </div>
      {mensagens[categoriaAtiva].length > 0
        ? <div className="p-4 border border-gray-200 bg-white rounded-lg text-center text-gray-700 text-base font-medium shadow-sm min-h-[80px] flex items-center justify-center">{mensagens[categoriaAtiva][mensagemAtual]}</div>
        : <div className="p-4 border border-gray-200 bg-white rounded-lg text-center text-gray-500 text-sm">Nenhuma mensagem ainda.</div>
      }
      <div className="text-xs text-gray-500 text-center mt-2">{mensagemAtual + 1} / {mensagens[categoriaAtiva].length} mensagens</div>
    </div>
  );
}

function CardPlaylist() {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-1">Nossa playlist 🎶</h2>
      <div className="p-2 border border-gray-200 bg-white rounded-lg shadow-sm">
        <iframe className="rounded-md shadow w-full h-48" src="https://open.spotify.com/embed/playlist/7nR2syM4wqa9rHUpZkoxzx" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" title="Spotify Playlist"></iframe>
      </div>
    </div>
  );
}

function MapaInterativo({ onSelecionarLocal, localSelecionado, modoSelecao = false }) {
  const [coordenadas, setCoordenadas] = useState({ lat: localSelecionado?.lat || -23.5505, lng: localSelecionado?.lng || -46.6333 });
  const [mapaCarregado, setMapaCarregado] = useState(true);
  useEffect(() => { if (localSelecionado) setCoordenadas({ lat: localSelecionado.lat, lng: localSelecionado.lng }); }, [localSelecionado]);
  const handleClick = (e) => {
    if (!modoSelecao) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const c = {
      lat: parseFloat((coordenadas.lat + ((e.clientY - rect.top) / rect.height - 0.5) * 0.02).toFixed(6)),
      lng: parseFloat((coordenadas.lng + ((e.clientX - rect.left) / rect.width - 0.5) * 0.02).toFixed(6)),
    };
    setCoordenadas(c);
    if (onSelecionarLocal) onSelecionarLocal(c);
  };
  return (
    <div className="relative">
      {modoSelecao && <div className="bg-blue-100 border border-blue-300 rounded-lg p-2 mb-2"><p className="text-blue-800 text-sm text-center">📍 Clique no mapa para selecionar</p></div>}
      <div className={`relative h-64 w-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden border-2 ${modoSelecao ? 'border-blue-400 cursor-crosshair' : 'border-gray-300'}`} onClick={handleClick}>
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${coordenadas.lat},${coordenadas.lng}&zoom=14&size=600x400&markers=color:red|${coordenadas.lat},${coordenadas.lng}&scale=2`} alt="Mapa" className="w-full h-full object-cover" onLoad={() => setMapaCarregado(true)} onError={() => setMapaCarregado(false)} />
        {!mapaCarregado && <div className="absolute inset-0 flex items-center justify-center bg-gray-100"><div className="text-center"><div className="text-4xl">🌍</div><div className="text-gray-600 text-sm">Mapa não disponível</div></div></div>}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg ${modoSelecao ? 'animate-bounce bg-red-500' : 'bg-blue-500'}`} style={{ zIndex: 10 }}><span className="text-white text-lg">📍</span></div>
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">{coordenadas.lat.toFixed(4)}, {coordenadas.lng.toFixed(4)}</div>
      </div>
      <button onClick={() => window.open(`https://www.google.com/maps?q=${coordenadas.lat},${coordenadas.lng}`, '_blank')} className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">🗺️ Abrir no Google Maps</button>
    </div>
  );
}

function CardLugares() {
  const [lugares, setLugares] = useState(() => { const s = localStorage.getItem('lugaresApp'); return s ? JSON.parse(s) : []; });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoMapa, setModoMapa] = useState('visualizar');
  const [lugarSelecionado, setLugarSelecionado] = useState(null);
  const [novoLugar, setNovoLugar] = useState({ nome: '', endereco: '', nota: '', lat: -23.5505, lng: -46.6333 });
  useEffect(() => { localStorage.setItem('lugaresApp', JSON.stringify(lugares)); }, [lugares]);
  const adicionarLugar = () => {
    if (!novoLugar.nome.trim()) return;
    const novo = { id: Date.now(), ...novoLugar, nome: novoLugar.nome.trim(), endereco: novoLugar.endereco.trim() || `${novoLugar.lat.toFixed(4)}, ${novoLugar.lng.toFixed(4)}`, tipo: 'personalizado', nota: novoLugar.nota.trim() || 'Lugar especial' };
    const novos = [...lugares, novo];
    setLugares(novos); setLugarSelecionado(novo);
    setNovoLugar({ nome: '', endereco: '', nota: '', lat: -23.5505, lng: -46.6333 });
    setMostrarForm(false); setModoMapa('visualizar');
  };
  const removerLugar = (id, e) => {
    e.stopPropagation();
    const novos = lugares.filter(l => l.id !== id);
    setLugares(novos);
    if (lugarSelecionado?.id === id) setLugarSelecionado(novos[0] || null);
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-gray-800">Lugares para conhecer 🌍</h2>
        <button onClick={() => { setMostrarForm(!mostrarForm); setModoMapa(mostrarForm ? 'visualizar' : 'adicionar'); }} className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors">{mostrarForm ? 'Cancelar' : '+ Lugar'}</button>
      </div>
      {mostrarForm && (
        <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">📍 Adicionar Novo Lugar</h3>
          <div className="grid gap-3 mb-3">
            <div>
              <label className="text-sm text-green-700 mb-1 block">Nome do lugar</label>
              <input type="text" value={novoLugar.nome} onChange={e => setNovoLugar({...novoLugar, nome: e.target.value})} placeholder="Ex: Café Romântico..." className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="text-sm text-green-700 mb-1 block">Por que vamos gostar?</label>
              <textarea value={novoLugar.nota} onChange={e => setNovoLugar({...novoLugar, nota: e.target.value})} placeholder="Ex: Vista incrível..." className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" rows="2" />
            </div>
          </div>
          <MapaInterativo onSelecionarLocal={c => setNovoLugar(p => ({...p,...c}))} modoSelecao={modoMapa === 'adicionar'} localSelecionado={novoLugar} />
          <button onClick={adicionarLugar} disabled={!novoLugar.nome.trim()} className={`w-full py-2 rounded-lg font-medium mt-3 ${novoLugar.nome.trim() ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>✅ Adicionar Lugar</button>
        </div>
      )}
      {!mostrarForm && <div className="mb-4"><MapaInterativo localSelecionado={lugarSelecionado} modoSelecao={false} /></div>}
      <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
        {lugares.map(lugar => (
          <div key={lugar.id} className={`flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 cursor-pointer ${lugarSelecionado?.id === lugar.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`} onClick={() => setLugarSelecionado(lugar)}>
            <div className="flex items-center gap-3 flex-1">
              <span className="text-xl">📍</span>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-800">{lugar.nome}</div>
                <div className="text-xs text-gray-500">{lugar.endereco}</div>
                {lugar.nota && <div className="text-xs text-blue-600 mt-1">💡 {lugar.nota}</div>}
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={e => { e.stopPropagation(); window.open(`https://www.google.com/maps?q=${lugar.lat},${lugar.lng}`, '_blank'); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">🗺️</button>
              <button onClick={e => removerLugar(lugar.id, e)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">🗑️</button>
            </div>
          </div>
        ))}
      </div>
      {lugares.length === 0 && (
        <div className="text-center text-gray-500 text-sm py-8 border border-gray-200 rounded-lg">
          <div className="text-4xl mb-2">🌎</div>
          <div>Nenhum lugar adicionado ainda.</div>
        </div>
      )}
    </div>
  );
}

function MenuPrincipal({ onSelecionarCard, cardAtivo }) {
  const opcoesMenu = [
    { id: 'imagens', icone: '📸', label: 'Fotos' },
    { id: 'mensagens', icone: '💌', label: 'Mensagens' },
    { id: 'contagem', icone: '💫', label: 'Tempo' },
    { id: 'playlist', icone: '🎶', label: 'Playlist' },
    { id: 'lugares', icone: '🌍', label: 'Lugares' },
    { id: 'cartas', icone: '✉️', label: 'Cartas' },
  ];
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 mb-4">
      <div className="flex justify-between gap-1">
        {opcoesMenu.map(opcao => (
          <button key={opcao.id} onClick={() => onSelecionarCard(opcao.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-md flex-1 transition-all ${cardAtivo === opcao.id ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <span className="text-lg">{opcao.icone}</span>
            <span className="text-xs mt-1">{opcao.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AppPrincipal({ onVoltarParaContagem }) {
  const [cardAtivo, setCardAtivo] = useState('imagens');

  // Página de cartas = tela cheia separada
  if (cardAtivo === 'cartas') {
    return <CartasPage onVoltar={() => setCardAtivo('imagens')} />;
  }

  const renderizarCardAtivo = () => {
    switch (cardAtivo) {
      case 'imagens': return <CardImagens />;
      case 'mensagens': return <CardMensagens />;
      case 'contagem': return <ContadorTempoClean />;
      case 'playlist': return <CardPlaylist />;
      case 'lugares': return <CardLugares />;
      default: return <CardImagens />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100 p-4 font-sans">
      <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-xl w-full max-w-lg p-5 flex flex-col gap-6">
        <button onClick={onVoltarParaContagem} className="self-start text-pink-600 hover:text-pink-700 text-sm flex items-center transition-colors">‹ Voltar para a contagem</button>
        <MenuPrincipal onSelecionarCard={setCardAtivo} cardAtivo={cardAtivo} />
        {renderizarCardAtivo()}
      </div>
    </div>
  );
}

function CardSaudade({ onVerConteudoPrincipal }) {
  const [tempoRestante, setTempoRestante] = useState({});
  const [atividadeAtual, setAtividadeAtual] = useState(0);
  const dataReencontro = new Date('2025-12-05 19:00:00');

  useEffect(() => {
    const calc = () => {
      const d = dataReencontro - new Date();
      if (d <= 0) { setTempoRestante({ reencontro: true }); return; }
      setTempoRestante({
        dias: Math.floor(d / (1000*60*60*24)),
        horas: Math.floor((d % (1000*60*60*24)) / (1000*60*60)),
        minutos: Math.floor((d % (1000*60*60)) / (1000*60)),
        segundos: Math.floor((d % (1000*60)) / 1000),
        reencontro: false
      });
    };
    calc();
    const i = setInterval(calc, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = setInterval(() => setAtividadeAtual(p => (p + 1) % atividadesSaudade.length), 15000);
    return () => clearInterval(i);
  }, []);

  if (tempoRestante.reencontro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 to-purple-500 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">O dia chegou!</h1>
          <p className="text-gray-600 mb-6">Já posso te ver!</p>
          <button onClick={onVerConteudoPrincipal} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all">Ver Nossas Memórias 💖</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">💕</div>
          <h1 className="text-xl font-bold text-gray-800">Contagem para te ver!</h1>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-4 mb-6 border border-pink-100">
          <div className="grid grid-cols-4 gap-2 text-center">
            {[['Dias', tempoRestante.dias], ['Horas', tempoRestante.horas], ['Minutos', tempoRestante.minutos], ['Segundos', tempoRestante.segundos]].map(([label, val]) => (
              <div key={label}>
                <div className="text-2xl font-light text-gray-900">{val || 0}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="bg-pink-100 text-pink-600 rounded-full p-2 text-sm">💡</div>
            <div>
              <h3 className="font-medium text-gray-800">{atividadesSaudade[atividadeAtual].titulo}</h3>
              <p className="text-sm text-gray-600 mt-1">{atividadesSaudade[atividadeAtual].descricao}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-1 mb-4">
          {atividadesSaudade.map((_, i) => <div key={i} className={`w-1 h-1 rounded-full ${i === atividadeAtual ? 'bg-pink-500' : 'bg-gray-300'}`} />)}
        </div>
        <button onClick={onVerConteudoPrincipal} className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm">Ver Nossas Memórias ›</button>
      </div>
    </div>
  );
}

export default function App() {
  const [tela, setTela] = useState("cartas"); // "cartas" | "principal" | "saudade"

  if (tela === "cartas") {
    return <CartasPage onVoltar={() => setTela("principal")} />;
  }
  if (tela === "saudade") {
    return <CardSaudade onVerConteudoPrincipal={() => setTela("principal")} />;
  }
  return <AppPrincipal onVoltarParaContagem={() => setTela("cartas")} />;
}