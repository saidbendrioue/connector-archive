export interface Connector {
  id?: number;
  partNumber?: string;
  supplier?: string;
  color?: string;
  image?: string;
  thumbnail?: any;
  cavitiesNumber?: string;
  description?: string;
  gender?: string;
  type?: string;
  leak?: boolean;
  creationDate?: Date;
  updateDate?: Date;
}
