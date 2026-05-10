import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import HeroSlider from "./HeroSlider";
import { Companies } from "./Companies";

// Below-fold sections loaded lazily
const Video           = lazy(() => import("./Video").then(m => ({ default: m.Video })));
const Categories      = lazy(() => import("./Categories").then(m => ({ default: m.Categories })));
const FeaturedProducts = lazy(() => import("./FeaturedProducts").then(m => ({ default: m.FeaturedProducts })));
const Process         = lazy(() => import("./Process").then(m => ({ default: m.Process })));
const ZoomParallax    = lazy(() => import("./ZoomParallax/ZoomParallax"));
const Reviews         = lazy(() => import("./Reviews").then(m => ({ default: m.Reviews })));
const Newsletter      = lazy(() => import("./Newsletter").then(m => ({ default: m.Newsletter })));

const SectionFallback = () => <div className="h-32" />;

const LandingPage = () => {
  const [showChat, setShowChat] = useState(false);
  const throttleRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (throttleRef.current) return; // already throttled
    throttleRef.current = setTimeout(() => {
      setShowChat(window.scrollY > 400);
      throttleRef.current = null;
    }, 100); // fire at most every 100ms
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleRef.current) clearTimeout(throttleRef.current);
    };
  }, [handleScroll]);

  return (
    <main className="bg-[#f8f7f5] relative">
      <HeroSlider />
      <Companies />
      <Suspense fallback={<SectionFallback />}>
        <Categories />
        <Video />
        <FeaturedProducts />
        <Process />
        <ZoomParallax />
        <Reviews />
        <Newsletter />
      </Suspense>

      {/* ── Floating Chat Button ── */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Link
              to="/chat"
              className="group flex items-center justify-center w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
                border: "1.5px solid rgba(184,149,90,0.4)",
              }}
            >
              <MessageCircle size={24} style={{ color: "#b8955a" }} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
              
              {/* Notification dot */}
              <span className="absolute top-0 right-0 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#1a1a1a]"></span>
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default LandingPage;
