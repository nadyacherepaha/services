import type { SafeUser } from 'src/types';

export type Tokens = { accessToken: string };

export type ErrorPayload = { error: string };
export type AuthSuccess = { user: SafeUser; tokens: Tokens };
