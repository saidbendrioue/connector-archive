import { CustomerPartNumber } from './customerPartNumber.model';
import { Detection } from './detection.model';
import { Doc } from './doc.model';
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
  coordinates?: string;
  description?: string;
  creationDate?: Date;
  updateDate?: Date;
  detections?: Detection[];
  mnumbers?: Mnumber[];
  documents?: Doc[];
  customerPartNumbers ?: CustomerPartNumber[];
}
