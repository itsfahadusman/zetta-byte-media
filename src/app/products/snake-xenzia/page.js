"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/* ══════════════════════════════
   GAME CONFIG (kept identical to the original Tkinter version)
══════════════════════════════ */
const GAME_WIDTH = 700;
const GAME_HEIGHT = 700;
const SPACE_SIZE = 50;
const BODY_PARTS = 3;
const SNAKE_COLOR = "#00FF00";
const FOOD_COLOR = "#FF0000";
const BACKGROUND_COLOR = "#000000";

/* Speed presets (ms per tick) — lower = faster */
const SPEEDS = { low: 160, medium: 100, hard: 60 };

export default function SnakeXenziaPage() {
    const canvasRef = useRef(null);
    const directionRef = useRef("down");
    const snakeRef = useRef([]);
    const foodRef = useRef([0, 0]);
    const timeoutRef = useRef(null);

    const [score, setScore] = useState(0);
    const [speedKey, setSpeedKey] = useState("medium");
    const [gameState, setGameState] = useState("idle"); // idle | countdown | playing | gameover
    const [countdown, setCountdown] = useState(3);

    /* ── Drawing ── */
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Food
        const [fx, fy] = foodRef.current;
        ctx.fillStyle = FOOD_COLOR;
        ctx.beginPath();
        ctx.arc(fx + SPACE_SIZE / 2, fy + SPACE_SIZE / 2, SPACE_SIZE / 2, 0, Math.PI * 2);
        ctx.fill();

        // Snake
        ctx.fillStyle = SNAKE_COLOR;
        snakeRef.current.forEach(([x, y]) => {
            ctx.fillRect(x, y, SPACE_SIZE, SPACE_SIZE);
        });
    }, []);

    const drawGameOver = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "red";
        ctx.font = "bold 70px consolas, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("GAME OVER", GAME_WIDTH / 2, GAME_HEIGHT / 2);
    }, []);

    const spawnFood = useCallback(() => {
        const cols = GAME_WIDTH / SPACE_SIZE;
        const rows = GAME_HEIGHT / SPACE_SIZE;
        const x = Math.floor(Math.random() * cols) * SPACE_SIZE;
        const y = Math.floor(Math.random() * rows) * SPACE_SIZE;
        foodRef.current = [x, y];
    }, []);

    const checkCollisions = useCallback(() => {
        const [x, y] = snakeRef.current[0];
        if (x < 0 || x >= GAME_WIDTH) return true;
        if (y < 0 || y >= GAME_HEIGHT) return true;
        for (const part of snakeRef.current.slice(1)) {
            if (part[0] === x && part[1] === y) return true;
        }
        return false;
    }, []);

    /* ── Game tick (mirrors next_turn in the Python version) ── */
    const tick = useCallback(() => {
        let [x, y] = snakeRef.current[0];
        const direction = directionRef.current;

        if (direction === "up") y -= SPACE_SIZE;
        else if (direction === "down") y += SPACE_SIZE;
        else if (direction === "left") x -= SPACE_SIZE;
        else if (direction === "right") x += SPACE_SIZE;

        snakeRef.current = [[x, y], ...snakeRef.current];

        const [fx, fy] = foodRef.current;
        if (x === fx && y === fy) {
            setScore((s) => s + 1);
            spawnFood();
        } else {
            snakeRef.current = snakeRef.current.slice(0, -1);
        }

        draw();

        if (checkCollisions()) {
            setGameState("gameover");
            drawGameOver();
            return;
        }

        timeoutRef.current = setTimeout(tick, SPEEDS[speedKey]);
    }, [checkCollisions, draw, drawGameOver, spawnFood, speedKey]);

    /* ── Direction control (same reversal-lock rules as the original) ── */
    const changeDirection = useCallback((newDirection) => {
        const current = directionRef.current;
        if (newDirection === "left" && current !== "right") directionRef.current = "left";
        else if (newDirection === "right" && current !== "left") directionRef.current = "right";
        else if (newDirection === "up" && current !== "down") directionRef.current = "up";
        else if (newDirection === "down" && current !== "up") directionRef.current = "down";
    }, []);

    useEffect(() => {
        const handleKey = (e) => {
            if (gameState !== "playing") return;
            if (e.key === "ArrowLeft") changeDirection("left");
            else if (e.key === "ArrowRight") changeDirection("right");
            else if (e.key === "ArrowUp") changeDirection("up");
            else if (e.key === "ArrowDown") changeDirection("down");
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [gameState, changeDirection]);

    /* ── Start sequence: reset state, run 3-2-1 countdown, then begin ── */
    const startGame = () => {
        clearTimeout(timeoutRef.current);
        snakeRef.current = Array.from({ length: BODY_PARTS }, () => [0, 0]);
        directionRef.current = "down";
        spawnFood();
        setScore(0);
        draw();
        setGameState("countdown");
        setCountdown(3);
    };

    useEffect(() => {
        if (gameState !== "countdown") return;
        if (countdown === 0) {
            setGameState("playing");
            return;
        }
        const t = setTimeout(() => setCountdown((c) => c - 1), 700);
        return () => clearTimeout(t);
    }, [gameState, countdown]);

    useEffect(() => {
        if (gameState === "playing") {
            timeoutRef.current = setTimeout(tick, SPEEDS[speedKey]);
        }
        return () => clearTimeout(timeoutRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState]);

    // Initial blank canvas paint
    useEffect(() => {
        snakeRef.current = Array.from({ length: BODY_PARTS }, () => [0, 0]);
        spawnFood();
        draw();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <style>{`
        :root {
          --purple: #A855F7;
          --bg-dark: #05060a;
          --panel-bg: #0b0d14;
          --border: rgba(148, 163, 184, 0.1);
          --text: #E5E7EB;
          --muted: #7C8798;
          --font-mono: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        }

        .theme-arcade {
          background: var(--bg-dark);
          color: var(--text);
          min-height: 100dvh;
          font-family: var(--font-mono);
        }

        .wrap { max-width: 1000px; margin: 0 auto; padding: 0 2rem; }
        @media (max-width: 600px) { .wrap { padding: 0 1.25rem; } }

        .module-head {
          padding: 1.5rem 0 1.25rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 1.5rem;
        }
        .eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 0.7rem;
          color: var(--purple);
        }
        .eyebrow-dash {
          display: inline-block;
          width: 14px; height: 2px;
          background: var(--purple);
          border-radius: 2px;
        }
        .section-title {
          font-size: clamp(1.4rem, 2.6vw, 2rem);
          font-weight: 800;
          color: var(--text);
          margin: 0;
        }

        .module-body { padding-bottom: 2.5rem; }

        .game-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .score-label {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text);
          font-family: consolas, monospace;
        }

        .speed-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .speed-group span {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-right: 0.3rem;
        }
        .speed-btn {
          background: var(--panel-bg);
          border: 1px solid var(--border);
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.45rem 0.95rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .speed-btn.active {
          background: var(--purple);
          border-color: var(--purple);
          color: #0A0E1A;
        }
        .speed-btn:hover:not(.active) { background: rgba(255,255,255,0.06); color: var(--text); }
        .speed-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* ── Canvas stage ── */
        /* Scales to fit whichever is smaller: available width or available
           height, so the board always fits on screen without scrolling —
           same responsive approach as the Smart SMS Book panels. */
        .stage-wrap {
          position: relative;
          width: min(700px, 100%, calc(100dvh - 260px));
          margin: 0 auto;
          aspect-ratio: 1 / 1;
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          background: #000;
        }
        @media (max-width: 600px) {
          .stage-wrap { width: min(700px, 100%, calc(100dvh - 320px)); }
        }
        .stage-wrap canvas {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ── On-screen D-pad (touch / mobile) ── */
        .dpad {
          display: none;
          grid-template-columns: repeat(3, 56px);
          grid-template-rows: repeat(2, 56px);
          gap: 8px;
          justify-content: center;
          margin: 1.3rem auto 0;
        }
        @media (max-width: 720px), (pointer: coarse) {
          .dpad { display: grid; }
        }
        .dpad-btn {
          background: var(--panel-bg);
          border: 1px solid var(--border);
          color: var(--text);
          border-radius: 10px;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          transition: background 0.15s, border-color 0.15s;
        }
        .dpad-btn:active { background: rgba(168,85,247,0.25); border-color: var(--purple); }
        .dpad-up     { grid-column: 2; grid-row: 1; }
        .dpad-left   { grid-column: 1; grid-row: 2; }
        .dpad-down   { grid-column: 2; grid-row: 2; }
        .dpad-right  { grid-column: 3; grid-row: 2; }

        .stage-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.72);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          text-align: center;
          padding: 1.5rem;
        }
        .overlay-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text);
        }
        .overlay-sub {
          font-size: 0.85rem;
          color: var(--muted);
          max-width: 340px;
          line-height: 1.6;
        }
        .countdown-number {
          font-size: 5rem;
          font-weight: 900;
          color: var(--purple);
          font-family: consolas, monospace;
        }
        .start-btn {
          background: var(--purple);
          color: #0A0E1A;
          border: none;
          padding: 0.9rem 2.2rem;
          border-radius: 10px;
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: transform 0.2s, filter 0.2s;
        }
        .start-btn:hover { transform: translateY(-2px); filter: brightness(1.08); }

        .controls-hint {
          margin-top: 1.2rem;
          text-align: center;
          font-size: 0.78rem;
          color: var(--muted);
        }

        /* ── WhatsApp float ── */
        .whatsapp-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--purple);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(168,85,247,0.35);
          z-index: 200;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .whatsapp-float:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 14px 36px rgba(168,85,247,0.5);
        }
        .whatsapp-float svg { width: 28px; height: 28px; }
      `}</style>

            <section className="theme-arcade" id="view-arcade">
                <div className="wrap module-head">
                    <div className="eyebrow">
                        <span className="eyebrow-dash" aria-hidden="true" />
                        Games
                    </div>
                    <h2 className="section-title">Snake Xenzia — Classic Arcade</h2>
                </div>

                <div className="wrap module-body">
                    <div className="game-top-bar">
                        <div className="score-label">Score: {score}</div>
                        <div className="speed-group">
                            <span>Speed</span>
                            {["low", "medium", "hard"].map((s) => (
                                <button
                                    key={s}
                                    className={`speed-btn ${speedKey === s ? "active" : ""}`}
                                    disabled={gameState === "playing" || gameState === "countdown"}
                                    onClick={() => setSpeedKey(s)}
                                >
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="stage-wrap">
                        <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} />

                        {gameState === "idle" && (
                            <div className="stage-overlay">
                                <div className="overlay-title">Snake Xenzia</div>
                                <p className="overlay-sub">
                                    Use the arrow keys to move. Eat the red food to grow —
                                    avoid the walls and your own tail.
                                </p>
                                <button className="start-btn" onClick={startGame}>Start Game</button>
                            </div>
                        )}

                        {gameState === "countdown" && (
                            <div className="stage-overlay">
                                <div className="countdown-number">{countdown === 0 ? "GO!" : countdown}</div>
                            </div>
                        )}

                        {gameState === "gameover" && (
                            <div className="stage-overlay">
                                <div className="overlay-title" style={{ color: "#FF4D4D" }}>Game Over</div>
                                <p className="overlay-sub">Final score: {score}</p>
                                <button className="start-btn" onClick={startGame}>Play Again</button>
                            </div>
                        )}
                    </div>

                    {gameState === "playing" && (
                        <div className="dpad" aria-label="Touch controls">
                            <button className="dpad-btn dpad-up" onClick={() => changeDirection("up")} aria-label="Move up">↑</button>
                            <button className="dpad-btn dpad-left" onClick={() => changeDirection("left")} aria-label="Move left">←</button>
                            <button className="dpad-btn dpad-down" onClick={() => changeDirection("down")} aria-label="Move down">↓</button>
                            <button className="dpad-btn dpad-right" onClick={() => changeDirection("right")} aria-label="Move right">→</button>
                        </div>
                    )}

                    <p className="controls-hint">Arrow keys to steer · Choose a speed before starting</p>
                </div>
            </section>

            {/* ── Floating WhatsApp contact button (Snake Xenzia / purple theme) ── */}
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
                        fill="#0A0E1A"
                    />
                    <path
                        d="M22.4 18.8c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4Z"
                        fill="#0A0E1A"
                    />
                </svg>
            </a>
        </>
    );
}   