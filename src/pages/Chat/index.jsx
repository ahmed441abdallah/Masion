import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import api from "@/services/api";

/* ─── Design tokens ──────────────────────────────────────── */
const sans     = { fontFamily: "'Montserrat', sans-serif" };
const GOLD     = "#b8955a";
const CHARCOAL = "#1a1a1a";
const WARM_BG  = "#f8f7f5";

/* ─── Data ───────────────────────────────────────────────── */
const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "ai",
    text: "Bonjour. I'm your Maison style concierge. How may I assist you today — whether it's finding the perfect piece, tracking an order, or curating your wardrobe.",
    time: "09:41",
  },
];

const SUGGESTIONS = [
  "Give me information about brands",
  "Give me information about avalible products",
 
];

const AI_RESPONSES = [
  "Of course. Based on your style profile, I'd recommend our new linen blazer in écru — it pairs beautifully with tailored trousers or wide-leg denim.",
  "Your order #MN-2847 has been dispatched and is expected to arrive by Friday. You'll receive a tracking notification shortly.",
  "For a capsule wardrobe, I always suggest starting with three neutral base pieces: a structured coat, a silk blouse, and high-waisted trousers. Shall I show you our current selection?",
  "Our size guide recommends an EU 48 for a relaxed fit, or EU 46 for a tailored silhouette. May I ask your chest and shoulder measurements?",
  "Certainly. For a gift under €300, our hand-rolled silk scarves are perennial favourites. They come beautifully packaged with complimentary monogramming.",
];

/* ─── Thinking dots ──────────────────────────────────────── */
const ThinkingDots = () => (
  <div className="flex items-center gap-1 px-1 py-0.5">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: GOLD }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
      />
    ))}
  </div>
);

/* ─── Message bubble ─────────────────────────────────────── */
const MessageBubble = ({ msg }) => {
  const isAI = msg.role === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isAI ? "justify-start" : "justify-end"} mb-5`}
    >
      {isAI && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1"
          style={{ backgroundColor: GOLD }}
        >
          <Sparkles size={12} color="white" strokeWidth={1.5} />
        </div>
      )}

      <div className={`max-w-[78%] md:max-w-[60%] ${isAI ? "" : "items-end flex flex-col"}`}>
        <div
          className="px-5 py-3.5 rounded-2xl"
          style={
            isAI
              ? {
                  background: "rgba(255,255,255,0.78)",
                  backdropFilter: "blur(16px) saturate(150%)",
                  WebkitBackdropFilter: "blur(16px) saturate(150%)",
                  border: `1px solid rgba(184,149,90,0.18)`,
                  borderLeft: `2.5px solid ${GOLD}`,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                }
              : {
                  background: CHARCOAL,
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                }
          }
        >
          <p
            className="text-sm leading-[1.75]"
            style={{ ...sans, color: isAI ? CHARCOAL : "rgba(255,255,255,0.92)" }}
          >
            {msg.text}
          </p>
        </div>
        <p
          className="text-[10px] mt-1.5 px-1"
          style={{ ...sans, color: "rgba(0,0,0,0.28)", textAlign: isAI ? "left" : "right" }}
        >
          {msg.time}
        </p>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   CHAT PAGE
═══════════════════════════════════════════════════════════ */
const ChatPage = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput]       = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef               = useRef(null);
  const inputRef                = useRef(null);
  const textareaRef             = useRef(null);

  const now = () =>
    new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const sendMessage = async (text) => {
    if (!text.trim() || thinking) return;
    setMessages((p) => [...p, { id: Date.now(), role: "user", text: text.trim(), time: now() }]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setThinking(true);

    try {
      const response = await api.post("/chat", { message: text.trim() });
      setMessages((p) => [
        ...p,
        {
          id: Date.now() + 1,
          role: "ai",
          text: response.data?.reply || response.data?.message || "I couldn't understand that.",
          time: now(),
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((p) => [
        ...p,
        {
          id: Date.now() + 1,
          role: "ai",
          text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          time: now(),
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: WARM_BG, ...sans }}
    >
      {/* ── Top bar ───────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 md:px-10 py-4 flex-shrink-0"
        style={{
          background: "rgba(248,247,245,0.88)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div>
          <p className="text-sm font-medium text-stone-800" style={sans}>Style Concierge</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <p className="text-[10px] text-stone-400 tracking-wide" style={sans}>
              Online · Instant replies
            </p>
          </div>
        </div>

        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
          style={{
            background: `rgba(184,149,90,0.08)`,
            border: `1px solid rgba(184,149,90,0.2)`,
          }}
        >
          <Sparkles size={12} style={{ color: GOLD }} strokeWidth={1.5} />
          <p className="text-[10px] tracking-[0.22em] uppercase" style={{ ...sans, color: GOLD }}>
            Maison AI
          </p>
        </div>
      </div>

      {/* ── Messages ──────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 md:px-14 lg:px-28 xl:px-40 pt-8 pb-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
        </AnimatePresence>

        {/* Thinking indicator */}
        <AnimatePresence>
          {thinking && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.35 }}
              className="flex items-start gap-3 mb-5"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                style={{ backgroundColor: GOLD }}
              >
                <Sparkles size={12} color="white" strokeWidth={1.5} />
              </div>
              <div
                className="px-5 py-3.5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.78)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid rgba(184,149,90,0.18)`,
                  borderLeft: `2.5px solid ${GOLD}`,
                }}
              >
                <ThinkingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* ── Suggested Messages ─────────────────────────────── */}
      {messages.length === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 md:px-14 lg:px-28 xl:px-40 pb-3 flex gap-2 overflow-x-auto flex-shrink-0"
          style={{ scrollbarWidth: 'none' }} // hide scrollbar for clean look
        >
          {SUGGESTIONS.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(sug)}
              disabled={thinking}
              className="whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-xs text-stone-600 hover:bg-stone-100 hover:border-stone-300 transition-colors cursor-pointer"
              style={sans}
            >
              {sug}
            </button>
          ))}
        </motion.div>
      )}

      {/* ── Input bar ─────────────────────────────── */}
      <div className="px-5 md:px-14 lg:px-28 xl:px-40 pb-6 pt-2 flex-shrink-0">
        <div
          className="flex items-end gap-3 rounded-2xl px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            border: "1px solid rgba(0,0,0,0.09)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask about styling, orders, or collections…"
            className="flex-1 resize-none outline-none bg-transparent text-sm leading-relaxed placeholder-stone-300 cursor-text overflow-hidden"
            style={{ ...sans, color: CHARCOAL, maxHeight: 140 }}
          />

          <motion.button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || thinking}
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors duration-150"
            style={{
              background: input.trim() && !thinking ? CHARCOAL : "#e7e5e4",
              color:      input.trim() && !thinking ? "white"   : "#a8a29e",
            }}
            whileHover={input.trim() && !thinking ? { scale: 1.06 } : {}}
            whileTap={input.trim()   && !thinking ? { scale: 0.94 } : {}}
            transition={{ duration: 0.15 }}
          >
            <Send size={15} strokeWidth={1.5} />
          </motion.button>
        </div>

        <p className="text-center text-[10px] text-stone-300 mt-2" style={sans}>
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatPage;
