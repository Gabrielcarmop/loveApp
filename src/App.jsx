import React, { useState, useEffect } from "react";

// Atividades para matar a saudade
const atividadesSaudade = [
  {
    titulo: "📸 Reveja nossas fotos",
    descricao: "Que tal relembrar nossos melhores momentos?",
    acao: "Ver Galeria"
  },
  {
    titulo: "💝 Escreva uma mensagem",
    descricao: "Deixe um recadinho carinhoso para eu ler depois",
    acao: "Escrever"
  },
  {
    titulo: "🎵 Ouça nossa música",
    descricao: "Aquelas que nos lembram um do outro",
    acao: "Ouvir"
  },
  {
    titulo: "📅 Planeje nosso reencontro",
    descricao: "O que vamos fazer quando nos vermos?",
    acao: "Planejar"
  },
  {
    titulo: "✨ Lembre de algo especial",
    descricao: "Pense naquele momento que sempre te faz sorrir",
    acao: "Relembrar"
  }
];

// Mensagens iniciais
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
  deVoceParaMim: [
    "Adicione suas próprias mensagens aqui 💝"
  ]
};

const fotos = [
  "/fotos/foto1.jpeg",
  "/fotos/foto2.jpeg",
  "/fotos/foto4.jpeg",
  "/fotos/foto5.jpeg",
  "/fotos/foto6.jpeg",
  "/fotos/foto7.jpeg",
  "/fotos/foto8.jpeg",
  "/fotos/foto9.jpeg",
  "/fotos/foto10.jpeg",
];

// Lugares iniciais com coordenadas
const lugaresIniciais = [];

// Componente do Contador de Tempo Juntos
function ContadorTempoClean() {
  const [tempoJuntos, setTempoJuntos] = useState({ dias: 0, meses: 0, anos: 0 });

  useEffect(() => {
    const dataInicio = new Date('2025-02-07');
    
    const calcularTempo = () => {
      const agora = new Date();
      const diferenca = agora - dataInicio;
      
      const anos = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365));
      const meses = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      const dias = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      
      setTempoJuntos({ anos, meses, dias });
    };
    
    calcularTempo();
    const intervalo = setInterval(calcularTempo, 60000);
    
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="mt-2">
      <h2 className="text-base font-semibold text-gray-800 mb-1">Tempo Juntos 💫</h2>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center text-center">
          <div className="flex-1">
            <div className="text-2xl font-light text-gray-900">{tempoJuntos.anos}</div>
            <div className="text-xs text-gray-500 mt-1">Anos</div>
          </div>
          
          <div className="text-gray-300 mx-2">•</div>
          
          <div className="flex-1">
            <div className="text-2xl font-light text-gray-900">{tempoJuntos.meses}</div>
            <div className="text-xs text-gray-500 mt-1">Meses</div>
          </div>
          
          <div className="text-gray-300 mx-2">•</div>
          
          <div className="flex-1">
            <div className="text-2xl font-light text-gray-900">{tempoJuntos.dias}</div>
            <div className="text-xs text-gray-500 mt-1">Dias</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente do Card de Imagens
function CardImagens() {
  const [fotoAtual, setFotoAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFotoAtual((prev) => (prev + 1) % fotos.length);
    }, 8000);
    return () => clearInterval(intervalo);
  }, []);

  const proximaFoto = () => {
    setFotoAtual((fotoAtual + 1) % fotos.length);
  };

  const fotoAnterior = () => {
    setFotoAtual((fotoAtual - 1 + fotos.length) % fotos.length);
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-1">Nossas fotos 📸</h2>
      <p className="text-xs text-gray-500 mb-2">Para você sempre lembrar da gente</p>
      <div className="relative">
        <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <img
            src={fotos[fotoAtual]}
            alt="Nossa foto"
            className="w-full aspect-[4/3] object-cover transition-all duration-700 ease-in-out"
          />
        </div>
        <button
          onClick={fotoAnterior}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1.5 shadow transition-all hover:scale-110"
          aria-label="Foto anterior"
        >
          ◀
        </button>
        <button
          onClick={proximaFoto}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1.5 shadow transition-all hover:scale-110"
          aria-label="Próxima foto"
        >
          ▶
        </button>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
          {fotoAtual + 1} / {fotos.length}
        </div>
      </div>
    </div>
  );
}

