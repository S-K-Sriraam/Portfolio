import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { playChirp } from "../utils/sound";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [copied, setCopied] = useState(false);

  const contactEmail = "s.k.sriraam@gmail.com";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCopyEmail = () => {
    playChirp("click");
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playChirp("click");
    setStatus({ type: "", message: "" });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        type: "error",
        message: "Please fill in all fields before sending.",
      });
      return;
    }

    setLoading(true);

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID || "service_default";
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID || "template_default";
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY || "key_default";

    if (
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ) {
      emailjs
        .send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            to_name: "Sriraam S K",
            from_email: form.email,
            to_email: contactEmail,
            message: form.message,
          },
          publicKey
        )
        .then(
          () => {
            setLoading(false);
            setStatus({
              type: "success",
              message: "Thank you! I will get back to you as soon as possible.",
            });
            setForm({ name: "", email: "", message: "" });
          },
          (error) => {
            setLoading(false);
            console.error(error);
            setStatus({
              type: "error",
              message: "Something went wrong. Please try again or email me directly.",
            });
          }
        );
    } else {
      setTimeout(() => {
        setLoading(false);
        setStatus({
          type: "success",
          message: "Message dispatched! (Connect EmailJS keys in .env for production sending)",
        });
        setForm({ name: "", email: "", message: "" });
      }, 1000);
    }
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden items-stretch">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10"
      >
        <p className={styles.sectionSubText}>Transmission Terminal</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        
        <p className="mt-2 text-secondary text-[15px] leading-[26px]">
          Have a project in mind, want to collaborate, or explore technical solutions? Drop a message below and I will respond promptly.
        </p>

        {/* Quick info chips */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-tertiary/60 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[20px]">📧</span>
              <div>
                <p className="text-white text-[13px] font-semibold">Direct Email</p>
                <p className="text-secondary text-[12px] truncate max-w-[140px] sm:max-w-[160px]">
                  {contactEmail}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#915eff]/30 border border-white/10 text-[11px] font-mono text-[#00cea8] transition-all cursor-pointer"
            >
              {copied ? "Copied! ✓" : "Copy"}
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-tertiary/60 border border-white/10 flex items-center gap-3">
            <span className="text-[20px]">⚡</span>
            <div>
              <p className="text-white text-[13px] font-semibold">Availability</p>
              <p className="text-emerald-400 text-[12px] font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for Opportunities</span>
              </p>
            </div>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5"
        >
          <label className="flex flex-col">
            <span className="text-white font-semibold mb-2 text-[14px]">
              Your Name <span className="text-[#915eff]">*</span>
            </span>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={() => playChirp("hover")}
              placeholder="e.g. Alexander Pierce"
              className="bg-tertiary py-3.5 px-5 placeholder:text-secondary/70 text-white rounded-xl outline-none border border-white/10 font-medium focus:border-[#915eff] focus:shadow-[0_0_15px_rgba(145,94,255,0.3)] transition-all text-[14px]"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-semibold mb-2 text-[14px]">
              Your Email Address <span className="text-[#915eff]">*</span>
            </span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={() => playChirp("hover")}
              placeholder="e.g. alexander@example.com"
              className="bg-tertiary py-3.5 px-5 placeholder:text-secondary/70 text-white rounded-xl outline-none border border-white/10 font-medium focus:border-[#915eff] focus:shadow-[0_0_15px_rgba(145,94,255,0.3)] transition-all text-[14px]"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-semibold mb-2 text-[14px]">
              Your Message <span className="text-[#915eff]">*</span>
            </span>
            <textarea
              rows={5}
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              onFocus={() => playChirp("hover")}
              placeholder="Tell me about your project, idea, or inquiry..."
              className="bg-tertiary py-3.5 px-5 placeholder:text-secondary/70 text-white rounded-xl outline-none border border-white/10 font-medium focus:border-[#915eff] focus:shadow-[0_0_15px_rgba(145,94,255,0.3)] transition-all resize-none text-[14px] leading-relaxed"
            />
          </label>

          {status.message && (
            <div
              className={`p-4 rounded-xl text-sm font-medium ${
                status.type === "success"
                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                  : "bg-red-500/20 text-red-300 border border-red-500/30"
              }`}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            onMouseEnter={() => playChirp("hover")}
            className="mt-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#915eff] to-[#804dee] text-white font-semibold text-[14px] shadow-[0_0_20px_rgba(145,94,255,0.4)] hover:shadow-[0_0_30px_rgba(145,94,255,0.7)] hover:scale-105 transition-all duration-300 cursor-pointer disabled:opacity-50 w-fit flex items-center gap-2"
          >
            <span>{loading ? "Transmitting..." : "Send Message"}</span>
            <span>✉️</span>
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] min-h-[350px] relative"
      >
        <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-mono text-[#00cea8] pointer-events-none">
          🌍 3D Orbital Canvas (Interactive)
        </div>
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
