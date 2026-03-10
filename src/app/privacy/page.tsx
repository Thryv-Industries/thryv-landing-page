import type { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Privacy Policy — Thryv',
  description: 'Privacy Policy for AI Fit Tracker (Thryv) — how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-28 pb-20 px-6"
        style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)' }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Page title */}
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--brand-red)' }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm mb-12" style={{ color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-secondary)' }}>Effective Date:</strong>{' '}
            [INSERT EFFECTIVE DATE]
          </p>

          <div
            className="prose-privacy space-y-10"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: '1.8' }}
          >
            {/* Intro */}
            <section>
              <p>
                Welcome to <strong style={{ color: 'var(--text-primary)' }}>AI Fit Tracker</strong> (&ldquo;the App&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), operated by{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Thryv</strong> (&ldquo;Company&rdquo;),
                registered in <strong style={{ color: 'var(--text-primary)' }}>Egypt</strong>.
              </p>
              <p className="mt-4">
                This Privacy Policy explains how we collect, use, store, and protect your personal
                information when you use our mobile application. By creating an account or using the
                App, you agree to the practices described in this policy.
              </p>
              <p className="mt-4">
                If you do not agree with this policy, please do not use the App.
              </p>
            </section>

            <Divider />

            {/* 1 */}
            <Section title="1. Information We Collect">
              <SubSection title="1.1 Account Data">
                <ul>
                  <li><strong>Email address</strong> — used to create and manage your account.</li>
                  <li><strong>Password</strong> — stored exclusively as a secure, one-way cryptographic hash. We never store or transmit your password in plaintext.</li>
                </ul>
              </SubSection>

              <SubSection title="1.2 Personal Metrics">
                <ul>
                  <li>Height, weight, age, and gender</li>
                  <li>Fitness goal (e.g., weight loss, muscle gain, maintenance)</li>
                </ul>
                <p>These are provided voluntarily during onboarding and are used to personalise your experience.</p>
              </SubSection>

              <SubSection title="1.3 Health & Fitness Data">
                <ul>
                  <li>Workout logs: exercises performed, sets, reps, and weights</li>
                  <li>Body measurements: weight entries, body fat percentage, waist circumference, and other tracked metrics</li>
                  <li>Workout streaks, session history, and consistency records</li>
                </ul>
              </SubSection>

              <SubSection title="1.4 Nutrition Data">
                <ul>
                  <li>Food logs and meal types (breakfast, lunch, dinner, snacks)</li>
                  <li>Calorie counts and macronutrient breakdowns (protein, carbohydrates, fat)</li>
                </ul>
              </SubSection>

              <SubSection title="1.5 Achievement Data">
                <ul>
                  <li>Badges earned, personal records, and milestone notifications</li>
                </ul>
              </SubSection>

              <SubSection title="1.6 Device & Usage Data">
                <ul>
                  <li>App usage analytics (e.g., feature interactions, session duration) may be collected to improve the App. No personally identifiable device fingerprints are collected.</li>
                  <li>Theme preferences and session tokens are stored locally on your device via AsyncStorage.</li>
                </ul>
              </SubSection>

              <SubSection title="1.7 What We Do NOT Collect">
                <ul>
                  <li>Precise or approximate location data</li>
                  <li>Camera or microphone access</li>
                  <li>Social login credentials (we use email/password only)</li>
                  <li>Payment or financial information</li>
                  <li>Any data from advertising or analytics SDKs — we use none</li>
                </ul>
              </SubSection>
            </Section>

            <Divider />

            {/* 2 */}
            <Section title="2. How We Use Your Data">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Create and authenticate your account</li>
                <li>Display and sync your fitness, nutrition, and health data across your devices</li>
                <li>Calculate progress metrics, streaks, and personalised recommendations</li>
                <li>Send important service notifications (e.g., password reset emails)</li>
                <li>Improve App stability and performance through anonymous usage analytics</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="mt-4">
                We do <strong style={{ color: 'var(--text-primary)' }}>not</strong> use your data for
                advertising, profiling for third-party marketing, or any purpose beyond operating and
                improving the App.
              </p>
            </Section>

            <Divider />

            {/* 3 */}
            <Section title="3. How Your Data Is Stored & Protected">
              <SubSection title="3.1 Cloud Infrastructure">
                <p>
                  Your account and health data are stored on servers managed by{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Supabase</strong>, a cloud
                  database and authentication provider. You can review Supabase&apos;s security and privacy
                  practices at{' '}
                  <a
                    href="https://supabase.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--brand-red)' }}
                  >
                    https://supabase.com/privacy
                  </a>
                  .
                </p>
                <p className="mt-3">
                  Supabase uses PostgreSQL databases hosted on secure cloud infrastructure with
                  encryption at rest and in transit (TLS/SSL).
                </p>
              </SubSection>

              <SubSection title="3.2 Local Storage">
                <p>
                  Theme preferences and session tokens are stored locally on your device using
                  AsyncStorage. This data never leaves your device except as part of standard
                  authenticated API communication.
                </p>
              </SubSection>

              <SubSection title="3.3 Security Measures">
                <ul>
                  <li>All data transmitted between the App and our servers is encrypted using TLS.</li>
                  <li>Passwords are hashed using a strong one-way algorithm and are never stored or logged in plaintext.</li>
                  <li>Access to the database is restricted to authorised services only.</li>
                  <li>We regularly review our security practices to guard against unauthorised access, disclosure, or loss.</li>
                </ul>
                <p className="mt-3">
                  No method of transmission or storage is 100% secure. While we take reasonable
                  precautions, we cannot guarantee absolute security. In the event of a data breach
                  that affects your rights, we will notify you as required by applicable law.
                </p>
              </SubSection>
            </Section>

            <Divider />

            {/* 4 */}
            <Section title="4. Sensitivity of Health Data">
              <p>
                We recognise that fitness, nutrition, and body measurement data is sensitive. We
                treat this data with additional care:
              </p>
              <ul>
                <li>Health data is stored in your private account and is never shared with other users.</li>
                <li>We do not sell, rent, or license your health data to any third party under any circumstances.</li>
                <li>Health data is used exclusively to provide the App&apos;s core features to you personally.</li>
                <li>Aggregate, anonymised, and non-identifiable statistical data may be used internally to improve App features.</li>
              </ul>
            </Section>

            <Divider />

            {/* 5 */}
            <Section title="5. Data Sharing & Third Parties">
              <p>
                We do <strong style={{ color: 'var(--text-primary)' }}>not sell</strong> your personal
                data. We share data only in the following limited circumstances:
              </p>
              <ul>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>Service Providers:</strong> Supabase
                  processes data on our behalf as described in Section 3. They are contractually
                  obligated to protect your data and may not use it for their own purposes.
                </li>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>Legal Requirements:</strong> We may
                  disclose data if required by law, court order, or to protect the rights and safety
                  of our users or the public.
                </li>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>Business Transfers:</strong> In the
                  event of a merger, acquisition, or sale of assets, your data may be transferred as
                  part of that transaction. We will notify you before your data becomes subject to a
                  different privacy policy.
                </li>
              </ul>
              <p className="mt-4">No advertising SDKs or third-party analytics services are embedded in this App.</p>
            </Section>

            <Divider />

            {/* 6 */}
            <Section title="6. Data Retention">
              <p>
                We retain your personal data for as long as your account is active. If you delete
                your account, all associated data — including workout logs, nutrition logs, body
                measurements, and account credentials — is permanently deleted within{' '}
                <strong style={{ color: 'var(--text-primary)' }}>30 days</strong>.
              </p>
              <p className="mt-4">
                Anonymised or aggregated data that cannot identify you may be retained indefinitely
                for product analytics purposes.
              </p>
            </Section>

            <Divider />

            {/* 7 */}
            <Section title="7. Your Rights">
              <p>
                Depending on your country of residence, you may have the following rights regarding
                your personal data:
              </p>
              <ul>
                <li><strong style={{ color: 'var(--text-primary)' }}>Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Correction:</strong> Update or correct inaccurate data directly in the App settings, or by contacting us.</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Deletion:</strong> Request permanent deletion of your account and all associated data (see Section 8).</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Portability:</strong> Request an export of your data in a structured, machine-readable format.</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Restriction:</strong> Request that we limit processing of your data in certain circumstances.</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Objection:</strong> Object to processing based on legitimate interests.</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time without affecting prior processing.</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:yassinkassem29@gmail.com" style={{ color: 'var(--brand-red)' }}>
                  yassinkassem29@gmail.com
                </a>
                . We will respond within <strong style={{ color: 'var(--text-primary)' }}>30 days</strong>.
              </p>
              <p className="mt-4">
                If you are located in the European Economic Area (EEA) and believe we are handling
                your data unlawfully, you have the right to lodge a complaint with your local data
                protection authority.
              </p>
            </Section>

            <Divider />

            {/* 8 */}
            <Section title="8. Account & Data Deletion">
              <p>You can delete your account and all associated data by:</p>
              <ol>
                <li>Opening the App and navigating to <strong style={{ color: 'var(--text-primary)' }}>Profile → Settings → Delete Account</strong>.</li>
                <li>Confirming the deletion request in the prompt.</li>
              </ol>
              <p className="mt-4">
                Alternatively, email us at{' '}
                <a href="mailto:yassinkassem29@gmail.com" style={{ color: 'var(--brand-red)' }}>
                  yassinkassem29@gmail.com
                </a>{' '}
                with the subject line &ldquo;Account Deletion Request&rdquo; and your registered email
                address. We will process your request within 30 days.
              </p>
              <p className="mt-4">
                Once deleted, your data cannot be recovered. Backups may retain your data for up to
                an additional <strong style={{ color: 'var(--text-primary)' }}>7 days</strong> before
                full removal from all systems.
              </p>
            </Section>

            <Divider />

            {/* 9 */}
            <Section title="9. Children's Privacy">
              <p>
                AI Fit Tracker is intended for users who are{' '}
                <strong style={{ color: 'var(--text-primary)' }}>13 years of age or older</strong>{' '}
                (or 16 years old in jurisdictions where a higher age threshold applies, such as
                certain EU member states under GDPR).
              </p>
              <p className="mt-4">
                We do not knowingly collect personal information from children under the applicable
                minimum age. If you are a parent or guardian and believe your child has provided us
                with personal data, please contact us immediately at{' '}
                <a href="mailto:yassinkassem29@gmail.com" style={{ color: 'var(--brand-red)' }}>
                  yassinkassem29@gmail.com
                </a>{' '}
                and we will delete the data promptly.
              </p>
              <p className="mt-4">
                If we discover that a user is below the required minimum age, we will deactivate the
                account and delete all associated data without delay.
              </p>
            </Section>

            <Divider />

            {/* 10 */}
            <Section title="10. International Data Transfers">
              <p>
                AI Fit Tracker is operated from{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Egypt</strong>{' '}
                and primarily serves users in that region, though users from other countries may use
                the App. Your data may be transferred to and stored on servers located outside your
                country of residence as part of Supabase&apos;s infrastructure.
              </p>
              <p className="mt-4">
                When transferring data internationally, we rely on lawful transfer mechanisms
                (including standard contractual clauses where required) to ensure your data receives
                adequate protection regardless of where it is processed.
              </p>
            </Section>

            <Divider />

            {/* 11 */}
            <Section title="11. Legal Basis for Processing (GDPR)">
              <p>If you are located in the EEA or UK, we process your data on the following legal bases:</p>
              <ul>
                <li><strong style={{ color: 'var(--text-primary)' }}>Contract performance:</strong> Processing necessary to provide the App&apos;s services (account management, data sync).</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Consent:</strong> Processing of sensitive health data, where you have explicitly agreed to provide it.</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Legitimate interests:</strong> Analytics to improve the App, provided your rights do not override those interests.</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Legal obligation:</strong> Where processing is required to comply with applicable law.</li>
              </ul>
            </Section>

            <Divider />

            {/* 12 */}
            <Section title="12. Cookies & Local Storage">
              <p>
                The App does not use browser cookies. Session tokens and user preferences are stored
                locally on your device via <strong style={{ color: 'var(--text-primary)' }}>AsyncStorage</strong>.
                This data is used solely to keep you logged in and maintain your app settings between
                sessions. It is not used for tracking or advertising.
              </p>
            </Section>

            <Divider />

            {/* 13 */}
            <Section title="13. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise the
                &ldquo;Effective Date&rdquo; at the top of this page and, where the changes are significant,
                notify you via an in-app notice or email.
              </p>
              <p className="mt-4">
                We encourage you to review this policy periodically. Continued use of the App after
                changes are posted constitutes your acceptance of the updated policy.
              </p>
            </Section>

            <Divider />

            {/* 14 */}
            <Section title="14. Contact Us">
              <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
              <div
                className="mt-6 p-6 rounded-2xl"
                style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p><strong style={{ color: 'var(--text-primary)' }}>Thryv</strong></p>
                <p className="mt-1">Egypt</p>
                <p className="mt-1">
                  Email:{' '}
                  <a href="mailto:yassinkassem29@gmail.com" style={{ color: 'var(--brand-red)' }}>
                    yassinkassem29@gmail.com
                  </a>
                </p>
                <p className="mt-1">
                  Website:{' '}
                  <a href="https://thryv-landing-page.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-red)' }}>
                    thryv-landing-page.vercel.app
                  </a>
                </p>
              </div>
            </Section>

            {/* Footer note */}
            <p className="text-xs pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)' }}>
              This policy applies to the AI Fit Tracker mobile application available on iOS and Android.
              It does not apply to any third-party websites or services linked from the App.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

/* ─── Helper components ─────────────────────────────────────────────────── */

function Divider() {
  return (
    <hr style={{ borderColor: 'rgba(255,255,255,0.08)', borderTopWidth: '1px' }} />
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="text-xl font-bold mb-4"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3
        className="text-base font-semibold mb-2"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
