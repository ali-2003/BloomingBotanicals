import { type SchemaTypeDefinition } from 'sanity'
import { product } from './schemaTypes/product-schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product],
}
