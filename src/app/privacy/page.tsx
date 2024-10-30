import { ReactNode } from 'react';
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";

export default function privacy() {
  return (
    <section>
      <Header></Header>
    <div className="bg-white text-gray-800 min-h-screen p-8 sm:p-12 lg:p-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">Privacy Policy</h1>
        <p className="text-center text-gray-600 mb-8">
          Last Updated: October 29, 2024
        </p>

        {/* Privacy Policy Sections */}
        <PrivacySection title="1. Introduction">
          Pantry of Pangaea ("Company," "we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy describes how we collect, use, and share information about you when you use our Platform.
        </PrivacySection>

        <PrivacySection title="2. Information We Collect">
          <p><strong>Account Information:</strong> When you create an account, we collect your name, email address, and any other information you provide.</p>
          <p><strong>Content Information:</strong> We collect content you post on Pantry of Pangaea, such as recipes, comments, and other user-generated content.</p>
          <p><strong>Usage Data:</strong> We automatically collect data on how you use our Platform, including IP address, device information, browser type, and operating system.</p>
          <p><strong>Cookies:</strong> We use cookies and similar tracking technologies to collect data about your browsing activity and preferences.</p>
        </PrivacySection>

        <PrivacySection title="3. How We Use Your Information">
          We use the information we collect to:
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-800">
            <li>Provide and improve our Platform and services.</li>
            <li>Personalize your experience by showing content relevant to your preferences.</li>
            <li>Respond to your inquiries and provide customer support.</li>
            <li>Send you updates, newsletters, and promotional materials (if you have opted in).</li>
            <li>Analyze usage patterns to improve user experience and develop new features.</li>
          </ul>
        </PrivacySection>

        <PrivacySection title="4. How We Share Your Information">
          We may share your information in the following cases:
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-800">
            <li><strong>Service Providers:</strong> We may share information with third-party vendors who help us operate our Platform.</li>
            <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our legal rights.</li>
            <li><strong>Business Transfers:</strong> If we undergo a merger, acquisition, or asset sale, your information may be transferred to the new entity.</li>
          </ul>
        </PrivacySection>

        <PrivacySection title="5. Your Rights and Choices">
          <p><strong>Access and Update:</strong> You may access and update your account information at any time.</p>
          <p><strong>Deletion:</strong> You may request the deletion of your account and personal information. We will delete your data unless we are legally required to retain it.</p>
          <p><strong>Opt-Out:</strong> You can opt out of receiving promotional communications from us by following the instructions in the messages or contacting us directly.</p>
        </PrivacySection>

        <PrivacySection title="6. Security of Your Information">
          We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
        </PrivacySection>

        <PrivacySection title="7. Children's Privacy">
          Pantry of Pangaea is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn that we have collected information from a child under 13, we will take steps to delete it.
        </PrivacySection>

        <PrivacySection title="8. Changes to This Privacy Policy">
          We may update this Privacy Policy from time to time. If we make significant changes, we will notify you via email or by posting a notice on our Platform. Your continued use of the Platform after any changes indicates your acceptance of the updated policy.
        </PrivacySection>

        <PrivacySection title="9. Contact Us">
          If you have any questions or concerns about this Privacy Policy or our practices, please contact us at <a href="mailto:pantryofpangaea@gmail.com" className="text-blue-600 mt-2">pantryofpangaea@gmail.com</a>
        </PrivacySection>
      </div>
    </div>
    <Footer></Footer>
    </section>
  );
}

// Reusable PrivacySection Component
interface PrivacySectionProps {
  title: string;
  children: ReactNode;
}

function PrivacySection({ title, children }: PrivacySectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h2>
      <div className="text-gray-800 leading-relaxed space-y-2">{children}</div>
    </section>
  );
}
