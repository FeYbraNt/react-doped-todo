var schema = {
    "description": "A todo list of example",
    "type": "object",
    "properties": {
        "todos": {
            "type": "array",
            "minItems": 3,
            "maxItems": 30,
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "number",
                        "unique": true,
                        "minimum": 0
                    },
                    "name": { "type": "string" },
                    "completed": { "type": "boolean" },
                    "priority": {
                        "type": "integer",
                        "minimum": 0,
                        "maximum": 3,
                    },
                    "description": { "type": "string" }
                },
                "required": ["id", "name", "completed", "priority"]
            }
        }
    },
    "required": ["todos"]
};

module.exports = schema;