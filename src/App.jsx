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

// Mensagens e fotos existentes
const mensagensIniciais = [
  "Você é a melhor parte do meu dia",
  "Eu sou muito grato por ter você na minha vida",
  "Cada momento com você é especial",
  "Tenho muito orgulho de Você",
  "Você torna tudo muito especial",
  "Te amo muito, obrigado por tudo!",
  "Você me inspira a ser uma pessoa melhor todos os dias",
  "Você é a melhor escolha que eu ja fiz",
  "Tudo faz sentido quando estou com você"
];

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

// Componente do Contador de Tempo Juntos
function ContadorTempoClean() {
  const [tempoJuntos, setTempoJuntos] = useState({ dias: 0, meses: 0, anos: 0 });

  useEffect(() => {
    // Altere para a data real do início do relacionamento
    const dataInicio = new Date('2025-02-07'); // 📅 AJUSTE AQUI
    
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

// Componente do Card de Saudade
function CardSaudade({ onVerConteudoPrincipal }) {
  const [tempoRestante, setTempoRestante] = useState({});
  const [atividadeAtual, setAtividadeAtual] = useState(0);

  // ⚠️ ALTERE PARA A PRÓXIMA DATA QUE VOCÊS VÃO SE VER
  const dataReencontro = new Date('2025-12-05 19:00:00'); // 📅 AJUSTE AQUI

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

// Componente Principal do App
function AppPrincipal({ onVoltarParaContagem }) {
  const [mensagemAtual, setMensagemAtual] = useState(0);
  const [fotoAtual, setFotoAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setMensagemAtual((prev) => (prev + 1) % mensagensIniciais.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, []);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100 p-4 font-sans">
      <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-xl w-full max-w-lg p-5 flex flex-col gap-6">

        {/* Botão voltar para a contagem regressiva */}
        <button 
          onClick={onVoltarParaContagem}
          className="self-start text-pink-600 hover:text-pink-700 text-sm flex items-center transition-colors"
        >
          ‹ Voltar para a contagem
        </button>

        {/* Fotos */}
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
          </div>
        </div>

        {/* Contador de Tempo Juntos */}
        <ContadorTempoClean />

        {/* Mensagem atual */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-1">De mim pra você 💌</h2>
          <div
            key={mensagemAtual}
            className="p-3 border border-gray-200 bg-white rounded-lg text-center text-gray-700 text-base md:text-lg font-medium shadow-sm transition-opacity duration-700 ease-in-out"
          >
            {mensagensIniciais[mensagemAtual]}
          </div>
        </div>

        {/* Playlist */}
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