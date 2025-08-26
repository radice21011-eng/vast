
import React from 'react';
import { AgentResponse } from '../types';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

const ResponseDisplay: React.FC<{ response: AgentResponse }> = ({ response }) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const renderValue = (key: string, value: any) => {
    if (!value || typeof value !== 'string') {
      return <span>{String(value)}</span>;
    }

    const isAddress = (v: string) => /^0x[a-fA-F0-9]{40}$/.test(v);
    const isTxHash = (v: string) => /^0x[a-fA-F0-9]{64}$/.test(v);

    if (isAddress(value) || isTxHash(value)) {
      return (
        <div className="flex items-center font-mono text-sm group">
          <span className="truncate" title={value}>
            {`${value.substring(0, 10)}...${value.substring(value.length - 8)}`}
          </span>
          <button
            onClick={() => copyToClipboard(value, key)}
            className="ml-2 p-1 text-gray-400 hover:text-white opacity-50 group-hover:opacity-100 transition-opacity"
            title="Copy to clipboard"
          >
            {copiedKey === key ? <CheckIcon className="h-4 w-4 text-green-400" /> : <CopyIcon className="h-4 w-4" />}
          </button>
        </div>
      );
    }
    return <span className="whitespace-pre-wrap break-words">{value}</span>;
  };
  
  const importantKeys = ['transactionHash', 'contractAddress', 'agentAddress'];

  return (
    <div className={`p-4 rounded-lg border ${response.success ? 'bg-green-900 bg-opacity-30 border-green-700' : 'bg-red-900 bg-opacity-30 border-red-700'}`}>
      <h3 className={`text-lg font-bold ${response.success ? 'text-green-300' : 'text-red-300'}`}>
        {response.success ? 'Execution Successful' : 'Execution Failed'}
      </h3>
      <div className="mt-2 space-y-1 text-sm text-gray-300">
        {Object.entries(response)
            .filter(([key]) => key !== 'success' && response[key as keyof AgentResponse])
            .map(([key, value]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                return (
                     <div key={key} className={`grid grid-cols-3 gap-2 ${importantKeys.includes(key) ? 'py-1' : ''}`}>
                        <span className="font-semibold text-gray-400 col-span-1">{label}:</span>
                        <div className="col-span-2 text-gray-200">{renderValue(key, value)}</div>
                    </div>
                )
            })}
      </div>
    </div>
  );
};

export default ResponseDisplay;
