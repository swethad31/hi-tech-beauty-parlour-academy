import React, { useState, useEffect } from "react";
import { Instagram, Phone, MapPin, Star, Menu, X, Mail, Sparkles, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { galleryData } from "./constants/gallery";

export default function App() {
  const [activeTab, setActiveTab] = useState('portraits');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const closePopup = () => setPopupInfo(null);

  // --- SCREEN GUARD PROTECTION ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "PrintScreen" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        navigator.clipboard.writeText("");
        alert("Content Protected.");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const services = [
    { title: "Skin Glow & Facials", desc: "Basic to Advanced Facials (Gold, Hydra, Whitening), De-Tan, and premium Bleach options." },
    { title: "Threading & Waxing", desc: "Precision Eyebrow shaping, Full face threading, and hygienic face/body waxing." },
    { title: "Hand & Foot Care", desc: "Relaxing Spa Manicures and Pedicures including specialized Foot Therapy packs." },
    { title: "Hair Cuts & Colouring", desc: "Expert styling (Layer, Feather, Deep V) and professional coloring with highlight streaks." },
    { title: "Hair Styling & Texturizing", desc: "Permanent Straightening, Smoothening, Crimping, and premium Blow Dry styling." },
    { title: "Hair Therapy & Spa", desc: "Keratin Spa, Repairing Creambaths, Hot Oil Massages, and Anti-dandruff treatments." },
    { title: "Bridal & Make-up Studio", desc: "HD Pro Bridal packages, Muhurtham looks, Saree Draping, and Dance styling." },
    { title: "Specialty Services", desc: "Traditional Mehndi designs, Ear/Nose Piercing, and professional Warts Removal." }
  ];

  return (
    <div
      className="min-h-screen bg-black text-white font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden"
      onContextMenu={(e) => e.preventDefault()}
    >

      {/* --- IMAGE LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-10 right-10 text-[#D4AF37] z-[510]">
              <XCircle size={48} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              src={selectedImage}
              className="max-h-full max-w-full rounded-lg shadow-2xl border border-[#D4AF37]/30"
              alt="Gallery Preview"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- POPUPS --- */}
      <AnimatePresence>
        {popupInfo && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-zinc-900 border-2 border-[#D4AF37] p-10 md:p-20 rounded-[2rem] text-center max-w-2xl w-full shadow-[0_0_80px_rgba(212,175,55,0.3)] mx-auto overflow-hidden"
            >
              <button onClick={closePopup} className="absolute top-8 right-8 text-gray-500 hover:text-[#D4AF37] p-2 transition-colors">
                <X size={32} />
              </button>

              {popupInfo.type === 'qr' ? (
                <div className="flex flex-col items-center">
                  <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-8">Review Us on Google</h4>
                  <img src="/images/qr/qr.png" alt="QR Code" className="w-64 h-64 bg-white p-2 rounded-xl mb-6 shadow-2xl" />
                  <p className="text-gray-400 text-sm italic">"Beauty is our Duty" — Rate us</p>
                </div>
              ) : (
                <>
                  <div className="bg-[#D4AF37]/10 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[inset_0_0_20px_rgba(212,175,55,0.2)]">
                    {popupInfo.type === 'phone' ? <Phone color="#D4AF37" size={48} /> : <Mail color="#D4AF37" size={48} />}
                  </div>
                  <h4 className="text-[#D4AF37] font-bold uppercase tracking-[0.5em] text-xs mb-6 opacity-80">{popupInfo.label}</h4>
                  <p className={`font-bold tracking-tight text-white mb-12 px-2 leading-snug break-all md:break-words ${popupInfo.type === 'mail' ? 'text-xl md:text-3xl' : 'text-3xl md:text-5xl'}`}>
                    {popupInfo.value}
                  </p>
                  <button onClick={closePopup} className="w-full py-6 bg-[#D4AF37] text-black rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:bg-white transition-all shadow-lg">
                    Close Window
                  </button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-[100] bg-[#8B0000] border-b border-white/10 px-6 py-4 flex justify-between items-center shadow-2xl">
        <div className="flex flex-col text-left">
          <h1 className="text-xl font-semibold tracking-wide text-white">HI-TECH</h1>
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#D4AF37]">Bridal Studio and Academy</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-widest font-bold items-center text-white">
          <a href="#services" className="hover:text-[#D4AF37] transition-colors">Services</a>
          <a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Portfolio</a>

          <div className="flex items-center gap-5 border-l border-white/20 pl-6">
            <a href="#location" title="Location" className="text-[#D4AF37] hover:scale-110 transition-transform"><MapPin size={20} /></a>
            <button onClick={() => setPopupInfo({ type: 'qr' })} title="Reviews" className="text-[#D4AF37] hover:scale-110 transition-transform"><Star size={20} /></button>
            <a href="https://www.instagram.com/selviselvakumar_mua/" target="_blank" rel="noreferrer" title="Instagram" className="text-[#D4AF37] hover:scale-110 transition-transform"><Instagram size={20} /></a>

            <div className="flex items-center gap-3 bg-white/10 p-1 rounded-lg px-3">
              <button
                onClick={() => setPopupInfo({ type: 'phone', label: 'Call Us', value: '99629 79040' })}
                className="text-[#D4AF37] hover:scale-110 transition-transform border-r border-white/20 pr-3"
              >
                <Phone size={18} />
              </button>
              <button
                onClick={() => setPopupInfo({ type: 'phone', label: 'Call Us', value: '99629 79040' })}
                className="hover:text-[#D4AF37] transition-all font-black tracking-widest text-white"
              >
                BOOKING
              </button>
            </div>
          </div>
        </div>

        {/* Hamburger Button */}
        <button className="md:hidden text-white z-[110] p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-[#8B0000] z-[105] flex flex-col items-center justify-center gap-10 md:hidden"
            >
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold tracking-[0.2em] text-white hover:text-[#D4AF37] transition-colors">SERVICES</a>
              <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold tracking-[0.2em] text-white hover:text-[#D4AF37] transition-colors">PORTFOLIO</a>
              <a href="#location" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold tracking-[0.2em] text-white hover:text-[#D4AF37] transition-colors">LOCATION</a>

              <div className="flex gap-12 mt-4">
                <a href="https://www.instagram.com/selviselvakumar_mua/" target="_blank" rel="noreferrer" className="text-[#D4AF37] scale-150"><Instagram size={24} /></a>
                <button onClick={() => { setPopupInfo({ type: 'phone', label: 'Call Us', value: '99629 79040' }); setIsMenuOpen(false); }} className="text-[#D4AF37] scale-150"><Phone size={24} /></button>
              </div>

              <button
                onClick={() => { setPopupInfo({ type: 'phone', label: 'Call Us', value: '99629 79040' }); setIsMenuOpen(false); }}
                className="mt-8 px-12 py-5 bg-[#D4AF37] text-black font-black rounded-full tracking-[0.2em] shadow-2xl active:scale-95 transition-transform"
              >
                BOOK NOW
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative w-full h-[85vh] md:h-[90vh] bg-black overflow-hidden flex flex-col mt-[68px]">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full w-full gap-[2px]">
          {(galleryData.heroGrid || []).map((url, idx) => (
            <div key={idx} className="relative h-full w-full overflow-hidden group">
              <motion.img
                initial={{ scale: 1 }}
                whileHover={{ scale: 0.95 }}
                transition={{ duration: 1, ease: "easeOut" }}
                src={url}
                className="w-full h-full object-cover object-top md:object-[center_20%] opacity-60 group-hover:opacity-100 transition-all duration-700"
                alt="Hero"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-[5]" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20">
          <h2 className="text-5xl md:text-8xl font-serif mb-6 drop-shadow-2xl text-white">
            Artistry in <br /><span className="italic font-light">Excellence</span>
          </h2>
          <div className="pointer-events-auto">
            <button
              onClick={() => setPopupInfo({ type: 'phone', label: 'Call Us', value: '99629 79040' })}
              className="px-10 py-5 bg-[#D4AF37] text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform inline-block shadow-2xl"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </header>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="px-6 py-28 bg-[#0A0A0A] relative border-y border-white/5 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.3em] text-[#D4AF37] flex items-center justify-center gap-4">
            <Sparkles color="#D4AF37" size={28} /> Our Services
          </h3>
          <div className="h-1 w-20 bg-[#D4AF37] mx-auto mt-6 rounded-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -15, boxShadow: "0 20px 40px rgba(212,175,55,0.15)" }}
                className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl group transition-all text-left flex flex-col justify-between hover:border-[#D4AF37]/50"
              >
                <div>
                  <div className="mb-4 w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors duration-500">
                    <Star size={20} className="text-[#D4AF37] group-hover:text-black transition-colors" />
                  </div>
                  <h4 className="text-[#D4AF37] font-extrabold uppercase tracking-[0.2em] text-[13px] mb-4">
                    {service.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors duration-500">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-8 h-0.5 w-0 group-hover:w-full bg-[#D4AF37] transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section id="gallery" className="px-4 md:px-6 py-24 bg-black">
        <h3 className="text-2xl font-semibold mb-10 text-center uppercase tracking-widest text-[#D4AF37]">Our Portfolio</h3>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 border-b border-white/10 pb-4 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {Object.keys(galleryData).filter(k => k !== 'heroGrid').map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] uppercase tracking-widest transition-all px-2 py-1 ${activeTab === tab ? 'text-[#D4AF37] font-bold border-b-2 border-[#D4AF37]' : 'text-gray-500 hover:text-white'}`}
            >
              {tab === 'magicMakeovers' ? 'Makeovers' : tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <AnimatePresence mode="popLayout">
            {(galleryData[activeTab] || []).map((src) => (
              <motion.div
                layout key={src} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="overflow-hidden rounded-sm border border-white/5 aspect-[4/5] bg-zinc-900 touch-manipulation relative group cursor-zoom-in"
                onClick={() => setSelectedImage(src)}
              >
                <img src={src} alt="Portfolio" className="w-full h-full object-cover object-top transition duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="location" className="px-8 py-7 border-t border-white/10 bg-black text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 text-center md:text-left">

          {/* QR Code */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-8">Review Us on Google</h4>
            <div className="bg-white p-3 rounded-lg mb-6 inline-block">
              <img src="/images/qr/qr.png" alt="QR" className="w-28 h-28 object-contain" />
            </div>
            <p className="text-gray-400 italic text-sm">"Beauty is our Duty" — Rate us</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-white/5 py-16 md:py-0">
            <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-10 text-center">Contact Information</h4>
            <span className="text-[#D4AF37] font-serif text-2xl italic mb-2 tracking-wide">Selvi</span>
            <button
              onClick={() => setPopupInfo({ type: 'phone', label: 'Call for Appointment', value: '99629 79040' })}
              className="text-4xl font-bold hover:text-[#D4AF37] transition-colors mb-8 italic tracking-tighter cursor-pointer text-white"
            >
              99629 79040
            </button>
            <div className="flex gap-10">
              <a href="https://www.instagram.com/selviselvakumar_mua/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-all"><Instagram color="#D4AF37" size={32} /></a>
              <button onClick={() => setPopupInfo({ type: 'phone', label: 'Direct Call', value: '99629 79040' })} className="hover:scale-110 transition-all cursor-pointer"><Phone color="#D4AF37" size={32} /></button>
              <button onClick={() => setPopupInfo({ type: 'mail', label: 'Official Email', value: 'selviselvakumar.mua@gmail.com' })} className="hover:scale-110 transition-all cursor-pointer"><Mail color="#D4AF37" size={32} /></button>
            </div>
          </div>

          {/* Map */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-10">Visit Our Studio</h4>
            <div className="text-center md:text-right mb-8 text-sm leading-relaxed">
              <p className="font-bold text-lg text-white">No. 144, Cuddalore Main Road,</p>
              <p className="text-gray-400">Thavalakuppam, Puducherry - 605 007.</p>
            </div>
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-white/5 shadow-2xl relative">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3904.5813806925357!2d79.79047297453087!3d11.864548488182747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a549f420c5ea2eb%3A0x9f3ae4f26bf5a2dc!2sHi-Tech%20Beauty%20Parlour%20and%20Academy!5e0!3m2!1sen!2sin!4v1774606422854!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              {/* Overlay to prevent accidental scroll-zoom */}
              <div className="absolute inset-0 bg-transparent z-10" onContextMenu={(e) => e.preventDefault()} />
            </div>
          </div>

        </div>

        {/* --- COPYRIGHT BAR --- */}
        <div className="mt-5 pt-6 border-t border-white/5 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold text-center">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <p>© {new Date().getFullYear()} HI-TECH BRIDAL STUDIO & ACADEMY.</p>
                <span className="hidden md:block text-white/10">|</span>
                <p className="text-[#D4AF37]/50">ALL RIGHTS RESERVED</p>
            </div>
        </div>
      </footer>

    </div>
  );
}
