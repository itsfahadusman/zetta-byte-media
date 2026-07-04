// src/app/faq/page.js

"use client";

export default function FAQPage() {
  const faqs = [
    {
      question: "How can I purchase Al-Fateh machines?",
      answer:
        "You can contact us via the Contact page, email info@alfateh.com, or call +92 42 99031000. Provide the machine type, quantity, and delivery location, and our team will assist you promptly.",
    },
    {
      question: "What types of agricultural machinery do you offer?",
      answer:
        "Al-Fateh provides a wide range of machinery including harvesters, cultivators, ploughs, balers, sprayers, trailers, and rotary cutters — all designed for efficiency and durability.",
    },
    {
      question: "Do you provide after-sales support?",
      answer:
        "Yes. Our support team assists with maintenance, spare parts, technical guidance, and troubleshooting to ensure optimal machine performance.",
    },
    {
      question: "Can I request customization for my machinery?",
      answer:
        "Absolutely. We offer customization options to meet your specific farm requirements, ensuring each machine is optimized for your operations.",
    },
    {
      question: "What is your delivery timeline?",
      answer:
        "Delivery timelines depend on the machine type and stock availability. Our team will provide an estimated delivery schedule upon order confirmation.",
    },
    {
      question: "Do you offer training for using the machines?",
      answer:
        "Yes. Al-Fateh provides on-site and virtual training sessions to ensure operators can safely and efficiently use the machinery.",
    },
  ];

  return (
    <main className="bg-[#ebfadd] text-[#112f15] py-20 px-6 sm:px-10 lg:px-16 min-h-screen relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute -top-40 -left-48 w-[40rem] h-[40rem] bg-[#be6404]/10 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-[-25rem] right-[-15rem] w-[35rem] h-[35rem] bg-[#eb9502]/10 rounded-full blur-3xl opacity-40 -z-10" />

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#be6404] to-[#eb9502] bg-clip-text text-transparent leading-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-[#112f15]/70 mt-4 text-base sm:text-lg leading-relaxed">
          Find answers to common questions about our machinery, services, delivery, and support.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="bg-white border border-[#be6404]/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <summary className="font-semibold text-lg mb-2 list-none text-[#112f15]">
              {faq.question}
            </summary>
            <p className="mt-3 text-[#112f15]/80 text-sm leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-12 text-center text-sm text-[#112f15]/80">
        Still have questions?{" "}
        <a href="/contact" className="text-[#be6404] font-medium underline">
          Contact us
        </a>{" "}
        or call <strong>+92 42 99031000</strong>.
      </div>
    </main>
  );
}
