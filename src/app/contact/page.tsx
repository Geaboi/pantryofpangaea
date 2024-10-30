"use client";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useState } from "react";


export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (response.ok) {
      setStatus('Email sent successfully!');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } else {
      setStatus('Failed to send email. Please try again later.');
    }
  };

  return (
    <section className="bg-white">
      <Header />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center mb-6 text-black">Contact Us</h1>

        <p className="text-center text-gray-600 mb-8">
          Have questions, feedback, or need help? Get in touch with us using the form below.
        </p>

        {/* Contact Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none text-black"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none text-black"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none text-black"
            required
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none h-32 text-black"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        {status && <p className="text-center mt-4 text-gray-600">{status}</p>}

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">Or reach us at:</p>
          <a href="mailto:pantryofpangaea@gmail.com" className="text-blue-600">pantryofpangaea@gmail.com</a>
          <p className="text-gray-600 mt-4">Follow us on:</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://twitter.com" target="_blank" className="text-blue-500 hover:underline">
              Twitter
            </a>
            <a href="https://facebook.com" target="_blank" className="text-blue-500 hover:underline">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" className="text-blue-500 hover:underline">
              Instagram
            </a>
          </div>
        </div>

        {/* Disclaimer and Privacy Notice */}
        <p className="mt-8 text-center text-gray-500 text-sm">
          We aim to respond within 24-48 hours. By contacting us, you agree to our{" "}
          <a href="/tos" className="text-blue-600 hover:underline">Terms of Service</a>.
        </p>
      </div>
      <Footer />
    </section>
  );
}
