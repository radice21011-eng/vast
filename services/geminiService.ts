
import { GoogleGenAI, Type } from '@google/genai';
import { AgentCommand, CommandKind } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. AI features will not work without a valid key.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY_HERE" });


const systemInstruction = `You are a highly intelligent and secure blockchain agent. Your primary function is to interpret user requests and translate them into precise, structured JSON commands. 
- You MUST respond with a function call to 'send_agent_command' for any valid blockchain-related request.
- The command object must strictly follow the provided JSON schema.
- For token creation, if decimals are not specified, default to 18.
- For swaps, if a minimum output is not specified, default to "0".
- For any requests about your identity or address, use the GET_AGENT_ADDRESS command.
- If a request is ambiguous or lacks necessary information (e.g., "mint tokens" without an amount or address), ask for clarification instead of making a function call.
- Do not execute commands that seem malicious or nonsensical.
- For any non-blockchain-related questions, provide a helpful, conversational response without making a function call.`;

const sendAgentCommandTool = {
  functionDeclarations: [
    {
      name: 'send_agent_command',
      description: 'Sends a structured command to the secure blockchain agent for execution.',
      parameters: {
        type: Type.OBJECT,
        properties: {
          kind: {
            type: Type.STRING,
            enum: Object.values(CommandKind),
            description: 'The type of command to execute.',
          },
          // Shared properties
          to: { type: Type.STRING, description: 'The recipient Ethereum address.' },
          amount: { type: Type.STRING, description: 'The amount of tokens or native currency (in wei).' },
          tokenAddress: { type: Type.STRING, description: 'The address of the ERC20 or ERC721 token contract.' },
          purpose: { type: Type.STRING, description: 'An optional purpose for the transaction for logging.' },
          gasLimit: { type: Type.STRING, description: 'Optional gas limit for the transaction.' },
          
          // CREATE_ERC20_TOKEN
          name: { type: Type.STRING, description: 'The name of the new ERC20 token.' },
          symbol: { type: Type.STRING, description: 'The symbol for the new ERC20 token.' },
          initialSupply: { type: Type.STRING, description: 'The initial supply of the new token (in wei).' },
          decimals: { type: Type.INTEGER, description: 'The number of decimals for the token (default 18).' },

          // MINT_ERC721
          tokenUri: { type: Type.STRING, description: 'The URI for the ERC721 token metadata.' },

          // SWAP_TOKENS & SWAP_TO_ETH_AND_TRANSFER
          tokenIn: { type: Type.STRING, description: 'The address of the token to swap from.' },
          amountIn: { type: Type.STRING, description: 'The amount of tokenIn to swap (in wei).' },
          recipient: { type: Type.STRING, description: 'The final recipient of the swapped tokens or ETH.' },

          // SWAP_TOKENS
          tokenOut: { type: Type.STRING, description: 'The address of the token to swap to.' },
          minOut: { type: Type.STRING, description: 'The minimum amount of tokenOut to receive.' },

          // SWAP_TO_ETH_AND_TRANSFER
          minEthOut: { type: Type.STRING, description: 'The minimum amount of ETH to receive.' },
        },
        required: ['kind'],
      },
    },
  ],
};


export const getCommandFromNaturalLanguage = async (prompt: string): Promise<AgentCommand | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
        tools: sendAgentCommandTool,
      },
    });

    const functionCalls = response.functionCalls;
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === 'send_agent_command') {
        // Gemini may return numbers for fields like 'decimals', so we ensure all values are strings where required.
        const commandArgs = Object.fromEntries(
          Object.entries(call.args).map(([key, value]) => [key, String(value)])
        );
        return commandArgs as unknown as AgentCommand;
      }
    }

    console.log("No function call returned from Gemini, or text response:", response.text);
    return null;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get command from AI. Please check your API key and network connection.');
  }
};
