import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Heart,
  Brain,
  Eye,
  Smile,
  ArrowRight,
  ShieldCheck,
  Volume2,
  VolumeX,
  X,
  Palette,
  Check,
  Star,
  Compass,
  Rocket,
  Sun,
  Flame,
  Lightbulb,
} from 'lucide-react';

interface AnimatedWelcomeScreenProps {
  onEnterApp: (tab?: 'workbench' | 'students' | 'history' | 'guide') => void;
  onDismissForever?: () => void;
}

export const AnimatedWelcomeScreen: React.FC<AnimatedWelcomeScreenProps> = ({
  onEnterApp,
  onDismissForever,
}) => {
  const [activeSuperpower, setActiveSuperpower] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(false);

  const superpowers = [
    {
      title: 'Espectro Autista (TEA)',
      color: 'from-amber-400 to-orange-500',
      bgLight: 'bg-amber-50 text-amber-900 border-amber-200',
      tag: 'Hiperfoco & Detalhe',
      icon: Rocket,
      desc: 'Pensamento analítico profundo, fidelidade aos fatos e capacidade impressionante de imersão em temas de interesse.',
    },
    {
      title: 'Atenção & Movimento (TDAH)',
      color: 'from-rose-400 to-pink-500',
      bgLight: 'bg-rose-50 text-rose-900 border-rose-200',
      tag: 'Criatividade & Energia',
      icon: Flame,
      desc: 'Pensamento divergente rápido, capacidade de conectar ideias inovadoras e energia contagiante quando motivado.',
    },
    {
      title: 'Mente Visual (Dislexia)',
      color: 'from-indigo-400 to-blue-500',
      bgLight: 'bg-indigo-50 text-indigo-900 border-indigo-200',
      tag: 'Visão Espacial Tridimensional',
      icon: Lightbulb,
      desc: 'Excelente compreensão visual, facilidade com narrativa oral, empatia aguçada e raciocínio holístico.',
    },
    {
      title: 'Sensibilidade & Sentidos (TPS)',
      color: 'from-emerald-400 to-teal-500',
      bgLight: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      tag: 'Percepção Apurada',
      icon: Palette,
      desc: 'Conexão profunda com o ambiente, sensibilidade artística e percepção aguçada de texturas, sons e estímulos.',
    },
  ];

  const handleSpeakWelcome = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text =
      'Olá! Bem-vindo ao IncluiEdu. Um espaço dedicado à psicologia, pedagogia inclusiva e adaptação personalizada de atividades escolares para crianças neurodivergentes. Vamos juntos transformar o aprendizado em uma experiência acessível, acolhedora e cheia de descobertas!';

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleProceed = (tab: 'workbench' | 'students' | 'history' | 'guide' = 'workbench') => {
    if (rememberChoice && onDismissForever) {
      onDismissForever();
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }
    onEnterApp(tab);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 flex items-center justify-center p-3 sm:p-6 select-none">
      {/* Dynamic Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-teal-500/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 -right-20 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-20 left-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Animated Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden my-auto"
      >
        {/* Top Floating Close Button */}
        <button
          onClick={() => handleProceed('workbench')}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 transition-colors shadow-xs"
          title="Entrar diretamente"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Rainbow Neurodiversity Header Ribbon */}
        <div className="h-2.5 w-full bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 via-teal-500 to-indigo-500" />

        <div className="p-6 sm:p-10 space-y-8">
          {/* Header Identity with Animated Floating Icons */}
          <div className="text-center space-y-3 relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold tracking-wide shadow-xs">
              <Sparkles className="w-4 h-4 text-teal-600 animate-spin" />
              <span>Psicopedagogia Clínica & Inclusão Social Afirmativa</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight"
            >
              Inclui<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-amber-500">Edu</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed"
            >
              Cada mente tem seu próprio ritmo, brilho e caminho de descoberta. Adapte atividades
              escolares respeitando as necessidades sensoriais e cognitivas de cada estudante.
            </motion.p>

            {/* Audio Greeting Trigger */}
            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={handleSpeakWelcome}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isSpeaking
                    ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-teal-600" />}
                <span>{isSpeaking ? 'Parar Áudio' : 'Ouvir Mensagem de Boas-Vindas'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Superpowers / Neurodiversity Spectrum Explorer */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                Explorar Potencialidades & Acomodações Específicas
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Clique nos cartões para visualizar
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {superpowers.map((sp, idx) => {
                const isSelected = activeSuperpower === idx;
                const IconComponent = sp.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveSuperpower(idx)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'border-slate-800 shadow-md ring-2 ring-teal-500/30'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/70 hover:bg-white'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl bg-gradient-to-br ${sp.color} text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{sp.title}</h4>
                    <span className="text-[10px] font-semibold text-slate-500 block mt-0.5">
                      {sp.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Superpower Detail Banner */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSuperpower}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className={`p-4 rounded-2xl border ${superpowers[activeSuperpower].bgLight} flex items-start gap-3`}
              >
                <div className="p-2 rounded-xl bg-white/80 shadow-2xs shrink-0">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                </div>
                <div className="space-y-0.5">
                  <h5 className="font-bold text-xs text-slate-900">
                    {superpowers[activeSuperpower].title} — {superpowers[activeSuperpower].tag}
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {superpowers[activeSuperpower].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3 Pillars Summary Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-start gap-2.5">
              <Eye className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800 font-bold">Acomodação Sensorial</strong>
                <span className="text-slate-500 text-[11px] leading-snug block mt-0.5">
                  Espaçamento amplo, caixas delimitadas e controle de sobrecarga visual.
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-start gap-2.5">
              <Brain className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800 font-bold">Andaime Cognitivo</strong>
                <span className="text-slate-500 text-[11px] leading-snug block mt-0.5">
                  Divisão de enunciados longos em micro-metas com checklists e apoios visuais.
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800 font-bold">100% Local & Privado</strong>
                <span className="text-slate-500 text-[11px] leading-snug block mt-0.5">
                  Prontuários e dados de alunos não saem do seu computador (LGPD).
                </span>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-500 select-none">
              <input
                type="checkbox"
                checked={rememberChoice}
                onChange={(e) => setRememberChoice(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded-md border-slate-300 focus:ring-teal-500"
              />
              <span>Entrar direto na bancada nas próximas vezes</span>
            </label>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleProceed('students')}
                className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
              >
                Ver Alunos
              </button>

              <button
                type="button"
                onClick={() => handleProceed('workbench')}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 hover:from-teal-700 hover:to-emerald-800 text-white text-xs font-bold shadow-lg shadow-teal-700/20 flex items-center justify-center gap-2 group transition-all"
              >
                <span>Entrar na Plataforma</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
