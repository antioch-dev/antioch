"use client"

import { useState, useEffect, useRef } from "react"
import { X, Settings, Volume2, VolumeX, Maximize2, Minimize2, Languages, Play } from "lucide-react"
import { TranslationSettingsModal } from "./translation-settings-modal"

interface TranslationPair {
  id: string
  original: string
  translated: string
  timestamp: Date
  isComplete: boolean
}

interface TranslationOverlayProps {
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
  streamGradient: string
}

export function TranslationOverlay({ isOpen, onClose, darkMode, streamGradient }: TranslationOverlayProps) {
  const [viewMode, setViewMode] = useState<"sticky" | "fullscreen">("sticky")
  const [showSettings, setShowSettings] = useState(false)
  const [isAutoTTS, setIsAutoTTS] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("Spanish")
  const [selectedVoice, setSelectedVoice] = useState("Maria")
  const [translationPairs, setTranslationPairs] = useState<TranslationPair[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Mock translation pairs for demo
  useEffect(() => {
    if (isOpen) {
      const mockPairs: TranslationPair[] = [
        {
          id: "1",
          original: "Welcome everyone to our Sunday morning worship service.",
          translated: "Bienvenidos todos a nuestro servicio de adoración dominical matutino.",
          timestamp: new Date(Date.now() - 120000),
          isComplete: true,
        },
        {
          id: "2",
          original: "Today we will be exploring the theme of new beginnings and Gods faithfulness.",
          translated: "Hoy exploraremos el tema de los nuevos comienzos y la fidelidad de Dios.",
          timestamp: new Date(Date.now() - 90000),
          isComplete: true,
        },
        {
          id: "3",
          original: "Let us begin with a time of worship and praise.",
          translated: "Comencemos con un tiempo de adoración y alabanza.",
          timestamp: new Date(Date.now() - 60000),
          isComplete: true,
        },
      ]
      setTranslationPairs(mockPairs)

      // Simulate live translation
      const interval = setInterval(() => {
        const phrases = [
          "The Lord is our shepherd, we shall not want.",
          "He makes me lie down in green pastures.",
          "He leads me beside quiet waters.",
          "He refreshes my soul.",
          "Even though I walk through the darkest valley, I will fear no evil.",
        ]

        // ✅ Ensure we always get a string
        const randomPhrase: string = phrases[Math.floor(Math.random() * phrases.length)] ?? ""
        const translatedPhrase: string = getTranslation(randomPhrase, selectedLanguage) ?? ""

        const newPair: TranslationPair = {
          id: Date.now().toString(),
          original: randomPhrase,
          translated: translatedPhrase,
          timestamp: new Date(),
          isComplete: true,
        }

        setTranslationPairs((prev) => [...prev, newPair].slice(-10)) // Keep last 10

        if (isAutoTTS && translatedPhrase) {
          speakText(translatedPhrase)
        }
      }, 8000)

      return () => clearInterval(interval)
    }
  }, [isOpen, selectedLanguage, isAutoTTS])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [translationPairs])

  const getTranslation = (text: string, language: string): string => {
    const translations: Record<string, Record<string, string>> = {
      Spanish: {
        "The Lord is our shepherd, we shall not want.": "El Señor es nuestro pastor, nada nos faltará.",
        "He makes me lie down in green pastures.": "Me hace descansar en verdes pastos.",
        "He leads me beside quiet waters.": "Me conduce junto a aguas de reposo.",
        "He refreshes my soul.": "Conforta mi alma.",
        "Even though I walk through the darkest valley, I will fear no evil.":
          "Aunque ande en valle de sombra de muerte, no temeré mal alguno.",
      },
      French: {
        "The Lord is our shepherd, we shall not want.": "L'Éternel est mon berger: je ne manquerai de rien.",
        "He makes me lie down in green pastures.": "Il me fait reposer dans de verts pâturages.",
        "He leads me beside quiet waters.": "Il me dirige près des eaux paisibles.",
        "He refreshes my soul.": "Il restaure mon âme.",
        "Even though I walk through the darkest valley, I will fear no evil.":
          "Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal.",
      },
    }
    return translations[language]?.[text] ?? text
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window && text) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = selectedLanguage === "Spanish" ? "es-ES" : "fr-FR"
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  const handleTTSToggle = () => {
    setIsAutoTTS((prev) => !prev)
    if (!isAutoTTS) {
      speechSynthesis.cancel()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Fullscreen Mode */}
      {viewMode === "fullscreen" && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="h-full flex">
            {/* Stream Side - Desktop */}
            <div className="hidden lg:block w-1/3 p-4">
              <div className="h-full bg-gray-900 rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play size={32} />
                    </div>
                    <p className="text-lg">Live Stream</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Translation Content */}
            <div className="flex-1 p-4 lg:p-6">
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-semibold">TRANSLATING</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white">
                      <Languages size={20} />
                      <span className="font-medium">English → {selectedLanguage}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300"
                    >
                      <Settings size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode("sticky")}
                      className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300"
                    >
                      <Minimize2 size={20} />
                    </button>
                    <button
                      onClick={onClose}
                      className="p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all duration-300"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="flex-1 grid lg:grid-cols-2 gap-6 min-h-0">
                  {/* Original Text */}
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-4">Original (English)</h3>
                    <div
                      ref={scrollRef}
                      className="flex-1 bg-white/5 rounded-2xl p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/20"
                    >
                      {translationPairs.map((pair) => (
                        <div key={pair.id} className="animate-slide-up">
                          <div className="text-sm text-gray-400 mb-2">{pair.timestamp.toLocaleTimeString()}</div>
                          <p className="text-white text-lg leading-relaxed">{pair.original}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Translated Text */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Translated ({selectedLanguage})</h3>
                      <button
                        onClick={handleTTSToggle}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                          isAutoTTS
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {isAutoTTS ? <Volume2 size={16} /> : <VolumeX size={16} />}
                        <span className="text-sm font-medium">Auto TTS</span>
                      </button>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-2xl p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/20">
                      {translationPairs.map((pair) => (
                        <div key={pair.id} className="animate-slide-up">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-gray-400">{pair.timestamp.toLocaleTimeString()}</div>
                            <button
                              onClick={() => speakText(pair.translated)}
                              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>
                          <p className="text-white text-lg leading-relaxed">{pair.translated}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Mode */}
      {viewMode === "sticky" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
          <div
            className={`max-w-6xl mx-auto rounded-2xl shadow-2xl ${
              darkMode ? "bg-gray-900/95" : "bg-white/95"
            } backdrop-blur-xl border border-white/20`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-500 font-medium text-sm">LIVE TRANSLATION</span>
                </div>
                <div className={`flex items-center space-x-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <Languages size={16} />
                  <span>EN → {selectedLanguage}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleTTSToggle}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isAutoTTS
                      ? "bg-green-500/20 text-green-500"
                      : darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {isAutoTTS ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Settings size={16} />
                </button>
                <button
                  onClick={() => setViewMode("fullscreen")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Maximize2 size={16} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Translation Pairs */}
            <div className="p-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              <div className="space-y-4">
                {translationPairs.slice(-3).map((pair) => (
                  <div key={pair.id} className="animate-slide-up">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500 font-medium">ENGLISH</span>
                          <span className="text-xs text-gray-400">{pair.timestamp.toLocaleTimeString()}</span>
                        </div>
                        <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                          {pair.original}
                        </p>
                      </div>
                      <div className={`p-4 rounded-xl ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-blue-500 font-medium">{selectedLanguage.toUpperCase()}</span>
                          <button
                            onClick={() => speakText(pair.translated)}
                            className="p-1 bg-blue-500/20 text-blue-500 rounded hover:bg-blue-500/30 transition-all duration-300"
                          >
                            <Volume2 size={12} />
                          </button>
                        </div>
                        <p className={`text-sm leading-relaxed ${darkMode ? "text-blue-200" : "text-blue-800"}`}>
                          {pair.translated}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <TranslationSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        darkMode={darkMode}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        selectedVoice={selectedVoice}
        onVoiceChange={setSelectedVoice}
        isAutoTTS={isAutoTTS}
        onAutoTTSChange={setIsAutoTTS}
      />
    </>
  )
}
