import React, { useState, useEffect } from "react";

const mensagensIniciais = [
  "Você é a melhor parte do meu dia ",
  "Eu sou muito grato por ter você na minha vida ",
  "Cada momento com você é especial",
  "Tenho muito orgulho de Você",
  "Você torna tudo muito especial",
  "Te amo muito, obrigado por tudo!",

];

const fotos = [
  "/fotos/foto1.jpeg",
  "/fotos/foto2.jpeg",
  "/fotos/foto4.jpeg",
  "/fotos/foto5.jpeg",
  "/fotos/foto6.jpeg",
  "/fotos/foto7.jpeg",
];

export default function App() {
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
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1.5 shadow"
            >
              ◀
            </button>
            <button
              onClick={proximaFoto}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1.5 shadow"
            >
              ▶
            </button>
          </div>
        </div>

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
          <p className="text-xs text-gray-500 mb-2">Canções que marcaram nossa história.</p>
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
