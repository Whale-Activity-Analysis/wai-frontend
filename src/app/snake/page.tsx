"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bitcoin, Trophy, RotateCcw, Play, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility von shadcn

// --- KONFIGURATION ---
const GRID_SIZE = 20; // 20x20 Feld
const INITIAL_SPEED = 150; // ms pro Tick (niedriger = schneller)
const SPEED_INCREMENT = 2; // Wird pro Bitcoin schneller

// Richtungen
const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };
const LEFT = { x: -1, y: 0 };
const RIGHT = { x: 1, y: 0 };

export default function SnakePage() {
  // Game State
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]); // Start in der Mitte
  const [food, setFood] = useState({ x: 15, y: 5 });
  const [direction, setDirection] = useState(RIGHT);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [status, setStatus] = useState<"IDLE" | "PLAYING" | "GAME_OVER">("IDLE");
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  // Refs für Event Listener (verhindert Stale Closures)
  const directionRef = useRef(RIGHT);
  
  // Highscore aus LocalStorage laden
  useEffect(() => {
    const saved = localStorage.getItem("snakeHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // --- GAME LOGIK ---

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]); // Schlange mit Länge 3
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setDirection(RIGHT);
    directionRef.current = RIGHT;
    setStatus("PLAYING");
    spawnFood();
  };

  const spawnFood = () => {
    // Zufällige Position
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    setFood({ x, y });
  };

  const gameOver = () => {
    setStatus("GAME_OVER");
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snakeHighScore", score.toString());
    }
  };

  // Der "Game Loop"
  useEffect(() => {
    if (status !== "PLAYING") return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        };

        // 1. Kollision mit Wänden?
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          gameOver();
          return prevSnake;
        }

        // 2. Kollision mit sich selbst?
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
            gameOver();
            return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // 3. Bitcoin gegessen?
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1);
          setSpeed((s) => Math.max(50, s - SPEED_INCREMENT)); // Schneller werden, max 50ms
          spawnFood();
          // Schlange wächst (wir entfernen das Ende NICHT)
        } else {
          // Normaler Schritt: Ende entfernen
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameLoop = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoop);
  }, [status, food, speed]); // Abhängigkeiten für den Loop

  // Tastatur Steuerung
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Verhindert Scrollen mit Pfeiltasten
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current.y === 0) directionRef.current = UP;
          break;
        case "ArrowDown":
          if (directionRef.current.y === 0) directionRef.current = DOWN;
          break;
        case "ArrowLeft":
          if (directionRef.current.x === 0) directionRef.current = LEFT;
          break;
        case "ArrowRight":
          if (directionRef.current.x === 0) directionRef.current = RIGHT;
          break;
        case " ": // Leertaste startet neu
             if (status !== "PLAYING") startGame();
             break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status]);

  // --- RENDER HELPERS ---
  
  // Wir erstellen ein 1D Array für das Grid und rendern es
  const gridCells = Array.from({ length: GRID_SIZE * GRID_SIZE });

  return (
    <main className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 p-6 md:p-12 flex flex-col items-center">
      
      <FadeIn>
        <div className="text-center mb-8 space-y-2">
            <h1 className="text-4xl font-bold text-orange-500 flex items-center justify-center gap-3">
                <Bitcoin className="h-10 w-10 animate-bounce" /> 
                Satoshi Snake
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400">
                Sammle Bitcoins, vermeide Panic Sales (Wände).
            </p>
        </div>
      </FadeIn>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* GAME BOARD */}
        <Card className="border-4 border-neutral-800 dark:border-neutral-700 bg-neutral-900 shadow-2xl p-1 rounded-xl">
            <div 
                className="grid gap-[1px] bg-neutral-800/50"
                style={{ 
                    gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                    width: 'min(80vw, 500px)',
                    height: 'min(80vw, 500px)'
                }}
            >
                {gridCells.map((_, index) => {
                    const x = index % GRID_SIZE;
                    const y = Math.floor(index / GRID_SIZE);
                    
                    const isSnakeHead = snake[0].x === x && snake[0].y === y;
                    const isSnakeBody = snake.some((s, i) => i !== 0 && s.x === x && s.y === y);
                    const isFood = food.x === x && food.y === y;

                    return (
                        <div key={index} className="relative w-full h-full bg-neutral-950/80">
                            {/* SNAKE BODY */}
                            {isSnakeBody && (
                                <div className="absolute inset-0 bg-green-500 rounded-sm opacity-80 scale-90" />
                            )}
                            {/* SNAKE HEAD */}
                            {isSnakeHead && (
                                <div className="absolute inset-0 bg-green-400 rounded-sm scale-100 z-10 shadow-[0_0_10px_#4ade80]" />
                            )}
                            {/* BITCOIN FOOD */}
                            {isFood && (
                                <div className="absolute inset-0 flex items-center justify-center animate-pulse z-20">
                                    <Bitcoin className="h-[90%] w-[90%] text-orange-500 fill-orange-500/20" />
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* OVERLAYS */}
                {status !== "PLAYING" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg z-30">
                        <div className="text-center p-6">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {status === "GAME_OVER" ? "REKT! 💀" : "Bereit?"}
                            </h2>
                            {status === "GAME_OVER" && (
                                <p className="text-neutral-300 mb-6">Score: {score} BTC</p>
                            )}
                            <Button onClick={startGame} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold gap-2 text-lg px-8">
                                {status === "GAME_OVER" ? <RotateCcw /> : <Play />}
                                {status === "GAME_OVER" ? "Try Again" : "Start Game"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Card>

        {/* SCORE BOARD */}
        <div className="w-full lg:w-64 space-y-4">
            <Card className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                <CardContent className="pt-6 text-center">
                    <p className="text-sm text-neutral-500 font-mono uppercase tracking-wider mb-1">Current Wallet</p>
                    <div className="text-4xl font-bold text-neutral-900 dark:text-white tabular-nums">
                        {score} <span className="text-lg text-orange-500">BTC</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50">
                <CardContent className="pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-200 dark:bg-amber-900 rounded-full">
                            <Trophy className="h-5 w-5 text-amber-700 dark:text-amber-500" />
                        </div>
                        <div className="text-sm font-medium text-amber-900 dark:text-amber-100">ATH (Highscore)</div>
                    </div>
                    <div className="text-2xl font-bold text-amber-700 dark:text-amber-500 tabular-nums">
                        {highScore}
                    </div>
                </CardContent>
            </Card>

            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400 space-y-2">
                <div className="flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4" /> 
                    <span className="font-bold">Steuerung:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-1 text-xs">
                    <li>Pfeiltasten zum Lenken</li>
                    <li>Leertaste für Neustart</li>
                    <li>Sammle Bitcoin, um zu wachsen</li>
                </ul>
            </div>
        </div>

      </div>
    </main>
  );
}
