const schema = {
    type: "object",
    properties: {
        presentation: {
            type: "object",
            properties: {
                id: { type: "string", minLength: 1 },
                name: { type: "string", minLength: 1 },
                slides: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string", minLength: 1 },
                            elements: {
                                type: "array",
                                items: {
                                    oneOf: [
                                        {
                                            type: "object",
                                            properties: {
                                                id: { type: "string", minLength: 1 },
                                                position: {
                                                    type: "object",
                                                    properties: {
                                                        x: { type: "number" },
                                                        y: { type: "number" }
                                                    },
                                                    required: ["x", "y"]
                                                },
                                                size: {
                                                    type: "object",
                                                    properties: {
                                                        width: { type: "number" },
                                                        height: { type: "number" }
                                                    },
                                                    required: ["width", "height"]
                                                },
                                                value: { type: "string" },
                                                type: { const: "TextObject" },
                                                fontFamily: { type: "string", minLength: 1 },
                                                fontColor: { type: "string", minLength: 1 },
                                                fontSize: { type: "number", minLength: 1 }
                                            },
                                            required: ["id", "position", "size", "type", "fontFamily", "fontColor", "fontSize"]
                                        },
                                        {
                                            type: "object",
                                            properties: {
                                                id: { type: "string", minLength: 1 },
                                                position: {
                                                    type: "object",
                                                    properties: {
                                                        x: { type: "number" },
                                                        y: { type: "number" }
                                                    },
                                                    required: ["x", "y"]
                                                },
                                                size: {
                                                    type: "object",
                                                    properties: {
                                                        width: { type: "number" },
                                                        height: { type: "number" }
                                                    },
                                                    required: ["width", "height"]
                                                },
                                                src: { type: "string", minLength: 1 },
                                                type: { const: "ImageObject" }
                                            },
                                            required: ["id", "position", "size", "src", "type"]
                                        }
                                    ]
                                }
                            },
                            background: {
                                oneOf: [
                                    {
                                        type: "object",
                                        properties: {
                                            color: { type: "string", minLength: 1 },
                                            type: { const: "Solid" }
                                        },
                                        required: ["color", "type"]
                                    },
                                    {
                                        type: "object",
                                        properties: {
                                            src: { type: "string", minLength: 1 },
                                            type: { const: "Image" }
                                        },
                                        required: ["src", "type"]
                                    }
                                ]
                            }
                        },
                        required: ["id", "background"]
                    }
                }
            },
            required: ["id", "name"]
        },
        selection: {
            type: "object",
            properties: {
                selectedSlideId: { type: ["string", "null"] },
                selectedObjectId: { type: ["string", "null"] }
            },
            required: ["selectedSlideId", "selectedObjectId"]
        }
    },
    required: ["presentation", "selection"]
};

function getSchema() {
    return schema
}

export {
    getSchema,
}