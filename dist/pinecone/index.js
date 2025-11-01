"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinecone_1 = require("@pinecone-database/pinecone");
const pc = new pinecone_1.Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});
const namespaceForPinecone = pc.Index("jagdish-bolt", process.env.PINECONE_URL).namespace("chat-memory");
exports.default = namespaceForPinecone;
// async function creatingTheIndexForPinecone() {
// await pc.createIndex({
//   name: 'standard-dense-js',
//   vectorType: 'dense',
//   dimension: 1536,
//   metric: 'cosine',
//   spec: {
//     serverless: {
//       cloud: 'aws',
//       region: 'us-east-1'
//     }
//   },
//   deletionProtection: 'disabled',
//   tags: { environment: 'development' }, 
// });
// }
// creatingTheIndexForPinecone()
