import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials as initialTestimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
  rating = 5,
  date,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.2, 0.75)}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-black-200 p-8 rounded-3xl xs:w-[340px] w-full border border-white/10 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-[#915eff]/50 hover:-translate-y-1.5 group relative z-10"
  >
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-white font-black text-[44px] leading-none text-[#915eff]">"</p>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-[15px] ${
                i < rating ? "text-[#ffd166]" : "text-white/20"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <p className="text-white/90 tracking-wide text-[15px] leading-[26px] mt-2 italic">
        {testimonial}
      </p>
    </div>

    <div className="mt-6 flex justify-between items-center gap-3 pt-4 border-t border-white/10">
      <div className="flex-1 flex flex-col min-w-0">
        <p className="text-white font-semibold text-[15px] truncate">
          <span className="text-[#915eff]">@</span> {name}
        </p>
        <p className="text-secondary text-[12px] truncate">
          {designation ? designation : "Collaborator"}{" "}
          {company ? `at ${company}` : ""}
        </p>
        {date && (
          <span className="text-[11px] text-secondary/60 mt-0.5">{date}</span>
        )}
      </div>

      <img
        src={
          image ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
            name
          )}&backgroundColor=915eff,00cea8`
        }
        alt={`avatar-${name}`}
        className="w-11 h-11 rounded-full object-cover border border-[#915eff]/40 bg-tertiary shrink-0"
      />
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const [list, setList] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("portfolio_user_testimonials");
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (err) {
        console.error("Error reading testimonials from localStorage", err);
      }
    }
    return initialTestimonials || [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    testimonial: "",
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (ratingValue) => {
    setFormData((prev) => ({ ...prev, rating: ratingValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.testimonial.trim()) return;

    const newEntry = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        formData.name
      )}&backgroundColor=915eff,00cea8`,
    };

    const updated = [newEntry, ...list];
    setList(updated);
    try {
      localStorage.setItem("portfolio_user_testimonials", JSON.stringify(updated));
    } catch (err) {
      console.error("Could not save to localStorage", err);
    }

    setSubmitted(true);
    setFormData({
      name: "",
      designation: "",
      company: "",
      testimonial: "",
      rating: 5,
    });

    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <div className="mt-12 bg-black-100 rounded-[24px] overflow-hidden border border-white/5 relative z-10">
      <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[260px] flex flex-col md:flex-row md:items-center justify-between gap-6`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Endorsements & Feedback</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
          <p className="mt-2 text-secondary text-[15px] max-w-xl leading-[24px]">
            Have we worked together or collaborated on a project? Share your thoughts and experience below!
          </p>
        </motion.div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#915eff] to-[#804dee] text-white font-semibold text-[14px] shadow-[0_0_20px_rgba(145,94,255,0.4)] hover:shadow-[0_0_30px_rgba(145,94,255,0.7)] hover:scale-105 transition-all duration-300 w-fit cursor-pointer flex items-center gap-2 relative z-20 pointer-events-auto"
        >
          ✍️ Write a Testimonial
        </button>
      </div>

      {/* Testimonials List or Clean Empty State */}
      <div className={`-mt-12 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center relative z-10`}>
        {list.length > 0 ? (
          list.map((item, index) => (
            <FeedbackCard key={item.id || item.name + index} index={index} {...item} />
          ))
        ) : (
          <div className="w-full max-w-2xl bg-black-200/90 backdrop-blur-md p-10 rounded-3xl border border-white/10 text-center flex flex-col items-center shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#915eff]/20 border border-[#915eff]/40 flex items-center justify-center text-[28px] mb-4 shadow-[0_0_25px_rgba(145,94,255,0.3)]">
              💬
            </div>
            <h4 className="text-white font-bold text-[20px]">
              No testimonials yet!
            </h4>
            <p className="text-secondary text-[14px] max-w-md mt-2 leading-relaxed">
              Be the very first collaborator or client to share your experience working with Sriraam.
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="mt-6 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#915eff] to-[#804dee] text-white font-semibold text-[14px] shadow-lg hover:scale-105 transition-all cursor-pointer relative z-20 pointer-events-auto"
            >
              ✍️ Leave the First Testimonial
            </button>
          </div>
        )}
      </div>

      {/* Interactive Modal Submission Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#0e0a29] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-white font-bold text-[22px] flex items-center gap-2">
                    <span>💬</span> Add Your Testimonial
                  </h3>
                  <p className="text-secondary text-[13px] mt-1">
                    Your feedback will appear immediately on the website
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer text-[16px]"
                >
                  ✕
                </button>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-300 text-center font-medium">
                  <div className="text-[36px] mb-2">🎉</div>
                  <h4 className="text-[18px] font-bold text-white mb-1">Thank you!</h4>
                  <p className="text-[14px]">Your testimonial has been posted successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-[13px] font-medium block mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Connor"
                        className="w-full bg-tertiary p-3.5 rounded-xl text-white outline-none border border-white/10 focus:border-[#915eff] transition-colors text-[14px]"
                      />
                    </div>

                    <div>
                      <label className="text-white text-[13px] font-medium block mb-1.5">
                        Role / Designation (Optional)
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="e.g. Lead Engineer / Founder"
                        className="w-full bg-tertiary p-3.5 rounded-xl text-white outline-none border border-white/10 focus:border-[#915eff] transition-colors text-[14px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-[13px] font-medium block mb-1.5">
                        Company / Organization (Optional)
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Acme Tech"
                        className="w-full bg-tertiary p-3.5 rounded-xl text-white outline-none border border-white/10 focus:border-[#915eff] transition-colors text-[14px]"
                      />
                    </div>

                    <div>
                      <label className="text-white text-[13px] font-medium block mb-1.5">
                        Rating
                      </label>
                      <div className="flex items-center gap-2 p-2.5 bg-tertiary rounded-xl border border-white/10">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRating(star)}
                            className="text-[20px] focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                          >
                            <span
                              className={
                                star <= formData.rating
                                  ? "text-[#ffd166]"
                                  : "text-white/20"
                              }
                            >
                              ★
                            </span>
                          </button>
                        ))}
                        <span className="text-secondary text-[13px] ml-2">
                          {formData.rating} of 5 stars
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-white text-[13px] font-medium block mb-1.5">
                      Your Testimonial / Recommendation *
                    </label>
                    <textarea
                      rows={4}
                      name="testimonial"
                      required
                      value={formData.testimonial}
                      onChange={handleChange}
                      placeholder="Share your thoughts about working with Sriraam..."
                      className="w-full bg-tertiary p-3.5 rounded-xl text-white outline-none border border-white/10 focus:border-[#915eff] transition-colors resize-none text-[14px]"
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-white/5 text-secondary hover:text-white border border-white/10 text-[14px] transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#915eff] to-[#804dee] text-white font-semibold text-[14px] shadow-md hover:scale-105 transition-all cursor-pointer"
                    >
                      Post Testimonial
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");

