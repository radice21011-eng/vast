
import React from 'react';
import LegalPageWrapper from './LegalPageWrapper';

const GdprCompliance: React.FC = () => {
  return (
    <LegalPageWrapper title="Data Protection & GDPR">
      <h2>Our Commitment to Data Protection</h2>
      <p>The V.A.S.T. AI Blockchain Agent is fundamentally designed to be a stateless tool that does not require the collection of personal data to function. Our approach to data protection and compliance with regulations like the General Data Protection Regulation (GDPR) is based on the principle of data minimization.</p>

      <h2>GDPR Data Subject Rights</h2>
      <p>Under GDPR, individuals have rights over their personal data. As we do not collect or store any personal data, the applicability of these rights is as follows:</p>
      <ul>
        <li><strong>Right to Access:</strong> Since no personal data is stored, there is no data to provide access to.</li>
        <li><strong>Right to Rectification:</strong> There is no data to correct.</li>
        <li><strong>Right to Erasure (Right to be Forgotten):</strong> There is no data to delete.</li>
        <li><strong>Right to Restrict Processing:</strong> We do not process personal data.</li>
        <li><strong>Right to Data Portability:</strong> There is no personal data to port.</li>
      </ul>

      <h2>Third-Party Processors</h2>
      <p>The only third-party service involved in processing data is Google's Gemini API, which processes natural language queries. Your interactions with this service are governed by Google's terms and privacy policies. We do not send any personal data alongside these queries.</p>
      
      <h2>Blockchain Data</h2>
      <p>It is critical to understand that data written to a public blockchain (e.g., Ethereum) is immutable and public. This data is not "personal data" in the traditional sense and is outside the control of this Service. Once a transaction is confirmed on the blockchain, it cannot be altered or erased. Do not associate your real-world identity with blockchain addresses if you wish to remain anonymous.</p>
      
      <h2>Contact</h2>
      <p>For any questions regarding our data protection practices, please contact the service owner.</p>

      <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>
    </LegalPageWrapper>
  );
};

export default GdprCompliance;
