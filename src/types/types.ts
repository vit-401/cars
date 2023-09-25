


export type EntityWithPaginationType<T> = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T;
};

export type QueryDataType = {
  page: number;
  pageSize: number;
  searchNameTerm: string;
};
export type ErrorMessageType = {
  message: string;
  field: string;
};

export type UserType = {
  accountData: UserAccountType;
  //loginAttempts: LoginAttemptType[],
  emailConfirmation: EmailConfirmationType;
};

export type UserViewType = {
  id: string;
  //loginAttempts: LoginAttemptType[],
  login: string;
};

export type UserAccountType = {
  id: string;
  email: string;
  login: string;
  passwordHash: string;
  createdAt: Date;
  revokedTokens?: string[] | null;
};
export type SentConfirmationEmailType = {
  sentDate: Date;
};

export type LoginAttemptType = {
  attemptDate: Date;
  ip: string;
};

export type EmailConfirmationType = {
  isConfirmed: boolean;
  confirmationCode: string;
  expirationDate: Date;
  sentEmails?: SentConfirmationEmailType[];
};

export type LimitsControlType = {
  userIp: string;
  url: string;
  time: Date;
};


export type EmailConfirmationMessageType = {
  email: string;
  message: string;
  subject: string;
  isSent: boolean;
  createdAt: Date;
};


