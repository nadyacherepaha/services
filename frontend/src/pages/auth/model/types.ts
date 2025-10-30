export type LoginParams = { email: string; password: string };
export type RegisterParams = { name: string; email: string; phone: string; socials?: string; password: string };
export type ForgotParams = { email: string };
export type ResetParams = { password: string; confirm: string };
