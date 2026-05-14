import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { background, opacity } from "./anim";
import Navbar from "./nav";
import { ShoppingCartIcon, User } from "lucide-react";
import Logo from "@/components/common/Logo";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useSelector((s) => s.auth);
  const { cartItems } = useSelector((s) => s.cart);

  // Sum all item quantities for the badge count
  const cartCount = cartItems?.cartItems?.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  ) ?? 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.bar}>
        {/* Left — Logo */}
        <Logo color="white" size="sm" />

        {/* Right — Shop / Cart / Auth (desktop only) */}
        <motion.div
          variants={opacity}
          animate={!isActive ? "open" : "closed"}
          className={styles.shopContainer}
        >
          <Link to="/shop" className={styles.shopLink}>
            shop
          </Link>
          <Link to="/cart" className={styles.el}>
            {/* Cart icon with animated badge */}
            <div className="relative">
              <ShoppingCartIcon size={18} />
              <AnimatePresence mode="popLayout">
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0, opacity: 0, y: -4 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                    className="absolute -top-2 -right-2.5 min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center text-[9px] font-semibold leading-none"
                    style={{ background: "#c9a96e", color: "#fff" }}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <p>Cart</p>
          </Link>

          {user ? (
            <Link to="/profile" className="flex items-center gap-2">
              <User size={18} />
              <span>profile</span>
            </Link>
          ) : (
            <Link to="/login" className={styles.shopLink}>
              login
            </Link>
          )}
        </motion.div>

        {/* Right — Menu toggle (always visible) */}
        <div
          onClick={() => setIsActive(!isActive)}
          className={styles.menuToggle}
        >
          <div
            className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}
          />
          <div className={styles.label}>
            <motion.p
              variants={opacity}
              animate={!isActive ? "open" : "closed"}
            >
              Menu
            </motion.p>
            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>
              Close
            </motion.p>
          </div>
        </div>
      </div>

      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className={styles.background}
      ></motion.div>

      <AnimatePresence mode="wait">{isActive && <Navbar />}</AnimatePresence>
    </div>
  );
}
