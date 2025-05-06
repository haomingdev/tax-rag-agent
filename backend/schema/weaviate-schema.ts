import { WeaviateClass } from 'weaviate-ts-client';

const commonVectorizerConfig = {
  vectorizer: 'none',
  vectorIndexConfig: {
    distance: 'cosine',
  },
};

const ingestJobSchema: WeaviateClass = {
  class: 'IngestJob',
  description: 'Tracks the status of a document ingestion job',
  ...commonVectorizerConfig,
  properties: [
    {
      name: 'jobId',
      dataType: ['uuid'],
      description: 'Unique identifier for the ingestion job (PK)',
      moduleConfig: { 'text2vec-transformers': { skip: true } }, 
    },
    {
      name: 'url',
      dataType: ['text'],
      description: 'URL of the document to be ingested',
    },
    {
      name: 'status',
      dataType: ['text'],
      description: 'Current status of the job (pending|processing|completed|failed)',
    },
    {
      name: 'queuedAt',
      dataType: ['date'],
      description: 'Timestamp when the job was queued',
    },
    {
      name: 'completedAt',
      dataType: ['date'],
      description: 'Timestamp when the job was completed or failed',
    },
    {
      name: 'errorMessage',
      dataType: ['text'],
      description: 'Error message if the job failed',
    },
  ],
};

const rawDocSchema: WeaviateClass = {
  class: 'RawDoc',
  description: 'Stores raw document content and metadata before chunking',
  ...commonVectorizerConfig,
  properties: [
    {
      name: 'docId',
      dataType: ['uuid'],
      description: 'Unique identifier for the raw document (PK)',
      moduleConfig: { 'text2vec-transformers': { skip: true } },
    },
    {
      name: 'jobId',
      dataType: ['IngestJob'], 
      description: 'Reference to the ingestion job that created this document',
    },
    {
      name: 'sourceUrl',
      dataType: ['text'],
      description: 'Original source URL of the document',
    },
    {
      name: 'title',
      dataType: ['text'],
      description: 'Title of the document',
    },
    {
      name: 'createdAt',
      dataType: ['date'],
      description: 'Timestamp when the raw document was created',
    },
  ],
};

const docChunkSchema: WeaviateClass = {
  class: 'DocChunk',
  description: 'Stores a chunk of text from a raw document with its embedding',
  vectorizer: 'none', 
  vectorIndexConfig: {
    distance: 'cosine',
  },
  properties: [
    {
      name: 'chunkId',
      dataType: ['uuid'],
      description: 'Unique identifier for the document chunk (PK)',
      moduleConfig: { 'text2vec-transformers': { skip: true } },
    },
    {
      name: 'docId',
      dataType: ['RawDoc'], 
      description: 'Reference to the raw document this chunk belongs to',
    },
    {
      name: 'chunkIndex',
      dataType: ['int'],
      description: 'Sequential index of the chunk within the document',
    },
    {
      name: 'text',
      dataType: ['text'],
      description: 'The actual text content of the chunk',
    },
    {
      name: 'createdAt',
      dataType: ['date'],
      description: 'Timestamp when the document chunk was created',
    },
  ],
};

const chatInteractionSchema: WeaviateClass = {
  class: 'ChatInteraction',
  description: 'Logs a user chat interaction with the RAG system',
  ...commonVectorizerConfig,
  properties: [
    {
      name: 'chatId',
      dataType: ['uuid'],
      description: 'Unique identifier for the chat interaction (PK)',
      moduleConfig: { 'text2vec-transformers': { skip: true } },
    },
    {
      name: 'userSessionId',
      dataType: ['text'],
      description: 'Identifier for the user session',
    },
    {
      name: 'prompt',
      dataType: ['text'],
      description: 'The user\'s prompt or question',
    },
    {
      name: 'answer',
      dataType: ['text'],
      description: 'The AI\'s answer',
    },
    {
      name: 'citations',
      dataType: ['DocChunk'], 
      description: 'List of document chunks cited in the answer',
    },
    {
      name: 'askedAt',
      dataType: ['date'],
      description: 'Timestamp when the interaction occurred',
    },
  ],
};

export const weaviateSchema = {
  classes: [ingestJobSchema, rawDocSchema, docChunkSchema, chatInteractionSchema],
};