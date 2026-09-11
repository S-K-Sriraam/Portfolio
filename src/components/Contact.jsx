import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        type: "error",
        message: "Please fill in all fields before sending.",
      });
      return;
    }

    setLoading(true);

    // EmailJS credentials or graceful simulation
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
            to_email: "sriraam@example.com",
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
      // Graceful fallback for local development / unconfigured keys
      setTimeout(() => {
        setLoading(false);
        setStatus({
          type: "success",
          message: "Message received! (Connect EmailJS keys in .env for production sending)",
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
        <p className={styles.sectionSubText}>Let's Connect</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        
        <p className="mt-2 text-secondary text-[15px] leading-[26px]">
          Have a project in mind, want to collaborate, or just say hi? Drop a message below and I'll get back to you promptly.
        </p>

        {/* Quick info chips */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-tertiary/60 border border-white/10 flex items-center gap-3">
            <span className="text-[20px]">📍</span>
            <div>
              <p className="text-white text-[13px] font-semibold">Location</p>
              <p className="text-secondary text-[12px]">Tamil Nadu, India</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-tertiary/60 border border-white/10 flex items-center gap-3">
            <span className="text-[20px]">⚡</span>
            <div>
              <p className="text-white text-[13px] font-semibold">Collaboration</p>
              <p className="text-emerald-400 text-[12px] font-medium">Open for Opportunities</p>
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
              placeholder="e.g. Alexander Pierce"
              className="bg-tertiary py-3.5 px-5 placeholder:text-secondary/70 text-white rounded-xl outline-none border border-white/10 font-medium focus:border-[#915eff] transition-colors text-[14px]"
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
              placeholder="e.g. alexander@example.com"
              className="bg-tertiary py-3.5 px-5 placeholder:text-secondary/70 text-white rounded-xl outline-none border border-white/10 font-medium focus:border-[#915eff] transition-colors text-[14px]"
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
              placeholder="Tell me about your project, idea, or inquiry..."
              className="bg-tertiary py-3.5 px-5 placeholder:text-secondary/70 text-white rounded-xl outline-none border border-white/10 font-medium focus:border-[#915eff] transition-colors resize-none text-[14px] leading-relaxed"
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
            className="mt-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#915eff] to-[#804dee] text-white font-semibold text-[14px] shadow-[0_0_20px_rgba(145,94,255,0.4)] hover:shadow-[0_0_30px_rgba(145,94,255,0.7)] hover:scale-105 transition-all duration-300 cursor-pointer disabled:opacity-50 w-fit flex items-center gap-2"
          >
            <span>{loading ? "Sending..." : "Send Message"}</span>
            <span>✉️</span>
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] min-h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");