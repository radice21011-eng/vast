
import { AgentCommand, AgentResponse, CommandKind } from '../types';

// This is a MOCK service. In a real application, this would send a signed
// request to a secure backend agent service.
export const sendCommandToAgent = async (command: AgentCommand): Promise<AgentResponse> => {
  console.log('Sending command to agent:', command);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate agent processing and returning a response
  try {
    if (command.kind === CommandKind.GET_AGENT_ADDRESS) {
      return {
        success: true,
        message: 'Agent address retrieved successfully.',
        agentAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // Example address
      };
    }

    // All other commands are simulated as successful transactions
    const txHash = `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    if (command.kind === CommandKind.CREATE_ERC20_TOKEN) {
      const contractAddress = `0x${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      return {
        success: true,
        message: `Successfully created token '${command.name}' (${command.symbol}).`,
        transactionHash: txHash,
        contractAddress: contractAddress,
      };
    }

    return {
      success: true,
      message: `Command '${command.kind}' executed successfully.`,
      transactionHash: txHash,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Agent failed to execute command.',
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
