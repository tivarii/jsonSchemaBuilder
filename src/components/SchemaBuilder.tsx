import { useState } from "react"
import { SchemaFieldComponent } from "./schemaFieldComponent"
import type { SchemaField,FieldType } from "../types/schema"


const generateId = () => Math.random().toString(36).substr(2, 9)

const getDefaultValue = (type: FieldType): any => {
  switch (type) {
    case "string":
      return "STRING"
    case "number":
      return "number"
    case "nested":
      return {}
    default:
      return null
  }
}

const convertToJsonSchema = (fields: SchemaField[]): any => {
  const result: any = {}
  fields.forEach((field) => {
    if (field.type === "nested" && field.children && field.children.length > 0) {
      result[field.name] = convertToJsonSchema(field.children)
    } else {
      result[field.name] = getDefaultValue(field.type)
    }
  })
  return result
}



export default function JsonSchemaBuilder() {
  const [fields, setFields] = useState<SchemaField[]>([
    {
      id: generateId(),
      name: "name",
      type: "string",
    },
  ])

  const updateField = (id: string, updates: Partial<SchemaField>) => {
    const updateFieldRecursive = (fields: SchemaField[]): SchemaField[] => {
      return fields.map((field) => {
        if (field.id === id) {
          return { ...field, ...updates }
        }
        if (field.children) {
          return { ...field, children: updateFieldRecursive(field.children) }
        }
        return field
      })
    }
    setFields(updateFieldRecursive(fields))
  }

  const deleteField = (id: string) => {
    const deleteFieldRecursive = (fields: SchemaField[]): SchemaField[] => {
      return fields.filter((field) => {
        if (field.id === id) {
          return false
        }
        if (field.children) {
          field.children = deleteFieldRecursive(field.children)
        }
        return true
      })
    }
    setFields(deleteFieldRecursive(fields))
  }

  const addChild = (parentId: string) => {
    const addChildRecursive = (fields: SchemaField[]): SchemaField[] => {
      return fields.map((field) => {
        if (field.id === parentId && field.type === "nested") {
          const newChild: SchemaField = {
            id: generateId(),
            name: `field_${(field.children?.length || 0) + 1}`,
            type: "string",
          }
          return {
            ...field,
            children: [...(field.children || []), newChild],
          }
        }
        if (field.children) {
          return { ...field, children: addChildRecursive(field.children) }
        }
        return field
      })
    }
    setFields(addChildRecursive(fields))
  }

  const addRootField = () => {
    const newField: SchemaField = {
      id: generateId(),
      name: `field_${fields.length + 1}`,
      type: "string",
    }
    setFields([...fields, newField])
  }

  const jsonOutput = convertToJsonSchema(fields)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">JSON Schema Builder</h1>

      <div className="grid grid-cols-2 gap-4 h-screen">
        {/* Schema Builder Side */}
        <div className="border rounded overflow-auto">
          <div className="bg-gray-100 p-2 border-b font-semibold">
            Schema Builder
          </div>
          
          <div className="p-2 border-b">
            <button
              onClick={addRootField}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              Add Field
            </button>
          </div>

          <div className="overflow-auto p-2">
            {fields.map((field) => (
              <SchemaFieldComponent
                key={field.id}
                field={field}
                onUpdate={updateField}
                onDelete={deleteField}
                onAddChild={addChild}
                level={0}
              />
            ))}
            {fields.length === 0 && (
              <p className="text-center text-gray-500 mt-8">
                No fields defined. Click "Add Field" to get started.
              </p>
            )}
          </div>
        </div>

        {/* JSON Preview Side */}
        <div className="border rounded overflow-auto">
          <div className="bg-gray-100 p-2 border-b font-semibold">
            JSON Preview
          </div>
          
          <div className="overflow-auto">
            <pre className="bg-gray-50 text-sm">
              {JSON.stringify(jsonOutput, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}