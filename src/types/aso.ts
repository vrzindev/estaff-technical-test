import { z } from 'zod';
import { asoSchema } from '../validations/asoSchema';

export type AsoFormData = z.infer<typeof asoSchema>;

export interface FileData {
  name: string;
  uri: string;
  type: string;
  size: number;
}
