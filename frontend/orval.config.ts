export default {
  petstore: {
    input: {
      target: "http://localhost:3000/api-json",
      validation: true,
    },
    output: {
      target: "./src/api/generated.ts",
      client: "axios",
    },
  },
};
