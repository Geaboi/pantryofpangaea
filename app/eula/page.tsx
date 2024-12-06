import { ReactNode } from "react";

export default function EULA() {
    return (
      <div className="text-gray-800 min-h-screen p-8 sm:p-12 lg:p-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">End User License Agreement (EULA)</h1>
          <p className="text-center text-gray-600 mb-8">
            Last Updated: October 29, 2024
          </p>
  
          {/* Introduction */}
          <section className="mb-8">
            <p className="leading-relaxed">
              This End User License Agreement ("Agreement") is a legal agreement between you ("User" or "you") and <strong>Pantry of Pangaea</strong> ("Company," "we," "us," or "our") concerning your access to and use of our recipe-sharing social media website and services ("Platform").
            </p>
            <p className="leading-relaxed mt-4">
              By accessing or using Pantry of Pangaea, you agree to be bound by this Agreement. If you do not agree to the terms of this Agreement, do not access or use our Platform.
            </p>
          </section>
  
          {/* Sections */}
          <Section title="1. Grant of License">
            <p>Pantry of Pangaea grants you a limited, non-exclusive, non-transferable license to access and use the Platform for personal, non-commercial purposes in accordance with this Agreement.</p>
            <p>You may not copy, modify, distribute, sell, or lease any part of the Platform without written permission from us.</p>
          </Section>
  
          <Section title="2. User Responsibilities and Conduct">
            <p><strong>Account Requirements:</strong> You may need to create an account and provide accurate information. Users must be at least 13 years old to use the Platform, and if under 18, they need parental consent.</p>
            <p><strong>Compliance:</strong> You agree to comply with all applicable laws and refrain from posting offensive, illegal, or inappropriate content.</p>
          </Section>
  
          <Section title="3. User-Generated Content">
            <p><strong>Content Ownership:</strong> By sharing content on Pantry of Pangaea, you retain ownership but grant us a license to use, modify, and distribute your content within the Platform.</p>
            <p><strong>Content Moderation:</strong> We reserve the right to remove content that violates this Agreement or our policies.</p>
          </Section>
  
          <Section title="4. Intellectual Property Rights">
            <p>Pantry of Pangaea, its content, logos, and all intellectual property rights are owned by the Company. You may not use our branding without permission.</p>
          </Section>
  
          <Section title="5. Privacy and Data Collection">
            <p>We collect personal data to improve the Platform’s functionality. By using the Platform, you consent to data collection as outlined in our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
          </Section>
  
          <Section title="6. License Termination">
            <p>Pantry of Pangaea reserves the right to terminate your account if you violate this Agreement.</p>
          </Section>
  
          <Section title="7. Disclaimer of Warranties">
            <p>The Platform is provided "AS IS" without warranties. We do not guarantee the accuracy of content or availability of services.</p>
          </Section>
  
          <Section title="8. Limitation of Liability">
            <p>To the extent permitted by law, Pantry of Pangaea will not be liable for indirect, incidental, or special damages arising from your use of the Platform.</p>
          </Section>
  
          <Section title="9. Indemnification">
            <p>You agree to indemnify Pantry of Pangaea from any claims or losses resulting from your use of the Platform.</p>
          </Section>
  
          <Section title="10. Modification of Terms">
            <p>We may modify this Agreement at any time. Continued use of the Platform indicates your acceptance of the new terms.</p>
          </Section>
  
          <Section title="11. Miscellaneous">
            <p><strong>Entire Agreement:</strong> This Agreement represents the entire understanding between you and Pantry of Pangaea regarding the Platform.</p>
            <p><strong>Severability:</strong> If any provision is deemed invalid, the remaining provisions shall remain in effect.</p>
          </Section>
  
          {/* Contact Information */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Contact Us</h2>
            <p>If you have questions about this Agreement, please contact us at:</p>
            <a href="mailto:pantryofpangaea2@gmail.com"className="text-blue-600">pantryofpangaea2@gmail.com</a>
          </section>
        </div>
      </div>
    );
  }
  
  interface sectionParams{
    title: string;
    children: ReactNode;
  }
  // Reusable Section Component
  function Section({title, children}: sectionParams) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h2>
        <div className="text-gray-800 leading-relaxed space-y-2">{children}</div>
      </section>
    );
  }
  