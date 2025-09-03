import React from 'react';

// Data testimoni palsu
const testimonials = [
  {
    quote:
      'Materi yang diajarkan sangat relevan dengan industri saat ini. Saya berhasil mendapatkan pekerjaan pertama saya sebagai web developer berkat DiBelajar.in!',
    name: 'Ahmad Subarjo',
    role: 'Web Developer di TechCorp',
    avatar: 'https://placehold.co/100x100/E2E8F0/475569?text=AS',
  },
  {
    quote:
      'Sebagai seorang desainer, saya sangat terbantu dengan kursus-kursus di sini. Penjelasannya mudah dipahami bahkan untuk pemula. Highly recommended!',
    name: 'Siti Aminah',
    role: 'UI/UX Designer',
    avatar: 'https://placehold.co/100x100/E2E8F0/475569?text=SA',
  },
];

const TestimonialsSection = () => {
  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary">
            Apa Kata Mereka?
          </h2>
          <p className="mt-2 text-lg text-text-muted">
            Cerita sukses dari para pelajar kami.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-background p-8 rounded-lg border border-border"
            >
              <p className="text-text-muted italic">"{testimonial.quote}"</p>
              <div className="mt-4 flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold text-text-primary">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-text-muted">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
