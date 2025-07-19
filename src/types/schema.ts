export type FieldType = "string" | "number" | "nested"
export interface SchemaField {
  id: string
  name: string
  type: FieldType
  children?: SchemaField[]
}