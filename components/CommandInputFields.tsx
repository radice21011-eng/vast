
import React from 'react';
import { CommandKind, AgentCommand } from '../types';

interface InputFieldProps {
  name: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, label, value, onChange, placeholder, required = true, type = 'text' }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-gray-900 text-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
    />
  </div>
);

interface CommandInputFieldsProps {
  formState: AgentCommand;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const getGasHint = (kind: CommandKind): string => {
  switch (kind) {
    case CommandKind.CREATE_ERC20_TOKEN:
      return "Gas for token deployment can be high. A limit of 1,000,000 to 2,000,000 is common.";
    case CommandKind.MINT_ERC20:
    case CommandKind.MINT_ERC721:
      return "Typical gas for minting is ~50,000-150,000, depending on contract complexity.";
    case CommandKind.TRANSFER_ERC20:
      return "Typical gas for an ERC20 transfer is ~45,000-65,000.";
    case CommandKind.TRANSFER_NATIVE:
      return "A standard native ETH transfer requires a gas limit of 21,000.";
    case CommandKind.SWAP_TOKENS:
    case CommandKind.SWAP_TO_ETH_AND_TRANSFER:
      return "Gas for a DEX swap can be high, often in the 150,000-250,000 range.";
    default:
      return "Gas limit depends on the complexity of the transaction.";
  }
};


const CommandInputFields: React.FC<CommandInputFieldsProps> = ({ formState, handleInputChange }) => {
  if (formState.kind === CommandKind.GET_AGENT_ADDRESS) {
    return <p className="text-sm text-gray-400 text-center">This command requires no parameters. It will query the agent for its public wallet address.</p>;
  }

  const gasHint = getGasHint(formState.kind);
  const gasField = (
    <div>
      <InputField name="gasLimit" label="Gas Limit (Optional)" value={'gasLimit' in formState ? formState.gasLimit || '' : ''} onChange={handleInputChange} placeholder="e.g., 21000" required={false} />
      <p className="mt-1 text-xs text-gray-500">{gasHint}</p>
    </div>
  );

  switch (formState.kind) {
    case CommandKind.CREATE_ERC20_TOKEN:
      return (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">Define and deploy a new ERC20 compliant token. The initial supply will be minted to the agent's signer address.</p>
          <InputField name="name" label="Token Name" value={formState.name} onChange={handleInputChange} placeholder="My Awesome Token" />
          <InputField name="symbol" label="Token Symbol" value={formState.symbol} onChange={handleInputChange} placeholder="MAT" />
          <InputField name="initialSupply" label="Initial Supply (in wei)" value={formState.initialSupply} onChange={handleInputChange} placeholder="1000000000000000000000" />
          <InputField name="decimals" label="Decimals" value={formState.decimals} onChange={handleInputChange} placeholder="18" type="number" />
          {gasField}
          <InputField name="purpose" label="Purpose (Optional)" value={formState.purpose || ''} onChange={handleInputChange} placeholder="Initial token creation for project X" required={false} />
        </div>
      );
    case CommandKind.MINT_ERC20:
      return (
        <div className="space-y-4">
          <InputField name="tokenAddress" label="Token Address" value={formState.tokenAddress} onChange={handleInputChange} placeholder="0x..." />
          <InputField name="to" label="Recipient Address" value={formState.to} onChange={handleInputChange} placeholder="0x..." />
          <InputField name="amount" label="Amount (in wei)" value={formState.amount} onChange={handleInputChange} placeholder="1000000000000000000" />
          {gasField}
          <InputField name="purpose" label="Purpose (Optional)" value={formState.purpose || ''} onChange={handleInputChange} placeholder="Quarterly user rewards" required={false} />
        </div>
      );
    case CommandKind.MINT_ERC721:
       return (
        <div className="space-y-4">
          <InputField name="tokenAddress" label="Token Address" value={formState.tokenAddress} onChange={handleInputChange} placeholder="0x..." />
          <InputField name="to" label="Recipient Address" value={formState.to} onChange={handleInputChange} placeholder="0x..." />
          <InputField name="tokenUri" label="Token URI" value={formState.tokenUri} onChange={handleInputChange} placeholder="ipfs://..." />
          {gasField}
          <InputField name="purpose" label="Purpose (Optional)" value={formState.purpose || ''} onChange={handleInputChange} placeholder="Minting achievement NFT" required={false} />
        </div>
      );
    case CommandKind.TRANSFER_ERC20:
        return (
        <div className="space-y-4">
            <InputField name="tokenAddress" label="Token Address" value={formState.tokenAddress} onChange={handleInputChange} placeholder="0x..." />
            <InputField name="to" label="Recipient Address" value={formState.to} onChange={handleInputChange} placeholder="0x..." />
            <InputField name="amount" label="Amount (in wei)" value={formState.amount} onChange={handleInputChange} placeholder="500000000000000000" />
            {gasField}
            <InputField name="purpose" label="Purpose (Optional)" value={formState.purpose || ''} onChange={handleInputChange} placeholder="Payment for services" required={false} />
        </div>
        );
    case CommandKind.TRANSFER_NATIVE:
        return (
        <div className="space-y-4">
            <InputField name="to" label="Recipient Address" value={formState.to} onChange={handleInputChange} placeholder="0x..." />
            <InputField name="amount" label="Amount (in wei)" value={formState.amount} onChange={handleInputChange} placeholder="10000000000000000" />
            {gasField}
            <InputField name="purpose" label="Purpose (Optional)" value={formState.purpose || ''} onChange={handleInputChange} placeholder="Operational gas fee funding" required={false} />
        </div>
        );
    case CommandKind.SWAP_TOKENS:
        return (
            <div className="space-y-4">
                <p className="text-sm text-gray-400">Execute a token-for-token swap on a decentralized exchange.</p>
                <InputField name="tokenIn" label="Token In Address" value={formState.tokenIn} onChange={handleInputChange} placeholder="0x..." />
                <InputField name="amountIn" label="Amount In (in wei)" value={formState.amountIn} onChange={handleInputChange} placeholder="1000000000000000000" />
                <InputField name="tokenOut" label="Token Out Address" value={formState.tokenOut} onChange={handleInputChange} placeholder="0x..." />
                <InputField name="minOut" label="Minimum Out (in wei)" value={formState.minOut} onChange={handleInputChange} placeholder="0" />
                <InputField name="recipient" label="Recipient Address" value={formState.recipient} onChange={handleInputChange} placeholder="0x..." />
                {gasField}
                <InputField name="purpose" label="Purpose (Optional)" value={formState.purpose || ''} onChange={handleInputChange} placeholder="Portfolio rebalancing" required={false} />
            </div>
        );
    case CommandKind.SWAP_TO_ETH_AND_TRANSFER:
        return (
            <div className="space-y-4">
                <p className="text-sm text-gray-400">Atomically swap an ERC20 token for native ETH and transfer it to a final recipient in a single transaction.</p>
                <InputField name="tokenIn" label="Token In Address" value={formState.tokenIn} onChange={handleInputChange} placeholder="0x..." />
                <InputField name="amountIn" label="Amount In (in wei)" value={formState.amountIn} onChange={handleInputChange} placeholder="1000000000000000000" />
                <InputField name="minEthOut" label="Minimum ETH Out (in wei)" value={formState.minEthOut} onChange={handleInputChange} placeholder="0" />
                <InputField name="recipient" label="Final Recipient Address" value={formState.recipient} onChange={handleInputChange} placeholder="0x..." />
                {gasField}
                <InputField name="purpose" label="Purpose (Optional)" value={formState.purpose || ''} onChange={handleInputChange} placeholder="Cashing out rewards to ETH" required={false} />
            </div>
        );
    default:
      return <p className="text-sm text-center text-red-400">Invalid command selected.</p>;
  }
};

export default CommandInputFields;
