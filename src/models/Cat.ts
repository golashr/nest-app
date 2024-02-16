export interface Cat {
  _id: string;
  user: string;
  text: string;
  __v: number;
  source: string;
  updatedAt: Date;
  type: string;
  createdAt: Date;
  deleted: boolean;
  used?: boolean;
  status?: {
    verified: boolean;
    sentCount: number;
  };
}
