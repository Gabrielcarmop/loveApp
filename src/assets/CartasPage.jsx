import React, { useState, useEffect, useRef } from "react";

// ============================================================
// DADOS DAS CARTAS — edite as mensagens aqui!
// ============================================================
const cartas = [
  {
    id: 1,
    mensagem: "Eu sei que a distância às vezes dói. Mas eu quero que você saiba que eu sempre vou estar aqui, pra te apoiar e te ajudar em tudo que eu puder. Eu tenho certeza de que, lá na frente, a gente vai olhar pra trás e perceber que tudo valeu a pena.",
    de: "Amoreco do Buteco"
  },
  {
    id: 2,
    mensagem: "Às vezes eu queria que você conseguisse sentir o quanto você me faz bem. Porque é incrível como você transforma qualquer momento em algo especial. Eu amo o seu jeito, suas palhaçadas… e amo ainda mais você.",
    de: "Amoreco do Buteco"
  },
  {
    id: 3,
    mensagem: "Você é a pessoa mais linda, inteligente, carinhosa e dedicada que eu conheço. E eu tenho muito orgulho de ser o seu maior fã.",
    de: "Amoreco do Buteco"
  },
  {
    id: 4,
    mensagem: "CASA COMIGO LOGOOOOOOOO",
    de: "Amoreco do Buteco"
  },
  {
    id: 5,
    mensagem: "Eu não vejo a hora de estar aí com você, de poder sentir o seu cheiro, o seu beijo e te ter pertinho de mim. Eu te amo muito.",
    de: "Amoreco do Buteco"
  },
  {
    id: 6,
    mensagem: "Você sabia que quando você manda áudio, meu dia inteiro fica melhor? Ou que eu releio nossas conversas às vezes só porque me faz bem? Você me faz feliz de um jeito que eu não sabia que era possível.",
    de: "Amoreco do Buteco"
  },
  {
    id: 7,
    mensagem: "Você é tão linda, mesmo com a cara de cavalo e com aquele efeito horrivel",
    de: "Amoreco do Buteco"
  },
  {
    id: 8,
    mensagem: "Quando eu penso no nosso futuro, eu fico animado demais. Eu não vejo a hora de termos a nossa casa, o nosso salsicha, a Maitê e o Toinn… nossa vidinha juntos.",
    de: "Amoreco do Buteco"
  },
  {
    id: 9,
    mensagem: "Não precisa de motivo especial pra eu te dizer que você é a melhor pessoa que eu já conheci. Que eu me sinto em casa quando estou com você. Que o mundo faz mais sentido com você nele.",
    de: "Amoreco do Buteco"
  },
  {
    id: 10,
    mensagem: "Quem tem a sorte de te conhecer sabe o quanto você é especial e capaz de tudo que quiser. E quando os dias ficarem difíceis, lembra: você não está sozinha. Sempre vai ter alguém ao seu lado pra te ajudar.",
    de: "Amoreco do Buteco"
  },
  {
    id: 11,
    mensagem: "De 0 a 10, eu te amo 10!, amoreca do buteco.",
    de: "Amoreco do Buteco"
  },
  {
    id: 12,
    mensagem: "O tempo passa e eu sou cada vez mais seu!",
    de: "Amoreco do Buteco"
  },
];

