
import React from 'react';
import LegalPageWrapper from './LegalPageWrapper';

const TermsOfService: React.FC = () => {
  return (
    <LegalPageWrapper title="Terms of Use">
      <h2>1. Agreement to Terms</h2>
      <p>By accessing or using the V.A.S.T. AI Blockchain Agent ("the Service"), you agree to be bound by these Terms of Use. This Service is a private tool intended for use by Ervin Remus Radosavlevici. Unauthorized use is strictly prohibited.</p>
      
      <h2>2. The Service</h2>
      <p>The Service provides a user interface to interact with a secure, autonomous blockchain agent. It allows for the creation of tokens, execution of swaps, and transfer of assets. You are responsible for all commands issued from your interface.</p>
      
      <h2>3. No Financial Advice</h2>
      <p>The Service is a technology tool. It does not provide investment advice, financial advice, trading advice, or any other sort of advice. You should not treat any of the service's content as such. You alone assume the sole responsibility of evaluating the merits and risks associated with the use of any information or other content on the Service before making any decisions based on such information.</p>
      
      <h2>4. Disclaimers and Limitation of Liability</h2>
      <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING THE WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. IN NO EVENT SHALL THE OWNER, ERVIN REMUS RADOSAVLEVICI, BE LIABLE FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF FUNDS, LOST PROFITS, OR DATA, ARISING OUT OF THE USE OR INABILITY TO USE THE SERVICE.</p>
      <p>You acknowledge that blockchain transactions are irreversible and that you are solely responsible for any losses incurred due to your actions.</p>
      
      <h2>5. Compliance and Legality</h2>
      <p>You agree to use the Service in compliance with all applicable laws and regulations in your jurisdiction. It is your responsibility to ensure that your use of the Service, including token creation and transfers, adheres to all local, national, and international financial regulations.</p>

      <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>
    </LegalPageWrapper>
  );
};

export default TermsOfService;
