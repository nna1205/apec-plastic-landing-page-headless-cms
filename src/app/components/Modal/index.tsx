import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

const Modal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="w-screen backdrop-blur fixed inset-0 z-50 grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, x: -100 }}
            animate={{ scale: 1, x: 0 }}
            exit={{ scale: 0, x: -100 }}
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg w-full max-w-[90%] lg:max-w-lg shadow-xl cursor-default relative"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
