import {Schema as ParentSchema} from './schema.base';

export interface Schema extends ParentSchema{

  /**
   * The name of the variant
   */
  variant: string;
}
