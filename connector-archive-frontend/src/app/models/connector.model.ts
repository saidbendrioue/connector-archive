import { Detection } from './detection.model';
import { Mnumber } from './mnumber.model';

export interface Connector {
  id?: number;
  partNumber?: string;
  supplier?: string;
  color?: string;
  image?: string;
  thumbnail?: any;
  cavitiesNumber?: string;
  gender?: string;
  type?: string;
  leak?: boolean;
  description?: string;
  creationDate?: Date;
  updateDate?: Date;
  detections?: Detection[];
  mnumbers?: Mnumber[];
}