// Componente do Card de Mensagens
function CardMensagens() {
  const [mensagemAtual, setMensagemAtual] = useState(0);
  const [categoriaAtiva, setCategoriaAtiva] = useState('deMimParaVoce');
  const [novaMensagem, setNovaMensagem] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);

  // Carregar mensagens do localStorage
  const [mensagens, setMensagens] = useState(() => {
    const salvas = localStorage.getItem('mensagensApp');
    return salvas ? JSON.parse(salvas) : mensagensIniciais;
  });

  // Salvar mensagens no localStorage quando mudarem
  useEffect(() => {
    localStorage.setItem('mensagensApp', JSON.stringify(mensagens));
  }, [mensagens]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (mensagens[categoriaAtiva].length > 0) {
        setMensagemAtual((prev) => (prev + 1) % mensagens[categoriaAtiva].length);
      }
    }, 6000);
    return () => clearInterval(intervalo);
  }, [categoriaAtiva, mensagens]);

  const adicionarMensagem = () => {
    if (novaMensagem.trim() !== '') {
      const novasMensagens = {
        ...mensagens,
        [categoriaAtiva]: [...mensagens[categoriaAtiva], novaMensagem.trim()]
      };
      setMensagens(novasMensagens);
      setNovaMensagem('');
      setMostrarForm(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      adicionarMensagem();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-gray-800">Mensagens 💌</h2>
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-pink-600 transition-colors"
        >
          {mostrarForm ? 'Cancelar' : '+ Mensagem'}
        </button>
      </div>

      {/* Formulário para nova mensagem */}
      {mostrarForm && (
        <div className="mb-4 p-3 bg-pink-50 rounded-lg border border-pink-200">
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setCategoriaAtiva('deMimParaVoce')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                categoriaAtiva === 'deMimParaVoce' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white text-gray-700 border'
              }`}
            >
              De mim pra você
            </button>
            <button
              onClick={() => setCategoriaAtiva('deVoceParaMim')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                categoriaAtiva === 'deVoceParaMim' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white text-gray-700 border'
              }`}
            >
              De você pra mim
            </button>
          </div>
          <textarea
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Escreva uma mensagem ${categoriaAtiva === 'deMimParaVoce' ? 'para ela' : 'para ele'}...`}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
            rows="3"
          />
          <button
            onClick={adicionarMensagem}
            className="w-full bg-pink-500 text-white py-2 rounded-lg mt-2 hover:bg-pink-600 transition-colors"
          >
            Adicionar Mensagem
          </button>
        </div>
      )}

      {/* Seletor de categoria */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-3">
        <button
          onClick={() => setCategoriaAtiva('deMimParaVoce')}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            categoriaAtiva === 'deMimParaVoce' 
              ? 'bg-white text-pink-600 shadow-sm' 
              : 'text-gray-600'
          }`}
        >
          De mim pra você
        </button>
        <button
          onClick={() => setCategoriaAtiva('deVoceParaMim')}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            categoriaAtiva === 'deVoceParaMim' 
              ? 'bg-white text-pink-600 shadow-sm' 
              : 'text-gray-600'
          }`}
        >
          De você pra mim
        </button>
      </div>

      {/* Exibição da mensagem atual */}
      {mensagens[categoriaAtiva].length > 0 ? (
        <div
          key={mensagemAtual}
          className="p-4 border border-gray-200 bg-white rounded-lg text-center text-gray-700 text-base font-medium shadow-sm transition-opacity duration-700 ease-in-out min-h-[80px] flex items-center justify-center"
        >
          {mensagens[categoriaAtiva][mensagemAtual]}
        </div>
      ) : (
        <div className="p-4 border border-gray-200 bg-white rounded-lg text-center text-gray-500 text-sm">
          Nenhuma mensagem ainda. Adicione a primeira!
        </div>
      )}

      {/* Contador de mensagens */}
      <div className="text-xs text-gray-500 text-center mt-2">
        {mensagemAtual + 1} / {mensagens[categoriaAtiva].length} mensagens
      </div>
    </div>
  );
}

// Componente do Card de Playlist
function CardPlaylist() {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-1">Nossa playlist 🎶</h2>
      <div className="p-2 border border-gray-200 bg-white rounded-lg shadow-sm">
        <iframe
          className="rounded-md shadow w-full h-48"
          src="https://open.spotify.com/embed/playlist/7nR2syM4wqa9rHUpZkoxzx"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          title="Spotify Playlist"
        ></iframe>
      </div>
    </div>
  );
}

function MapaInterativo({ onSelecionarLocal, localSelecionado, modoSelecao = false }) {
  const [mapaCarregado, setMapaCarregado] = useState(true); // Já começa como true
  const [coordenadas, setCoordenadas] = useState({ 
    lat: localSelecionado?.lat || -23.5505, 
    lng: localSelecionado?.lng || -46.6333 
  });

  // Atualizar coordenadas quando o local selecionado mudar
  useEffect(() => {
    if (localSelecionado) {
      setCoordenadas({
        lat: localSelecionado.lat,
        lng: localSelecionado.lng
      });
    }
  }, [localSelecionado]);

  // Simulação de clique no mapa para selecionar local
  const handleCliqueMapa = (e) => {
    if (modoSelecao && mapaCarregado) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Simulação de coordenadas baseada na posição do clique (mais precisa)
      const novaLat = coordenadas.lat + (y / rect.height - 0.5) * 0.02;
      const novaLng = coordenadas.lng + (x / rect.width - 0.5) * 0.02;
      
      const novasCoordenadas = {
        lat: parseFloat(novaLat.toFixed(6)),
        lng: parseFloat(novaLng.toFixed(6))
      };
      
      setCoordenadas(novasCoordenadas);
      
      if (onSelecionarLocal) {
        onSelecionarLocal(novasCoordenadas);
      }
    }
  };

  // Função para zoom in
  const zoomIn = () => {
    // Simulação de zoom - na prática você ajustaria o parâmetro zoom da URL
    setCoordenadas(prev => ({ ...prev }));
  };

  // Função para zoom out
  const zoomOut = () => {
    // Simulação de zoom - na prática você ajustaria o parâmetro zoom da URL
    setCoordenadas(prev => ({ ...prev }));
  };

  // URL do mapa estático sem API key (usando método público)
  const getMapaUrl = () => {
    const center = `${coordenadas.lat},${coordenadas.lng}`;
    const markers = `color:red|${coordenadas.lat},${coordenadas.lng}`;
    
    // URL sem API key (funciona para uso básico)
    return `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=14&size=600x400&markers=${markers}&scale=2`;
  };

  return (
    <div className="relative">
      {modoSelecao && (
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-2 mb-2">
          <p className="text-blue-800 text-sm text-center">
            📍 Clique no mapa para selecionar um local
          </p>
        </div>
      )}
      
      <div 
        className={`relative h-64 w-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden border-2 ${
          modoSelecao ? 'border-blue-400 cursor-crosshair' : 'border-gray-300'
        }`}
        onClick={handleCliqueMapa}
      >
        {/* Mapa estático do Google Maps */}
        <img
          src={getMapaUrl()}
          alt="Mapa interativo"
          className="w-full h-full object-cover"
          onLoad={() => setMapaCarregado(true)}
          onError={() => setMapaCarregado(false)}
        />
        
        {/* Overlay de carregamento */}
        {!mapaCarregado && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90">
            <div className="text-center">
              <div className="text-gray-500 mb-2">🌍</div>
              <div className="text-gray-600 text-sm">Mapa não disponível</div>
              <div className="text-gray-500 text-xs">Use o botão "Abrir no Maps"</div>
            </div>
          </div>
        )}
        
        {/* Marcador personalizado */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: 10 }}
        >
          <div className={`p-3 rounded-full shadow-lg ${
            modoSelecao ? 'animate-bounce bg-red-500' : 'bg-blue-500'
          }`}>
            <span className="text-white text-lg">📍</span>
          </div>
        </div>

        {/* Controles do mapa */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button 
            onClick={zoomIn}
            className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            title="Zoom in"
          >
            ➕
          </button>
          <button 
            onClick={zoomOut}
            className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            title="Zoom out"
          >
            ➖
          </button>
        </div>

        {/* Indicador de coordenadas */}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          {coordenadas.lat.toFixed(4)}, {coordenadas.lng.toFixed(4)}
        </div>
      </div>

      {modoSelecao && (
        <div className="mt-2 text-xs text-gray-600 bg-gray-100 p-2 rounded">
          <strong>Coordenadas selecionadas:</strong><br />
          Latitude: {coordenadas.lat.toFixed(6)}<br />
          Longitude: {coordenadas.lng.toFixed(6)}
        </div>
      )}

      {/* Botão para abrir no Google Maps */}
      <button
        onClick={() => {
          const url = `https://www.google.com/maps?q=${coordenadas.lat},${coordenadas.lng}`;
          window.open(url, '_blank');
        }}
        className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
      >
        🗺️ Abrir no Google Maps
      </button>
    </div>
  );
}

