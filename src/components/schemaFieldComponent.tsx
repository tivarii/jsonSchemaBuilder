
import type { SchemaField,FieldType } from "../types/schema"
export const SchemaFieldComponent = ({
  field,
  onUpdate,
  onDelete,
  onAddChild,
  level = 0,
}: {
  field: SchemaField
  onUpdate: (id: string, updates: Partial<SchemaField>) => void
  onDelete: (id: string) => void
  onAddChild: (parentId: string) => void
  level?: number
}) => {
  const padding = `p-${2 + level}`
  const margin = `m-${2 + level}`
  
  return (
    <div className={`${padding} ${margin} ${level === 0 ? "border" : ""} gap-2` }>
      <div className={`flex gap-2 p-2 rounded bg-gray-100`}>
        <input
          type="text"
          value={field.name}
          onChange={(e) => onUpdate(field.id, { name: e.target.value })}
          placeholder="Field name"
          className="px-2 py-1 flex-1"
        />

        <select
          value={field.type}
          onChange={(e) => {
            const type = e.target.value as FieldType
            const updates: Partial<SchemaField> = { type }
            if (type === "nested" && !field.children) {
              updates.children = []
            } else if (type !== "nested") {
              updates.children = undefined
            }
            onUpdate(field.id, updates)
          }}
          className="border rounded px-2 py-1"
        >
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="nested">Nested</option>
        </select>

        {field.type === "nested" && (
          <button
            onClick={() => onAddChild(field.id)}
            className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
          >
            + Child
          </button>
        )}

        <button
          onClick={() => onDelete(field.id)}
          className="bg-red-500 text-white px-2 py-1 rounded text-xs"
        >
          Delete
        </button>
      </div>

      {field.type === "nested" && field.children && field.children.length > 0 && (
        <div className="mt-2">
          {field.children.map((child) => (
            <SchemaFieldComponent
              key={child.id}
              field={child}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onAddChild={onAddChild}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}