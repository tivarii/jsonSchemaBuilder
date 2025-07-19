# JSON Schema Builder

A comprehensive React application for creating dynamic JSON schemas with real-time preview and nested field support.

## Features

- **Dynamic Field Management**: Add, edit, and delete fields dynamically
- **Type Support**: String, Number, and Nested types with default values
- **Recursive Nesting**: Create infinitely nested object structures
- **Real-time JSON Preview**: See your schema structure in real-time
- **TypeScript Support**: Full type safety and IntelliSense support
- **Clean UI**: Modern, responsive interface with intuitive controls

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or use this existing project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser

## Usage

### Basic Schema Building

1. **Add Fields**: Click the "Add Field" button to create new fields
2. **Edit Field Names**: Click on the field name input to rename fields
3. **Select Types**: Use the dropdown to choose between String, Number, or Nested types
4. **Set Default Values**: For String and Number types, set default values that will appear in the JSON output
5. **Delete Fields**: Click the "×" button to remove unwanted fields

### Working with Nested Fields

1. **Create Nested Objects**: Select "Nested" as the field type
2. **Add Child Fields**: Click "+ Nested" to add fields within a nested object
3. **Multi-level Nesting**: Nested fields can contain their own nested fields (recursive)
4. **Visual Hierarchy**: Nested fields are visually indented and color-coded by level

### JSON Preview

- Switch to the "JSON Preview" tab to see your schema structure in real-time
- The JSON output reflects all current fields with their default values
- Nested objects are properly structured in the JSON output

## Component Architecture

### Main Components

- **JsonSchemaBuilder**: Main container component managing state and tabs
- **SchemaField**: Individual field component handling field logic and rendering
- **JsonPreview**: Component for displaying real-time JSON output

### Types

- **FieldType**: Union type for supported field types ('string' | 'number' | 'nested')
- **SchemaFieldData**: Interface defining the structure of each field
- **JsonObject**: Type for the generated JSON structure

## Features Breakdown

### Field Management
- Add new fields with auto-generated unique IDs
- Edit field names inline
- Change field types with automatic default value assignment
- Delete fields with confirmation

### Type System
- **String**: Text input with sample default value
- **Number**: Numeric input with sample default value (42)
- **Nested**: Object container that can hold child fields

### Nested Structure Support
- Unlimited nesting depth
- Visual indicators for nesting levels
- Independent field management within nested structures
- Proper JSON serialization of nested objects

### Real-time Preview
- Live JSON generation as you build your schema
- Formatted, readable JSON output
- Automatic updates when fields are modified

## Styling

The application uses custom CSS with:
- Clean, modern design following GitHub's design principles
- Responsive layout that works on different screen sizes
- Color-coded nesting levels for better visual hierarchy
- Hover effects and smooth transitions

## Development

### Project Structure
```
src/
├── components/
│   ├── JsonSchemaBuilder.tsx    # Main builder component
│   ├── SchemaField.tsx          # Individual field component
│   ├── JsonPreview.tsx          # JSON preview component
│   ├── JsonSchemaBuilder.css    # Main styling
│   ├── SchemaField.css          # Field styling
│   ├── JsonPreview.css          # Preview styling
│   └── index.ts                 # Component exports
├── types/
│   ├── schema.ts                # Type definitions
│   └── index.ts                 # Type exports
├── App.tsx                      # Root component
├── App.css                      # Global styling
└── main.tsx                     # Application entry point
```

### Extending the Builder

To add new field types:

1. Update the `FieldType` union in `src/types/schema.ts`
2. Add handling in `SchemaField.tsx` for the new type
3. Update the JSON generation logic in `JsonPreview.tsx`
4. Add appropriate styling for the new type

## Best Practices

- Field names should be valid JSON property names
- Use descriptive field names for better schema readability
- Organize nested structures logically
- Test your JSON output with the preview feature

## Troubleshooting

### Common Issues

1. **Fields not updating**: Ensure you're clicking outside input fields to save changes
2. **JSON not displaying**: Check that field names are provided (empty names are filtered out)
3. **Nesting not working**: Make sure the parent field type is set to "Nested"

## Future Enhancements

Potential features for future development:
- Import/export schema functionality
- Field validation rules
- Array type support
- Schema templates
- JSON Schema standard compliance
- Form generation from schema
