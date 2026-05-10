import styles from "./style.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "../anim";
import Body from "./Body";
import { ShoppingCartIcon, UserIcon } from "lucide-react";

const links = [
  { title: "Home", href: "/", src: "home.png" },
  { title: "Shop", href: "/shop", src: "shop.png" },
  { title: "Categories", href: "/categories", src: "shop.png" },
  { title: "About Us", href: "/about", src: "home.png" },
  { title: "Contact", href: "/contact", src: "contact.png" },
];

const sans = { fontFamily: "'Montserrat', sans-serif" };

export default function Navbar() {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.nav}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
          />

          {/* Mobile-only utilities — hidden on sm+ where header bar shows them */}
          <div className={styles.mobileUtils}>
            <a href="/login" className={styles.utilLink} style={sans}>
              <UserIcon size={15} strokeWidth={1.5} />
              Login
            </a>
            <a href="/cart" className={styles.utilLink} style={sans}>
              <ShoppingCartIcon size={15} strokeWidth={1.5} />
              Cart (0)
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
