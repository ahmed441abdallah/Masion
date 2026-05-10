import styles from "./style.module.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { background, opacity } from "./anim";
import Navbar from "./nav";
import { ShoppingCartIcon, User } from "lucide-react";
import Logo from "@/components/common/Logo";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const { user } = useSelector((s) => s.auth);
  

  return (
    <div className={styles.header}>
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
            <ShoppingCartIcon size={18} />
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