// Componente do Card de Lugares CORRIGIDO
function CardLugares() {
  const [lugares, setLugares] = useState(() => {
    const salvos = localStorage.getItem('lugaresApp');
    return salvos ? JSON.parse(salvos) : lugaresIniciais;
  });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoMapa, setModoMapa] = useState('visualizar');
  const [lugarSelecionado, setLugarSelecionado] = useState(lugaresIniciais[0] || null);
  const [novoLugar, setNovoLugar] = useState({ 
    nome: '', 
    endereco: '', 
    nota: '',
    lat: -23.5505,
    lng: -46.6333
  });

  useEffect(() => {
    localStorage.setItem('lugaresApp', JSON.stringify(lugares));
  }, [lugares]);

  // Selecionar primeiro lugar por padrão
  useEffect(() => {
    if (lugares.length > 0 && !lugarSelecionado) {
      setLugarSelecionado(lugares[0]);
    }
  }, [lugares, lugarSelecionado]);

  const handleSelecionarNoMapa = (coordenadas) => {
    setNovoLugar(prev => ({
      ...prev,
      lat: coordenadas.lat,
      lng: coordenadas.lng
    }));
  };

  const adicionarLugar = () => {
    if (novoLugar.nome.trim() !== '') {
      const novoLugarCompleto = {
        id: Date.now(),
        ...novoLugar,
        nome: novoLugar.nome.trim(),
        endereco: novoLugar.endereco.trim() || `Local em ${novoLugar.lat.toFixed(4)}, ${novoLugar.lng.toFixed(4)}`,
        tipo: 'personalizado',
        nota: novoLugar.nota.trim() || 'Lugar especial para nós'
      };

      const novosLugares = [...lugares, novoLugarCompleto];
      setLugares(novosLugares);
      setLugarSelecionado(novoLugarCompleto);
      setNovoLugar({ nome: '', endereco: '', nota: '', lat: -23.5505, lng: -46.6333 });
      setModoMapa('visualizar');
      setMostrarForm(false);
    }
  };

  const abrirNoGoogleMaps = (lugar) => {
    const url = `https://www.google.com/maps?q=${lugar.lat},${lugar.lng}`;
    window.open(url, '_blank');
  };

  const removerLugar = (id, e) => {
    e.stopPropagation();
    const novosLugares = lugares.filter(lugar => lugar.id !== id);
    setLugares(novosLugares);
    
    if (lugarSelecionado?.id === id) {
      setLugarSelecionado(novosLugares[0] || null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-gray-800">Lugares para conhecer 🌍</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setMostrarForm(!mostrarForm);
              setModoMapa(mostrarForm ? 'visualizar' : 'adicionar');
              if (!mostrarForm) {
                setNovoLugar({ 
                  nome: '', 
                  endereco: '', 
                  nota: '', 
                  lat: lugarSelecionado?.lat || -23.5505, 
                  lng: lugarSelecionado?.lng || -46.6333 
                });
              }
            }}
            className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors"
          >
            {mostrarForm ? 'Cancelar' : '+ Lugar'}
          </button>
        </div>
      </div>

      {/* Modo Adicionar Lugar */}
      {mostrarForm && (
        <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">📍 Adicionar Novo Lugar</h3>
          
          <div className="grid gap-3 mb-3">
            <div>
              <label className="text-sm text-green-700 mb-1 block">Nome do lugar</label>
              <input
                type="text"
                value={novoLugar.nome}
                onChange={(e) => setNovoLugar({ ...novoLugar, nome: e.target.value })}
                placeholder="Ex: Café Romântico, Parque Legal..."
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
           
            <div>
              <label className="text-sm text-green-700 mb-1 block">Por que vamos gostar daqui?</label>
              <textarea
                value={novoLugar.nota}
                onChange={(e) => setNovoLugar({ ...novoLugar, nota: e.target.value })}
                placeholder="Ex: Vista incrível, comida deliciosa..."
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                rows="2"
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-green-700">🗺️ Selecionar no Mapa:</span>
              <button
                onClick={() => setModoMapa(mode => mode === 'adicionar' ? 'visualizar' : 'adicionar')}
                className={`text-xs px-3 py-1 rounded font-medium ${
                  modoMapa === 'adicionar' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {modoMapa === 'adicionar' ? '🖱️ Clique para selecionar' : '👀 Modo visualização'}
              </button>
            </div>
            
            <MapaInterativo 
              onSelecionarLocal={handleSelecionarNoMapa}
              modoSelecao={modoMapa === 'adicionar'}
              localSelecionado={novoLugar}
            />
          </div>

          <button
            onClick={adicionarLugar}
            disabled={!novoLugar.nome.trim()}
            className={`w-full py-2 rounded-lg font-medium transition-colors ${
              novoLugar.nome.trim() 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            ✅ Adicionar Lugar
          </button>
        </div>
      )}

      {/* Mapa Principal para Visualização */}
      {!mostrarForm && (
        <div className="mb-4">
          <MapaInterativo 
            localSelecionado={lugarSelecionado}
            modoSelecao={false}
          />
        </div>
      )}

      {/* Lista de Lugares */}
      <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
        {lugares.map((lugar) => (
          <div 
            key={lugar.id} 
            className={`flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 transition-colors cursor-pointer ${
              lugarSelecionado?.id === lugar.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
            }`}
            onClick={() => setLugarSelecionado(lugar)}
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-xl">
                {lugar.tipo === 'restaurante' ? '🍽️' : 
                 lugar.tipo === 'diversao' ? '🎢' : 
                 lugar.tipo === 'cultura' ? '🎭' : '📍'}
              </span>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-800">{lugar.nome}</div>
                <div className="text-xs text-gray-500">{lugar.endereco}</div>
                {lugar.nota && (
                  <div className="text-xs text-blue-600 mt-1">💡 {lugar.nota}</div>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  abrirNoGoogleMaps(lugar);
                }}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Abrir no Google Maps"
              >
                🗺️
              </button>
              <button
                onClick={(e) => removerLugar(lugar.id, e)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remover lugar"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {lugares.length === 0 && (
        <div className="text-center text-gray-500 text-sm py-8 border border-gray-200 rounded-lg">
          <div className="text-4xl mb-2">🌎</div>
          <div>Nenhum lugar adicionado ainda.</div>
          <div>Clique em "+ Lugar" para começar a explorar!</div>
        </div>
      )}
    </div>
  );
}


// Componente do Menu Principal
function MenuPrincipal({ onSelecionarCard, cardAtivo }) {
  const opcoesMenu = [
    { id: 'imagens', icone: '📸', label: 'Fotos' },
    { id: 'mensagens', icone: '💌', label: 'Mensagens' },
    { id: 'contagem', icone: '💫', label: 'Tempo Juntos' },
    { id: 'playlist', icone: '🎶', label: 'Playlist' },
    { id: 'lugares', icone: '🌍', label: 'Lugares' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 mb-4">
      <div className="flex justify-between gap-1">
        {opcoesMenu.map((opcao) => (
          <button
            key={opcao.id}
            onClick={() => onSelecionarCard(opcao.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-md flex-1 transition-all ${
              cardAtivo === opcao.id 
                ? 'bg-pink-50 text-pink-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{opcao.icone}</span>
            <span className="text-xs mt-1">{opcao.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Componente Principal do App
function AppPrincipal({ onVoltarParaContagem }) {
  const [cardAtivo, setCardAtivo] = useState('imagens');

  const renderizarCardAtivo = () => {
    switch (cardAtivo) {
      case 'imagens':
        return <CardImagens />;
      case 'mensagens':
        return <CardMensagens />;
      case 'contagem':
        return <ContadorTempoClean />;
      case 'playlist':
        return <CardPlaylist />;
      case 'lugares':
        return <CardLugares />;
      default:
        return <CardImagens />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100 p-4 font-sans">
      <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-xl w-full max-w-lg p-5 flex flex-col gap-6">

        {/* Botão voltar para a contagem regressiva */}
        <button 
          onClick={onVoltarParaContagem}
          className="self-start text-pink-600 hover:text-pink-700 text-sm flex items-center transition-colors"
        >
          ‹ Voltar para a contagem
        </button>

        {/* Menu Principal */}
        <MenuPrincipal onSelecionarCard={setCardAtivo} cardAtivo={cardAtivo} />

        {/* Card Ativo */}
        {renderizarCardAtivo()}
      </div>
    </div>
  );
}

// Componente do Card de Saudade (Contagem Regressiva)
function CardSaudade({ onVerConteudoPrincipal }) {
  const [tempoRestante, setTempoRestante] = useState({});
  const [atividadeAtual, setAtividadeAtual] = useState(0);

  const dataReencontro = new Date('2025-12-05 19:00:00');

  useEffect(() => {
    const calcularTempoRestante = () => {
      const agora = new Date();
      const diferenca = dataReencontro - agora;

      if (diferenca <= 0) {
        setTempoRestante({ reencontro: true });
        return;
      }

      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

      setTempoRestante({ dias, horas, minutos, segundos, reencontro: false });
    };

    calcularTempoRestante();
    const intervalo = setInterval(calcularTempoRestante, 1000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const intervaloAtividades = setInterval(() => {
      setAtividadeAtual(prev => (prev + 1) % atividadesSaudade.length);
    }, 15000);

    return () => clearInterval(intervaloAtividades);
  }, []);

  if (tempoRestante.reencontro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 to-purple-500 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">O dia chegou!</h1>
          <p className="text-gray-600 mb-6">Já posso te ver! Estou tão animado(a)!</p>
          <button
            onClick={onVerConteudoPrincipal}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            Ver Nossas Memórias 💖
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">💕</div>
          <h1 className="text-xl font-bold text-gray-800">Contagem para te ver!</h1>
        </div>

        {/* Contagem Regressiva */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-4 mb-6 border border-pink-100">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-2xl font-light text-gray-900">{tempoRestante.dias || 0}</div>
              <div className="text-xs text-gray-500">Dias</div>
            </div>
            <div>
              <div className="text-2xl font-light text-gray-900">{tempoRestante.horas || 0}</div>
              <div className="text-xs text-gray-500">Horas</div>
            </div>
            <div>
              <div className="text-2xl font-light text-gray-900">{tempoRestante.minutos || 0}</div>
              <div className="text-xs text-gray-500">Minutos</div>
            </div>
            <div>
              <div className="text-2xl font-light text-gray-900">{tempoRestante.segundos || 0}</div>
              <div className="text-xs text-gray-500">Segundos</div>
            </div>
          </div>
        </div>

        {/* Atividade para Matar Saudade */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="bg-pink-100 text-pink-600 rounded-full p-2 text-sm">💡</div>
            <div>
              <h3 className="font-medium text-gray-800">{atividadesSaudade[atividadeAtual].titulo}</h3>
              <p className="text-sm text-gray-600 mt-1">{atividadesSaudade[atividadeAtual].descricao}</p>
            </div>
          </div>
        </div>

        {/* Indicador de Atividades */}
        <div className="flex justify-center space-x-1 mb-4">
          {atividadesSaudade.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-1 rounded-full transition-all ${
                index === atividadeAtual ? 'bg-pink-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Botão para ver conteúdo principal */}
        <button
          onClick={onVerConteudoPrincipal}
          className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
        >
          Ver Nossas Memórias Antes do Tempo ›
        </button>
      </div>
    </div>
  );
}

// Componente App Principal
export default function App() {
  const [mostrarPrincipal, setMostrarPrincipal] = useState(false);

  if (!mostrarPrincipal) {
    return <CardSaudade onVerConteudoPrincipal={() => setMostrarPrincipal(true)} />;
  }

  return <AppPrincipal onVoltarParaContagem={() => setMostrarPrincipal(false)} />;
}