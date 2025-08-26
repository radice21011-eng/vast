
import React from 'react';
import LegalPageWrapper from './LegalPageWrapper';

const PrivacyPolicy: React.FC = () => {
  return (
    <LegalPageWrapper title="API & Privacy Policy">
      <h2>1. Introduction</h2>
      <p>This document outlines the API usage policies and privacy practices for the V.A.S.T. AI Blockchain Agent ("the Service"). This service is for private use by Ervin Remus Radosavlevici and authorized parties only. By using the Service, you agree to the terms laid out in this policy.</p>
      
      <h2>2. Data We Do Not Collect</h2>
      <p>The Service is designed with privacy as a core principle. We do not collect, store, or process any Personally Identifiable Information (PII). All operations are stateless from the user's perspective. The following data is explicitly NOT collected:</p>
      <ul>
        <li>User IP addresses</li>
        <li>Browser or device information</li>
        <li>Usage analytics or tracking cookies</li>
        <li>Personal names, email addresses, or other contact information</li>
      </ul>

      <h2>3. API & Transaction Data</h2>
      <p>Commands sent to the AI agent, whether through natural language or manual input, are processed in-memory to generate blockchain transactions. The content of these commands is sent to the Google Gemini API for processing and is subject to Google's privacy policies. We do not log or store the specifics of your commands on our frontend servers.</p>
      <p>All resulting transactions are public on the blockchain and are not controlled by the Service. Blockchain data is inherently public and permanent.</p>

      <h2>4. HMAC Secret</h2>
      <p>The HMAC secret displayed in the user interface is generated client-side and is used for signing backend requests. It is your responsibility to manage this secret securely. It is not transmitted to our servers except as a signing key for authorized operations.</p>
      
      <h2>5. Security</h2>
      <p>We implement robust security measures to protect the integrity of the service. However, you are solely responsible for the security of your blockchain wallets, private keys, and the operational security of the machine running this interface.</p>
      <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>
    </LegalPageWrapper>
  );
};

export default PrivacyPolicy;
