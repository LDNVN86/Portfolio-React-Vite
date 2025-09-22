import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Information from "../NavBar/NavbarHomePage";
import Header from "../Header/Header";
import AudioModal from "../../contents/Audio";
import Introduction from "../Introduction/introduction";
import GotoTop from "../../contents/GotoTop";

const HomePage = ({ children }) => {
  const [showHome, setShowHome] = useState(false);
  return (
    <>
      <Introduction onOverlayEnd={() => setShowHome(true)} />
      <AnimatePresence>
        {showHome && (
          <motion.div
            key="homepage"
            initial={{ y: 1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 1000, opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <GotoTop />
            <AudioModal />
            <video
              src={
                "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Intro4.webm"
              }
              muted
              loop
              autoPlay
              playsInline
              className="fixed w-full h-full object-cover z-[0]"
            ></video>
            <div className=" ">
              <div className="max-w-6xl mx-auto md:p-5 flex flex-col custom:gap-4">
                <Header />
                <Information />
                <AnimatePresence mode="wait">
                  <motion.div>{children}</motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePage;
