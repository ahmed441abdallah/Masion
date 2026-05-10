import { Link } from "react-router-dom";
import AnimationContainer from "../AnimationContainer";
import Logo from "@/components/common/Logo";

const Footer = () => {
  return (
    <footer className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]">
      <div className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-foreground rounded-full"></div>

      <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
        <AnimationContainer delay={0.1}>
          <div className="flex flex-col items-start justify-start md:max-w-[200px]">
            <Logo color="dark" size="md" />
            <p className="text-muted-foreground mt-4 text-sm text-start">
              Your destination for quality products and seamless shopping.
            </p>
            <span className="mt-4 text-neutral-900 text-sm flex items-center">
              Made with care for our customers.
            </span>
          </div>
        </AnimationContainer>

        <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <AnimationContainer delay={0.2}>
              <div>
                <h3 className="text-base font-medium ">Shop</h3>
                <ul className="mt-4 text-sm text-muted-foreground">
                  <li className="mt-2">
                    <a
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      New Arrivals
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Best Sellers
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Sale
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Collections
                    </a>
                  </li>
                </ul>
              </div>
            </AnimationContainer>
            <AnimationContainer delay={0.3}>
              <div className="mt-10 md:mt-0 flex flex-col">
                <h3 className="text-base font-medium ">Customer Care</h3>
                <ul className="mt-4 text-sm text-muted-foreground">
                  <li>
                    <a
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Track Order
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Returns & Exchanges
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Shipping Info
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </AnimationContainer>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <AnimationContainer delay={0.4}>
              <div>
                <h3 className="text-base font-medium ">Resources</h3>
                <ul className="mt-4 text-sm text-muted-foreground">
                  <li className="mt-2">
                    <a
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Support
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href="/chat"
                      className="hover:text-foreground transition-all duration-300 flex items-center gap-1.5"
                    >
                      AI Concierge
                    </a>
                  </li>
                </ul>
              </div>
            </AnimationContainer>
            <AnimationContainer delay={0.5}>
              <div className="mt-10 md:mt-0 flex flex-col">
                <h3 className="text-base font-medium ">Company</h3>
                <ul className="mt-4 text-sm text-muted-foreground">
                  <li>
                    <a
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href="/privacy"
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href="/terms"
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </AnimationContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full">
        <AnimationContainer delay={0.6}>
          <p className="text-sm text-muted-foreground mt-8 md:mt-0">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </AnimationContainer>
        <AnimationContainer delay={0.7}>
          <Link
            to="/admin/login"
            className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-200 mt-4 md:mt-0 inline-block"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Admin
          </Link>
        </AnimationContainer>
      </div>
    </footer>
  );
};

export default Footer;
