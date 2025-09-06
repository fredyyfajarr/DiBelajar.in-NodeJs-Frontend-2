/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      'Materi sangat relevan, membantu saya menjadi web developer di TechCorp!',
    name: 'Fredy Fajar',
    role: 'Web Developer',
    avatar: 'https://placehold.co/100x100/E2E8F0/475569?text=FF',
  },
  {
    quote: 'Kursus desainnya luar biasa, sangat membantu pemula seperti saya!',
    name: 'Kevin Ardiansyah',
    role: 'UI/UX Designer',
    avatar: 'https://placehold.co/100x100/E2E8F0/475569?text=KA',
  },
  {
    quote: 'Kursusnya sangat menarik, membantu saya menjadi Cloud Engineer!',
    name: 'Eka Revandi',
    role: 'Cloud Engineer',
    avatar: 'https://placehold.co/100x100/E2E8F0/475569?text=ER',
  },
  {
    quote: 'Kursusnya sangat membantu, membantu saya menjadi Mobile Developer!',
    name: 'Yudi Setiawan',
    role: 'Mobile Developer',
    avatar: 'https://placehold.co/100x100/E2E8F0/475569?text=YS',
  },
];

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Pengalaman nyata dari pelajar kami.
          </p>
        </div>
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
