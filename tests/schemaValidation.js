import { expect } from "chai";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

describe("REQRES JSON Schema Validation", () => {
  it("should match the expected JSON schema for single user", async () => {
    const response = await fetch("https://reqres.in/api/users/2");
    const data = await response.json();

    const schema = {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number" },
            email: { type: "string" },
            first_name: { type: "string" },
            last_name: { type: "string" },
            avatar: { type: "string" }
          },
          required: ["id", "email", "first_name", "last_name", "avatar"]
        },
        support: {
          type: "object",
          properties: {
            url: { type: "string" },
            text: { type: "string" }
          },
          required: ["url", "text"]
        }
      },
      required: ["data", "support"]
    };

    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      console.error("Schema validation errors:", validate.errors);
    }

    expect(valid, JSON.stringify(validate.errors, null, 2)).to.be.true;
  });
});
