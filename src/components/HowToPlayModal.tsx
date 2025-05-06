import { motion } from 'framer-motion'

const HowToPlayModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-[#505050] text-[#FFE8D6] p-6 rounded-xl w-[90%] max-w-md shadow-2xl border border-[#FFE8D6]/30"
      >
        <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-[#80C7F2] via-[#E4C1F9] to-[#FFB5B5] text-transparent bg-clip-text">
          How to Play
        </h2>
        <ul className="text-[15px] space-y-3 font-jetbrains">
        <li>✦ Every choice you make affects four key areas: <strong>Energy</strong>, <strong>Social</strong>, <strong>Academic</strong>, and <strong>Career</strong>. Balance is everything — neglect one, and it might cost you.</li>
        <li>✦ Don't forget, what you do matters. Pull an all-nighter? Your grades might thank you, but your energy won't. Skip a club meeting? That's time back, but you might miss a connection.</li>
          <li>✦ Be careful! If your <strong>Energy</strong> hits 0, things won't go so well for you...</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 rounded-md text-[#2E2E2E] bg-gradient-to-r from-[#80C7F2] via-[#E4C1F9] to-[#FFB5B5] font-semibold hover:scale-105 transition-all"
        >
          Choose wisely!
        </button>
      </motion.div>
    </motion.div>
  )
}

export default HowToPlayModal
