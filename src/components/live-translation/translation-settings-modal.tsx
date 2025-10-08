"use client"

import { useState } from "react"
import { X, Languages, Volume2, Mic, Settings, Check } from "lucide-react"

interface TranslationSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
  selectedLanguage: string
  onLanguageChange: (language: string) => void
  selectedVoice: string
  onVoiceChange: (voice: string) => void
  isAutoTTS: boolean
  onAutoTTSChange: (enabled: boolean) => void
}

const languages = [
  { code: "Spanish", name: "Spanish (Español)", flag: "🇪🇸" },
  { code: "French", name: "French (Français)", flag: "🇫🇷" },
  { code: "Portuguese", name: "Portuguese (Português)", flag: "🇵🇹" },
  { code: "German", name: "German (Deutsch)", flag: "🇩🇪" },
  { code: "Italian", name: "Italian (Italiano)", flag: "🇮🇹" },
  { code: "Chinese", name: "Chinese (中文)", flag: "🇨🇳" },
  { code: "Japanese", name: "Japanese (日本語)", flag: "🇯🇵" },
  { code: "Korean", name: "Korean (한국어)", flag: "🇰🇷" },
  { code: "Arabic", name: "Arabic (العربية)", flag: "🇸🇦" },
  { code: "Russian", name: "Russian (Русский)", flag: "🇷🇺" },
]

const voices = {
  Spanish: ["Maria", "Carlos", "Sofia", "Diego"],
  French: ["Marie", "Pierre", "Camille", "Antoine"],
  Portuguese: ["Ana", "João", "Beatriz", "Miguel"],
  German: ["Anna", "Hans", "Emma", "Klaus"],
  Italian: ["Giulia", "Marco", "Francesca", "Alessandro"],
  Chinese: ["Li Wei", "Zhang Min", "Wang Lei", "Liu Mei"],
  Japanese: ["Yuki", "Hiroshi", "Sakura", "Takeshi"],
  Korean: ["Min-jun", "So-young", "Ji-hoon", "Eun-ji"],
  Arabic: ["Fatima", "Ahmed", "Aisha", "Omar"],
  Russian: ["Anastasia", "Dmitri", "Katarina", "Alexei"],
}

export function TranslationSettingsModal({
  isOpen,
  onClose,
  darkMode,
  selectedLanguage,
  onLanguageChange,
  selectedVoice,
  onVoiceChange,
  isAutoTTS,
  onAutoTTSChange,
}: TranslationSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<"language" | "voice" | "settings">("language")

  if (!isOpen) return null

 
  const testVoice = (_voice: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance("Hello, this is a test of the voice.")
      utterance.lang = selectedLanguage === "Spanish" ? "es-ES" : "fr-FR"
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className={`w-full max-w-2xl rounded-3xl shadow-2xl ${
          darkMode ? "bg-gray-900" : "bg-white"
        } border border-white/20 overflow-hidden animate-scale-in`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Settings className="text-white" size={20} />
            </div>
            <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Translation Settings</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
              darkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { id: "language", label: "Language", icon: Languages },
            { id: "voice", label: "Voice", icon: Mic },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}

              onClick={() => setActiveTab(tab.id as "language" | "voice" | "settings")}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-all duration-300 ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : darkMode
                    ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <tab.icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {/* Language Tab */}
          {activeTab === "language" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => onLanguageChange(language.code)}
                    className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 text-left ${
                      selectedLanguage === language.code
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : darkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-2xl">{language.flag}</span>
                    <div className="flex-1">
                      <p className="font-medium">{language.name}</p>
                    </div>
                    {selectedLanguage === language.code && <Check size={20} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Voice Tab */}
          {activeTab === "voice" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {selectedLanguage} Voices
                </h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Choose a voice for text-to-speech
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {voices[selectedLanguage as keyof typeof voices]?.map((voice) => (
                  <button
                    key={voice}
                    onClick={() => onVoiceChange(voice)}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                      selectedVoice === voice
                        ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg"
                        : darkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedVoice === voice ? "bg-white/20" : darkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <Volume2 size={16} />
                      </div>
                      <span className="font-medium">{voice}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedVoice === voice && <Check size={16} className="text-white" />}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          testVoice(voice)
                        }}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          selectedVoice === voice
                            ? "bg-white/20 hover:bg-white/30"
                            : darkMode
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Auto Text-to-Speech
                      </h4>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Automatically speak translated text as it appears
                      </p>
                    </div>
                    <button
                      onClick={() => onAutoTTSChange(!isAutoTTS)}
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                        isAutoTTS ? "bg-green-500" : darkMode ? "bg-gray-600" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                          isAutoTTS ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                  <h4 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Translation Quality
                  </h4>
                  <div className="space-y-2">
                    {["Standard", "High Quality", "Premium"].map((quality, index) => (
                      <label key={quality} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="quality"
                          defaultChecked={index === 1}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>{quality}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                  <h4 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>Display Options</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                      <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>Show timestamps</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                      <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>Show original text</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>Auto-scroll to latest</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Translation powered by AI</div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className={`px-6 py-2 rounded-xl transition-all duration-300 ${
                darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}