// Helper seguro para localStorage
function getLocalStorage(key, fallback) {
  try {
    if (typeof window === "undefined") return fallback;
    const s = window.localStorage.getItem(key);
    return s ? JSON.parse(s) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalStorage(key, value) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch {}
}

// ============================================================
// SVG ENVELOPE COMPONENT
// ============================================================
function EnvelopeSVG({ aberto, hover }) {
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      {/* Sombra */}
      <ellipse cx="100" cy="138" rx="72" ry="7" fill="rgba(180,60,80,0.13)" />

      {/* Corpo do envelope */}
      <rect x="10" y="30" width="180" height="100" rx="8" fill="white"
        stroke="#e8c0c8" strokeWidth="1.5"
        filter="url(#envShadow)"
      />

      {/* Triângulos laterais internos */}
      <polygon points="10,30 10,130 85,80" fill="#fdf0f3" stroke="#f0d0d8" strokeWidth="1" />
      <polygon points="190,30 190,130 115,80" fill="#fdf0f3" stroke="#f0d0d8" strokeWidth="1" />
      {/* Triângulo inferior */}
      <polygon points="10,130 190,130 100,72" fill="#fce8ee" stroke="#f0c8d0" strokeWidth="1" />

      {/* Tampa (flap) — animada */}
      <g
        style={{
          transformOrigin: "100px 30px",
          transform: hover || aberto ? "rotateX(170deg)" : "rotateX(0deg)",
          transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <polygon
          points="10,30 190,30 100,95"
          fill={hover || aberto ? "#fff0f3" : "white"}
          stroke="#e8c0c8"
          strokeWidth="1.5"
        />
        {/* Linhas de detalhe na tampa */}
        <line x1="55" y1="52" x2="100" y2="83" stroke="#f5d0d8" strokeWidth="0.8" strokeDasharray="3,3" />
        <line x1="145" y1="52" x2="100" y2="83" stroke="#f5d0d8" strokeWidth="0.8" strokeDasharray="3,3" />
      </g>

      {/* Lacre coração */}
      <g style={{
        transform: hover ? "scale(1.15)" : "scale(1)",
        transformOrigin: "100px 82px",
        transition: "transform 0.3s ease",
      }}>
        {/* Círculo do lacre */}
        <circle cx="100" cy="82" r="16" fill="white" stroke="#e8c0c8" strokeWidth="1.5"
          filter="url(#heartGlow)"
        />
        {/* Coração SVG */}
        <path
          d="M100 91 C100 91 83 79 83 70.5 C83 65.5 87.5 62 92 64 C95 65.2 100 69 100 69 C100 69 105 65.2 108 64 C112.5 62 117 65.5 117 70.5 C117 79 100 91 100 91 Z"
          fill="#e8293a"
          style={{
            filter: hover ? "drop-shadow(0 0 4px rgba(232,41,58,0.6))" : "none",
            transition: "filter 0.3s ease",
          }}
        />
      </g>

      {/* Filtros */}
      <defs>
        <filter id="envShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#e8a0b0" floodOpacity="0.25" />
        </filter>
        <filter id="heartGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#e8293a" floodOpacity="0.2" />
        </filter>
      </defs>
    </svg>
  );
}

// ============================================================
// MODAL DA CARTA
// ============================================================
function ModalCarta({ carta, onFechar }) {
  const [fase, setFase] = useState(0);

  useEffect(() => {
    if (!carta) return;
    const t1 = setTimeout(() => setFase(1), 60);
    const t2 = setTimeout(() => setFase(2), 700);
    const t3 = setTimeout(() => setFase(3), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [carta]);

  const handleFechar = () => {
    setFase(0);
    setTimeout(onFechar, 350);
  };

  if (!carta) return null;

  return (
    <>
      <style>{`
        .modal-bg {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(60, 10, 20, 0.55);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          opacity: 0; transition: opacity 0.35s ease;
        }
        .modal-bg.show { opacity: 1; }

        .modal-box {
          width: 100%; max-width: 440px;
          max-height: 92vh; overflow-y: auto;
          transform: scale(0.85) translateY(24px);
          transition: transform 0.4s cubic-bezier(0.34,1.4,0.64,1);
          display: flex; flex-direction: column; align-items: center; gap: 0;
        }
        .modal-box.show { transform: scale(1) translateY(0); }

        .modal-env-wrap {
          width: 260px; height: 182px; position: relative; flex-shrink: 0;
        }

        .papel-wrap {
          width: calc(100% - 32px); max-width: 408px;
          background: #fffbfc;
          border: 1.5px solid #f0d8de;
          border-radius: 0 0 18px 18px;
          border-top: none;
          box-shadow: 0 8px 32px rgba(180,60,80,0.13);
          padding: 28px 28px 24px;
          font-family: 'Lora', serif;
          transform: translateY(-60px); opacity: 0;
          transition: transform 0.5s cubic-bezier(0.34,1.2,0.64,1), opacity 0.4s ease;
          position: relative; z-index: 1;
        }
        .papel-wrap.saindo { transform: translateY(-20px); opacity: 1; }
        .papel-wrap.aberto { transform: translateY(0); opacity: 1; }

        .papel-topo {
          display: flex; flex-direction: column; align-items: center;
          margin-bottom: 18px;
        }
        .papel-coracao { font-size: 28px; margin-bottom: 6px; }
        .papel-titulo {
          font-size: 17px; font-weight: 600; color: #8b1a2a;
          text-align: center; line-height: 1.35; margin: 0;
          font-family: 'Lora', serif;
        }
        .papel-divider {
          width: 48px; height: 2px; background: #e8293a;
          border-radius: 2px; margin: 12px auto 0; opacity: 0.5;
        }

        .papel-texto {
          font-size: 15px; line-height: 1.8; color: #5a3040;
          font-style: italic; margin: 0 0 20px 0;
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
        }
        .papel-texto.show { opacity: 1; transform: translateY(0); }

        .papel-assinatura {
          text-align: right; font-size: 13px; color: #c04060;
          font-weight: 600; opacity: 0;
          transition: opacity 0.4s ease 0.4s;
        }
        .papel-assinatura.show { opacity: 1; }

        .papel-linhas {
          position: absolute; inset: 70px 28px 28px;
          background-image: repeating-linear-gradient(
            to bottom,
            transparent, transparent 27px,
            #fde8ee 28px
          );
          pointer-events: none; border-radius: 0 0 10px 10px;
          opacity: 0.4;
        }

        .btn-fechar {
          margin-top: 16px; background: white;
          border: 2px solid #e8293a; color: #e8293a;
          border-radius: 30px; padding: 9px 28px;
          font-size: 13px; font-weight: 700;
          font-family: 'Nunito', sans-serif;
          cursor: pointer; letter-spacing: 0.03em;
          transition: all 0.2s ease; flex-shrink: 0;
          box-shadow: 0 2px 12px rgba(232,41,58,0.15);
        }
        .btn-fechar:hover {
          background: #e8293a; color: white;
          box-shadow: 0 4px 18px rgba(232,41,58,0.35);
          transform: scale(1.04);
        }
      `}</style>

      <div className={`modal-bg ${fase >= 1 ? 'show' : ''}`} onClick={handleFechar}>
        <div className={`modal-box ${fase >= 1 ? 'show' : ''}`} onClick={e => e.stopPropagation()}>

          <div className="modal-env-wrap">
            <EnvelopeSVG aberto={fase >= 1} hover={fase >= 1} />
          </div>

          <div className={`papel-wrap ${fase === 2 ? 'saindo' : ''} ${fase >= 3 ? 'aberto' : ''}`}>
            <div className="papel-linhas" />

            <div className="papel-topo">
              <span className="papel-coracao">❤️</span>
              <h2 className="papel-titulo">{carta.titulo}</h2>
              <div className="papel-divider" />
            </div>

            <p className={`papel-texto ${fase >= 3 ? 'show' : ''}`}>
              {carta.mensagem}
            </p>

            <p className={`papel-assinatura ${fase >= 3 ? 'show' : ''}`}>
              — {carta.de} ♥
            </p>
          </div>

          <button className="btn-fechar" onClick={handleFechar}>
            ✕ &nbsp; Fechar carta
          </button>
        </div>
      </div>
    </>
  );
}

// ============================================================
// CARD ENVELOPE INDIVIDUAL
// ============================================================
function EnvelopeCard({ carta, index, onClick, aberta }) {
  const [hover, setHover] = useState(false);

  const rotacoes = [-2.5, 1.8, -1.2, 2.2, -0.8, 1.5, -2.1, 1.0, -1.7, 2.4, -0.5, 1.3];
  const rot = rotacoes[index % rotacoes.length];

  return (
    <button
      onClick={() => onClick(carta)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`Abrir carta: ${carta.titulo}`}
      style={{
        background: "none", border: "none", cursor: "pointer", padding: 0,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        animationDelay: `${index * 0.08}s`,
        transform: hover
          ? `rotate(0deg) translateY(-10px) scale(1.06)`
          : `rotate(${rot}deg) translateY(0) scale(1)`,
        transition: "transform 0.35s cubic-bezier(0.34,1.3,0.64,1)",
      }}
      className="env-card-anim"
    >
      <div style={{ width: 150, height: 105, position: "relative" }}>
        <EnvelopeSVG hover={hover} aberto={false} />

        {aberta && (
          <div style={{
            position: "absolute", top: -6, right: -6,
            background: "#e8293a", color: "white",
            borderRadius: "50%", width: 22, height: 22,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 900, boxShadow: "0 2px 8px rgba(232,41,58,0.4)",
            border: "2px solid white",
          }}>✓</div>
        )}
      </div>

      <p style={{
        fontFamily: "'Nunito', sans-serif",
        fontSize: 11, fontWeight: 700, color: hover ? "#8b1a2a" : "#b04060",
        textAlign: "center", maxWidth: 140, lineHeight: 1.35, margin: 0,
        transition: "color 0.2s ease",
        letterSpacing: "0.01em",
      }}>
        {carta.titulo}
      </p>
    </button>
  );
}

// ============================================================
// PÁGINA PRINCIPAL
// ============================================================
export default function CartasPage({ onVoltar }) {
  const [cartaSelecionada, setCartaSelecionada] = useState(null);
  const [cartasAbertas, setCartasAbertas] = useState([]);

  useEffect(() => {
    setCartasAbertas(getLocalStorage("cartasAbertas", []));
  }, []);

  const abrirCarta = (carta) => {
    setCartaSelecionada(carta);
    if (!cartasAbertas.includes(carta.id)) {
      const novas = [...cartasAbertas, carta.id];
      setCartasAbertas(novas);
      setLocalStorage("cartasAbertas", novas);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400;1,500&family=Nunito:wght@400;600;700;800&display=swap');

        * { box-sizing: border-box; }

        .cartas-page {
          min-height: 100vh;
          background: #ffffff;
          font-family: 'Nunito', sans-serif;
          padding-bottom: 60px;
        }

        .floating-hearts {
          position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
        }
        .fheart {
          position: absolute;
          font-size: var(--size);
          opacity: var(--op);
          animation: floatHeart var(--dur) ease-in-out infinite;
          animation-delay: var(--delay);
          left: var(--left);
          top: var(--top);
        }
        @keyframes floatHeart {
          0%, 100% { transform: translateY(0) rotate(var(--rot)); }
          50% { transform: translateY(-18px) rotate(calc(var(--rot) + 6deg)); }
        }

        .page-header {
          position: relative; z-index: 1;
          text-align: center;
          padding: 48px 20px 32px;
        }
        .page-header-icon {
          font-size: 44px;
          display: block; margin-bottom: 10px;
          animation: heartbeat 2s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.12); }
          60% { transform: scale(1.05); }
        }
        .page-titulo {
          font-family: 'Lora', serif;
          font-size: clamp(24px, 5vw, 34px);
          font-weight: 600; color: #8b1a2a;
          margin: 0 0 8px 0; letter-spacing: -0.02em;
        }
        .page-subtitulo {
          font-size: 14px; color: #c07080; font-weight: 600;
          margin: 0 0 16px 0; letter-spacing: 0.03em;
        }
        .page-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: white; border: 1.5px solid #f0c0cc;
          border-radius: 20px; padding: 5px 16px;
          font-size: 12px; color: #a03050; font-weight: 700;
          box-shadow: 0 2px 12px rgba(232,41,58,0.1);
        }

        .page-divider {
          display: flex; align-items: center; gap: 12px;
          max-width: 400px; margin: 0 auto 40px;
          padding: 0 20px;
        }
        .divider-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, #e8c0c8, transparent); }
        .divider-heart { color: #e8293a; font-size: 14px; }

        .env-grid {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 36px 24px;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (max-width: 480px) {
          .env-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px 16px;
            padding: 0 16px;
          }
        }

        .env-card-anim {
          opacity: 0;
          animation: envAppear 0.6s ease forwards;
        }
        @keyframes envAppear {
          from { opacity: 0; transform: translateY(22px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .btn-voltar {
          position: relative; z-index: 1;
          display: inline-flex; align-items: center; gap: 6px;
          background: none; border: none; cursor: pointer;
          color: #c04060; font-size: 13px; font-weight: 700;
          font-family: 'Nunito', sans-serif;
          padding: 12px 20px 0;
          transition: color 0.2s, transform 0.2s;
          letter-spacing: 0.02em;
        }
        .btn-voltar:hover { color: #8b1a2a; transform: translateX(-3px); }
      `}</style>

      <div className="cartas-page">

        <div className="floating-hearts">
          {[
            { size:"18px", op:0.12, dur:"6s", delay:"0s", left:"8%", top:"12%", rot:"-15deg" },
            { size:"12px", op:0.10, dur:"8s", delay:"1s", left:"22%", top:"65%", rot:"10deg" },
            { size:"22px", op:0.08, dur:"7s", delay:"2s", left:"78%", top:"18%", rot:"20deg" },
            { size:"14px", op:0.11, dur:"9s", delay:"0.5s", left:"90%", top:"55%", rot:"-8deg" },
            { size:"16px", op:0.09, dur:"6.5s", delay:"3s", left:"55%", top:"88%", rot:"5deg" },
            { size:"10px", op:0.13, dur:"10s", delay:"1.5s", left:"38%", top:"25%", rot:"-20deg" },
            { size:"20px", op:0.07, dur:"7.5s", delay:"4s", left:"65%", top:"40%", rot:"12deg" },
            { size:"13px", op:0.10, dur:"8.5s", delay:"2.5s", left:"5%", top:"75%", rot:"-5deg" },
          ].map((h, i) => (
            <div key={i} className="fheart" style={{
              "--size": h.size, "--op": h.op, "--dur": h.dur,
              "--delay": h.delay, "--left": h.left, "--top": h.top, "--rot": h.rot,
            }}>♥</div>
          ))}
        </div>

        {onVoltar && (
          <button className="btn-voltar" onClick={onVoltar}>
            ☰ &nbsp;Menu
          </button>
        )}

        <div className="page-header">
          <span className="page-header-icon">💌</span>
          <h1 className="page-titulo">Cartas para você</h1>
          <p className="page-subtitulo">Abra quando o coração precisar</p>
          <div className="page-badge">
            <span>❤️</span>
            {cartasAbertas.length} de {cartas.length} abertas
          </div>
        </div>

        <div className="page-divider">
          <div className="divider-line" />
          <span className="divider-heart">♥</span>
          <div className="divider-line" />
        </div>

        <div className="env-grid">
          {cartas.map((carta, index) => (
            <EnvelopeCard
              key={carta.id}
              carta={carta}
              index={index}
              onClick={abrirCarta}
              aberta={cartasAbertas.includes(carta.id)}
            />
          ))}
        </div>
      </div>

      <ModalCarta carta={cartaSelecionada} onFechar={() => setCartaSelecionada(null)} />
    </>
  );
}