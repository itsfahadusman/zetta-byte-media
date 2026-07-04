"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const PAIR_COUNT = 8;

function buildDeck() {
  const values = Array.from({ length: PAIR_COUNT }, (_, i) => i);
  const deck = [...values, ...values]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item, index) => ({ id: index, value: item.value }));
  return deck;
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function ZettaArcadePage() {
  const [tiles, setTiles] = useState(() => buildDeck());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [scores, setScores] = useState([]);
  const [message, setMessage] = useState(
    "Match all 8 Zetta node pairs. Click two tiles to reveal."
  );
  const lockRef = useRef(false);

  // Timer
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const newGame = useCallback(() => {
    setTiles(buildDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setSeconds(0);
    setRunning(true);
    lockRef.current = false;
    setMessage("Match all 8 Zetta node pairs. Click two tiles to reveal.");
  }, []);

  const resetScores = () => setScores([]);

  const handleTileClick = (id) => {
    if (lockRef.current) return;
    if (flipped.includes(id) || matched.includes(id)) return;
    if (flipped.length === 2) return;

    const next = [...flipped, id];
    setFlipped(next);

    if (next.length === 2) {
      lockRef.current = true;
      setMoves((m) => m + 1);

      const [firstId, secondId] = next;
      const first = tiles.find((t) => t.id === firstId);
      const second = tiles.find((t) => t.id === secondId);

      if (first.value === second.value) {
        setTimeout(() => {
          setMatched((prev) => {
            const updated = [...prev, firstId, secondId];
            if (updated.length === PAIR_COUNT * 2) {
              setRunning(false);
              setMessage(
                `All 8 nodes matched — ${moves + 1} moves in ${formatTime(seconds)}.`
              );
              setScores((prevScores) =>
                [...prevScores, { moves: moves + 1, time: seconds }]
                  .sort((a, b) => a.time - b.time || a.moves - b.moves)
                  .slice(0, 5)
              );
            }
            return updated;
          });
          setFlipped([]);
          lockRef.current = false;
        }, 350);
      } else {
        setTimeout(() => {
          setFlipped([]);
          lockRef.current = false;
        }, 800);
      }
    }
  };

  const isFaceUp = (id) => flipped.includes(id) || matched.includes(id);

  return (
    <>
      <style>{`
        :root {
          --zb-bg: #0a0e17;
          --zb-panel: #121a2b;
          --zb-border: rgba(148, 163, 184, 0.15);
          --zb-cyan: #22D3EE;
          --zb-purple: #A855F7;
          --zb-text: #E5E7EB;
          --zb-muted: #7C8798;
          --zb-muted-2: #4B5567;
        }

        .arcade-page {
          min-height: 100dvh;
          background: var(--zb-bg);
          color: var(--zb-text);
          padding: 0 0 2.5rem;
          font-family: "Inter", sans-serif;
        }

        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        @media (max-width: 600px) {
          .wrap { padding: 0 1.25rem; }
        }

        .module-head { padding: 1.5rem 0 1.25rem; }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, monospace;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--zb-purple);
          margin-bottom: 0.7rem;
        }
        .eyebrow .dash {
          color: var(--zb-cyan);
          font-weight: 700;
        }

        .section-title {
          font-family: var(--font-display), "Space Grotesk", sans-serif;
          font-size: clamp(1.6rem, 3.4vw, 2.4rem);
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .divider {
          border: none;
          height: 1px;
          background: var(--zb-border);
          margin: 0 auto;
          max-width: 1200px;
        }

        .module-body { padding-top: 1.5rem; }

        .arcade-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .arcade-layout { grid-template-columns: 1fr; }
        }

        .game-frame {
          background: var(--zb-panel);
          border: 1px solid var(--zb-border);
          border-radius: 16px;
          padding: 1.75rem;
        }

        .game-hud {
          display: flex;
          justify-content: space-between;
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, monospace;
          font-size: 0.85rem;
          color: var(--zb-muted);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .game-hud b {
          color: var(--zb-purple);
          font-weight: 700;
        }

        .game-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.9rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .tile {
          appearance: none;
          aspect-ratio: 1 / 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--zb-border);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
          padding: 0;
        }
        .tile:hover:not(.is-matched) {
          border-color: var(--zb-muted-2);
          background: rgba(255, 255, 255, 0.035);
        }
        .tile-face-down {
          font-family: var(--font-display), "Space Grotesk", sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700;
          font-style: italic;
          transform: skewX(-6deg);
          color: var(--zb-muted-2);
          opacity: 0.6;
          user-select: none;
        }
        .tile.is-flipped {
          border-color: var(--zb-cyan);
          background: rgba(34, 211, 238, 0.06);
        }
        .tile.is-matched {
          border-color: var(--zb-purple);
          background: rgba(168, 85, 247, 0.08);
          cursor: default;
        }
        .tile-face-up {
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, monospace;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .game-controls {
          display: flex;
          justify-content: center;
          gap: 0.9rem;
          margin-top: 1.75rem;
          flex-wrap: wrap;
        }

        .btn-arcade {
          appearance: none;
          border: none;
          cursor: pointer;
          padding: 0.75rem 1.6rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: 0.02em;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          color: #05060a;
          transition: transform 0.2s, filter 0.2s;
        }
        .btn-arcade:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
        }
        .btn-arcade.secondary {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--zb-border);
          color: var(--zb-text);
        }
        .btn-arcade.secondary:hover {
          border-color: var(--zb-muted-2);
          filter: none;
        }

        .game-msg {
          text-align: center;
          margin: 1.25rem 0 0;
          font-size: 0.85rem;
          color: var(--zb-purple);
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, monospace;
        }

        .panel {
          background: var(--zb-panel);
          border: 1px solid var(--zb-border);
          border-radius: 16px;
          padding: 1.75rem;
        }
        .score-panel h4 {
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, monospace;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ffffff;
          margin: 0 0 1.1rem;
        }
        .score-list p {
          font-size: 0.85rem;
          color: var(--zb-muted);
          margin: 0;
        }
        .score-row {
          display: flex;
          justify-content: space-between;
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, monospace;
          font-size: 0.82rem;
          color: var(--zb-text);
          padding: 0.55rem 0;
          border-bottom: 1px solid var(--zb-border);
        }
        .score-row:last-child { border-bottom: none; }
        .score-row b { color: var(--zb-cyan); }
        .score-note {
          font-size: 0.68rem;
          color: var(--zb-muted-2);
          margin-top: 0.9rem;
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, monospace;
        }

        /* ── WhatsApp float ── */
        .whatsapp-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--zb-cyan), var(--zb-purple));
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(168,85,247,0.35);
          z-index: 200;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .whatsapp-float:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 14px 36px rgba(34,211,238,0.4);
        }
        .whatsapp-float svg { width: 28px; height: 28px; }
      `}</style>

      <div className="arcade-page">
        <div className="wrap module-head">
          <div className="eyebrow">
            <span className="dash">—</span> GAMES
          </div>
          <h1 className="section-title">
            Zetta Arcade — Matrix Match Session Game
          </h1>
        </div>

        <hr className="divider" />

        <div className="wrap module-body">
          <div className="arcade-layout">
            <div className="game-frame">
              <div className="game-hud">
                <div>
                  MOVES: <b>{moves}</b>
                </div>
                <div>
                  MATCHES: <b>{matched.length / 2}</b>/{PAIR_COUNT}
                </div>
                <div>
                  TIME: <b>{formatTime(seconds)}</b>
                </div>
              </div>

              <div className="game-grid">
                {tiles.map((tile) => {
                  const faceUp = isFaceUp(tile.id);
                  const isMatchedTile = matched.includes(tile.id);
                  return (
                    <button
                      key={tile.id}
                      type="button"
                      className={`tile ${faceUp ? "is-flipped" : ""} ${isMatchedTile ? "is-matched" : ""
                        }`}
                      onClick={() => handleTileClick(tile.id)}
                      aria-label={faceUp ? `Node ${tile.value + 1}` : "Hidden node"}
                    >
                      {faceUp ? (
                        <span
                          className="tile-face-up"
                          style={{
                            color: tile.value % 2 === 0 ? "var(--zb-cyan)" : "var(--zb-purple)",
                          }}
                        >
                          N{String(tile.value + 1).padStart(2, "0")}
                        </span>
                      ) : (
                        <span className="tile-face-down">Z</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="game-controls">
                <button className="btn-arcade" onClick={newGame}>
                  New Grid
                </button>
                <button className="btn-arcade secondary" onClick={resetScores}>
                  Reset Session Scores
                </button>
              </div>

              <p className="game-msg">{message}</p>
            </div>

            <div className="panel score-panel">
              <h4>Session High Scores</h4>
              <div className="score-list">
                {scores.length === 0 ? (
                  <p>No runs yet this session.</p>
                ) : (
                  scores.map((entry, i) => (
                    <div className="score-row" key={i}>
                      <span>#{i + 1}</span>
                      <span>
                        <b>{entry.moves}</b> moves
                      </span>
                      <span>{formatTime(entry.time)}</span>
                    </div>
                  ))
                )}
              </div>
              <p className="score-note">Stored in-session (resets on reload)</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating WhatsApp contact button (Zetta Arcade theme) ── */}
      <a
        className="whatsapp-float"
        href="https://wa.me/971500000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 3C9.4 3 4 8.4 4 15c0 2.2.6 4.3 1.7 6.1L4 29l8.1-1.6c1.7.9 3.7 1.4 5.9 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3Z"
            fill="#05060a"
          />
          <path
            d="M22.4 18.8c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4Z"
            fill="url(#wagrad)"
          />
          <defs>
            <linearGradient id="wagrad" x1="8" y1="10" x2="24" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22D3EE" />
              <stop offset="1" stopColor="#A855F7" />
            </linearGradient>
          </defs>
        </svg>
      </a>
    </>
  );
}