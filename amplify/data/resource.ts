import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Question: a.customType({
    question: a.string().required(),
    options: a.string().required().array().required(),
    correctAnswer: a.string().required(),
    category: a.string().required(),
  }),
  Game: a
    .model({
      playerOneId: a.string().required(),
      playerTwoId: a.string().required(),
      questions: a.ref("Question").required().array().required(),
      currentQuestion: a.integer().default(0),
      playerOneScore: a.integer().default(0),
      playerTwoScore: a.integer().default(0),
    })
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
