import React, { useState, useEffect } from 'react';
import crypto from 'crypto-browserify';
import { CommandKind, AgentCommand } from '../types';
import CommandInputFields from './CommandInputFields';
import SpinnerIcon from './icons/SpinnerIcon';
import RotateIcon from './icons/RotateIcon';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface AgentCommandFormProps {
  onSubmit: (command: AgentCommand) => void;
  isLoading: boolean;
}

const initialFormStates: { [K in CommandKind]: Omit<Extract<AgentCommand, { kind: K }>, 'kind'> } = {
  [CommandKind.CREATE_ERC20_TOKEN]: { name: '', symbol: '', initialSupply: '', decimals: 18, purpose: '', gasLimit: '' },
  [CommandKind.MINT_ERC20]: { to: '', amount: '', tokenAddress: '', purpose: '', gasLimit: '' },
  [CommandKind.MINT_ERC721]: { to: '', tokenUri: '', tokenAddress: '', purpose: '', gasLimit: '' },
  [CommandKind.TRANSFER_ERC20]: { to: '', amount: '', tokenAddress: '', purpose: '', gasLimit: '' },
  [CommandKind.TRANSFER_NATIVE]: { to: '', amount: '', purpose: '', gasLimit: '' },
  [CommandKind.SWAP_TOKENS]: { tokenIn: '', tokenOut: '', amountIn: '', minOut: '0', recipient: '', purpose: '', gasLimit: '' },
  [CommandKind.SWAP_TO_ETH_AND_TRANSFER]: { tokenIn: '', amountIn: '', minEthOut: '0', recipient: '', purpose: '', gasLimit: '' },
  [CommandKind.GET_AGENT_ADDRESS]: {},
};

const AgentCommandForm: React.FC<AgentCommandFormProps> = ({ onSubmit, isLoading }) => {
  const [commandKind, setCommandKind] = useState<CommandKind>(CommandKind.CREATE_ERC20_TOKEN);
  const [formState, setFormState] = useState(initialFormStates[commandKind]);
  const [hmacSecret, setHmacSecret] = useState('00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff'); // Safer default
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFormState(initialFormStates[commandKind]);
  }, [commandKind]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCommandKind(e.target.value as CommandKind);
  };
  
  const rotateSecret = () => {
    setHmacSecret(crypto.randomBytes(32).toString('hex'));
  };

  const copySecret = () => {
    navigator.clipboard.writeText(hmacSecret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commandKind === CommandKind.GET_AGENT_ADDRESS) {
      onSubmit({ kind: CommandKind.GET_AGENT_ADDRESS });
    } else {
      onSubmit({ kind: commandKind, ...formState } as AgentCommand);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-800 bg-opacity-60 backdrop-blur-md p-8 rounded-lg shadow-2xl border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label htmlFor="hmacSecret" className="block text-sm font-medium text-gray-300 mb-1">
              HMAC Secret
            </label>
            <div className="relative">
              <input
                id="hmacSecret"
                type="text"
                value={hmacSecret}
                onChange={(e) => setHmacSecret(e.target.value)}
                className="w-full bg-gray-900 text-gray-300 rounded-md py-2 pl-3 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                readOnly
              />
              <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
                <button type="button" onClick={rotateSecret} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                    <RotateIcon className="h-5 w-5" />
                </button>
                <button type="button" onClick={copySecret} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                    {copied ? <CheckIcon className="h-5 w-5 text-green-400" /> : <CopyIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
             <p className="mt-2 text-xs text-gray-500">Use this secret in your backend to sign requests with `X-Signature: sha256=...`</p>
        </div>

        <div>
          <label htmlFor="commandKind" className="block text-sm font-medium text-gray-300 mb-1">
            Command
          </label>
          <select
            id="commandKind"
            value={commandKind}
            onChange={handleSelectChange}
            className="w-full bg-gray-900 text-gray-200 rounded-md py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.values(CommandKind).map(kind => (
              <option key={kind} value={kind}>
                {kind.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* FIX: Add type assertion to ensure the constructed object conforms to the AgentCommand discriminated union. */}
        <CommandInputFields formState={{ kind: commandKind, ...formState } as AgentCommand} handleInputChange={handleInputChange} />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? <><SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5" /> Processing...</> : 'Send Command'}
        </button>
      </form>
    </div>
  );
};

export default AgentCommandForm;
