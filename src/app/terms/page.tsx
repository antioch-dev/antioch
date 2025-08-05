export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-gray-600">Last updated: January 1, 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 mb-4">
              {`By accessing and using the Antioch Platform ("Platform", "Service"), you accept and agree to be bound by
              the terms and provision of this agreement. If you do not agree to abide by the above, please do not use
              this service.`}
            </p>
            <p className="text-gray-700">
              {`These Terms and Conditions ("Terms") govern your use of our platform operated by Antioch Platform ("us",
              "we", or "our"). Your access to and use of the Service is conditioned on your acceptance of and compliance
              with these Terms.`}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Service</h2>
            <p className="text-gray-700 mb-4">
              Antioch Platform provides a comprehensive digital platform for Christian fellowships and churches to
              manage their communities, organize events, facilitate communication, and access shared resources and
              tools.
            </p>
            <p className="text-gray-700">
              Our services include but are not limited to: fellowship registration and directory, event management,
              communication tools, live streaming capabilities, prayer request systems, and administrative dashboards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts and Registration</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
            <p className="text-gray-700 mb-4">
              To access certain features of our Service, you must register for an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Fellowship Registration</h3>
            <p className="text-gray-700 mb-4">
              Fellowship leaders may register their communities on our platform. By registering a fellowship:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>You represent that you have authority to register the fellowship</li>
              <li>You agree to provide accurate information about your fellowship</li>
              <li>You understand that registration is subject to our approval process</li>
              <li>{`You accept responsibility for managing your fellowship's presence on the platform`}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use Policy</h2>
            <p className="text-gray-700 mb-4">
              You agree to use our Service only for lawful purposes and in accordance with Christian values. You agree
              not to use the Service:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>To violate any applicable local, state, national, or international law</li>
              <li>To transmit or procure the sending of any advertising or promotional material</li>
              <li>To impersonate or attempt to impersonate another person or entity</li>
              <li>{`To engage in any conduct that restricts or inhibits anyone's use of the Service`}</li>
              <li>To upload, post, or transmit any content that is harmful, offensive, or inappropriate</li>
              <li>To interfere with or circumvent the security features of the Service</li>
              <li>To use the Service for any commercial purpose without our express written consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Content and Intellectual Property</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Content</h3>
            <p className="text-gray-700 mb-4">
              You retain ownership of any content you submit, post, or display on or through the Service. By submitting
              content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process,
              adapt, modify, publish, transmit, display, and distribute such content.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Content</h3>
            <p className="text-gray-700 mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive
              property of Antioch Platform and its licensors. The Service is protected by copyright, trademark, and
              other laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Prohibited Content</h3>
            <p className="text-gray-700 mb-4">You may not upload, post, or transmit content that:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>{`Violates any third party's rights`}</li>
              <li>{`Is defamatory, obscene, or offensive`}</li>
              <li>{`Promotes discrimination or hatred`}</li>
              <li>{`Contains viruses or malicious code`}</li>
              <li>{`Violates any applicable laws or regulations`}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your
              information when you use our Service. By using our Service, you agree to the collection and use of
              information in accordance with our Privacy Policy.
            </p>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal information, but we cannot guarantee
              absolute security. You acknowledge that you provide your personal information at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability and Modifications</h2>
            <p className="text-gray-700 mb-4">
              We strive to provide reliable service, but we do not guarantee that the Service will be available at all
              times. We may experience hardware, software, or other problems or need to perform maintenance related to
              the Service, resulting in interruptions, delays, or errors.
            </p>
            <p className="text-gray-700">
              We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Service at
              any time or for any reason without notice to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice
              or liability, under our sole discretion, for any reason whatsoever, including without limitation if you
              breach the Terms.
            </p>
            <p className="text-gray-700">
              If you wish to terminate your account, you may simply discontinue using the Service or contact us to
              request account deletion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers and Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              {`The information on this platform is provided on an "as is" basis. To the fullest extent permitted by law,
              we exclude all representations, warranties, and conditions relating to our platform and the use of this
              platform.`}
            </p>
            <p className="text-gray-700">
              In no event shall Antioch Platform, nor its directors, employees, partners, agents, suppliers, or
              affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your
              use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
            <p className="text-gray-700">
             {` You agree to defend, indemnify, and hold harmless Antioch Platform and its licensee and licensors, and
              their employees, contractors, agents, officers and directors, from and against any and all claims,
              damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to
              attorney's fees).`}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700">
              These Terms shall be interpreted and governed by the laws of Singapore, without regard to its conflict of
              law provisions. Our failure to enforce any right or provision of these Terms will not be considered a
              waiver of those rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <p className="text-gray-700">
              What constitutes a material change will be determined at our sole discretion. By continuing to access or
              use our Service after any revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> legal@antiochplatform.org
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> Antioch Platform Legal Team
              </p>
              <p className="text-gray-700 mb-2">123 Faith Street, Suite 456</p>
              <p className="text-gray-700">Singapore 123456</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
