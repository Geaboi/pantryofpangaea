import { ReactNode } from 'react';
import { Footer } from "@/components/footer";

export default function TermsOfService() {
  return (
    <section>
    <div className="bg-white text-gray-800 min-h-screen p-8 sm:p-12 lg:p-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">Terms of Service</h1>
        <p className="text-center text-gray-600 mb-8">
          Last Updated: October 29, 2024
        </p>

        {/* Terms of Service Sections */}
        <TermsSection title="1. Acceptance of Terms">
          By accessing or using Pantry of Pangaea, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the Platform.
        </TermsSection>

        <TermsSection title="2. Description of Service">
          Pantry of Pangaea is a social media platform that enables users to share, discover, and save recipes from around the world. The Platform is provided "as is" without warranties, and Pantry of Pangaea reserves the right to modify, suspend, or discontinue any part of the Platform at any time.
        </TermsSection>

        <TermsSection title="3. Account Responsibilities">
          Users must provide accurate information when creating an account and are responsible for maintaining the confidentiality of their account details. You are liable for all activities that occur under your account.
        </TermsSection>

        <TermsSection title="4. User-Generated Content and Ownership">
          By posting recipes, comments, or other content on Pantry of Pangaea, you retain ownership of your content but grant Pantry of Pangaea a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display your content in connection with the Platform. We reserve the right to remove content that violates these Terms or our policies.
        </TermsSection>

        <TermsSection title="5. Prohibited Activities">
          Users may not engage in activities that disrupt or misuse the Platform, including posting offensive, illegal, or harmful content, engaging in harassment, or attempting to gain unauthorized access to other users’ accounts. Pantry of Pangaea reserves the right to terminate accounts for violations of these Terms.
        </TermsSection>

        <TermsSection title="6. Intellectual Property">
          All intellectual property rights in the Platform, including logos, trademarks, and content created by Pantry of Pangaea, are owned by the Company. Users may not use these without explicit permission from Pantry of Pangaea.
        </TermsSection>

        <TermsSection title="7. Privacy Policy">
          Your privacy is important to us. We collect and use personal information as described in our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>. By using the Platform, you consent to the collection and use of your data in accordance with this policy.
        </TermsSection>

        <TermsSection title="8. Limitation of Liability">
          Pantry of Pangaea and its affiliates will not be liable for any indirect, incidental, or special damages arising from your use of the Platform, including any data loss or content inaccuracies.
        </TermsSection>

        <TermsSection title="9. Indemnification">
          You agree to indemnify and hold harmless Pantry of Pangaea, its affiliates, and agents from any claims or losses resulting from your violation of these Terms or misuse of the Platform.
        </TermsSection>

        <TermsSection title="10. Termination of Access">
          Pantry of Pangaea reserves the right to suspend or terminate your account and access to the Platform if you violate these Terms or engage in any prohibited activities.
        </TermsSection>

        <TermsSection title="11. Modifications to the Terms">
          Pantry of Pangaea reserves the right to modify these Terms of Service at any time. Changes will be posted on this page, and continued use of the Platform signifies acceptance of the updated terms.
        </TermsSection>

        <TermsSection title="12. Governing Law and Dispute Resolution">
          These Terms of Service are governed by the laws of [Your Country/State]. Any disputes arising out of or related to these Terms will be resolved through arbitration in [Your Location].
        </TermsSection>

        {/* Contact Information */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Contact Us</h2>
          <p>If you have any questions about these Terms of Service, please contact us at:</p>
          <a href="mailto:pantryofpangaea@gmail.com" className="text-blue-600">pantryofpangaea@gmail.com</a>
        </section>
      </div>
    </div>
    <Footer></Footer>
    </section>
  );
}

// Reusable TermsSection Component
interface TermsSectionProps {
  title: string;
  children: ReactNode;
}

function TermsSection({ title, children }: TermsSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h2>
      <p className="text-gray-800 leading-relaxed">{children}</p>
    </section>
  );
}
