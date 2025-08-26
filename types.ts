
export enum CommandKind {
  CREATE_ERC20_TOKEN = 'CREATE_ERC20_TOKEN',
  MINT_ERC20 = 'MINT_ERC20',
  MINT_ERC721 = 'MINT_ERC721',
  TRANSFER_ERC20 = 'TRANSFER_ERC20',
  TRANSFER_NATIVE = 'TRANSFER_NATIVE',
  SWAP_TOKENS = 'SWAP_TOKENS',
  SWAP_TO_ETH_AND_TRANSFER = 'SWAP_TO_ETH_AND_TRANSFER',
  GET_AGENT_ADDRESS = 'GET_AGENT_ADDRESS',
}

export interface CreateErc20TokenCommand {
  kind: CommandKind.CREATE_ERC20_TOKEN;
  name: string;
  symbol: string;
  initialSupply: string;
  decimals: number;
  purpose?: string;
  gasLimit?: string;
}

export interface MintErc20Command {
  kind: CommandKind.MINT_ERC20;
  to: string;
  amount: string;
  tokenAddress: string;
  purpose?: string;
  gasLimit?: string;
}

export interface MintErc721Command {
  kind: CommandKind.MINT_ERC721;
  to: string;
  tokenUri: string;
  tokenAddress: string;
  purpose?: string;
  gasLimit?: string;
}

export interface TransferErc20Command {
  kind: CommandKind.TRANSFER_ERC20;
  to: string;
  amount: string;
  tokenAddress: string;
  purpose?: string;
  gasLimit?: string;
}

export interface TransferNativeCommand {
  kind: CommandKind.TRANSFER_NATIVE;
  to: string;
  amount: string;
  purpose?: string;
  gasLimit?: string;
}

export interface SwapTokensCommand {
  kind: CommandKind.SWAP_TOKENS;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  minOut: string;
  recipient: string;
  purpose?: string;
  gasLimit?: string;
}

export interface SwapToEthAndTransferCommand {
  kind: CommandKind.SWAP_TO_ETH_AND_TRANSFER;
  tokenIn: string;
  amountIn: string;
  minEthOut: string;
  recipient: string;
  purpose?: string;
  gasLimit?: string;
}

export interface GetAgentAddressCommand {
  kind: CommandKind.GET_AGENT_ADDRESS;
}

export type AgentCommand =
  | CreateErc20TokenCommand
  | MintErc20Command
  | MintErc721Command
  | TransferErc20Command
  | TransferNativeCommand
  | SwapTokensCommand
  | SwapToEthAndTransferCommand
  | GetAgentAddressCommand;

export type AgentResponse = {
  success: boolean;
  message: string;
  transactionHash?: string;
  contractAddress?: string;
  agentAddress?: string;
  error?: string;
};

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  response?: AgentResponse | null;
}
