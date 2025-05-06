import weaviate, { WeaviateClient, WeaviateClass } from 'weaviate-ts-client';
// Adjust the path to schema based on the new script location
import { weaviateSchema } from '../schema/weaviate-schema'; 

// Default Weaviate instance from docker-compose.yml is usually http://localhost:8080
const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

async function pushSchema() {
  console.log('Starting Weaviate schema push process...');

  if (!weaviateSchema || !weaviateSchema.classes || weaviateSchema.classes.length === 0) {
    console.error('Schema definition is empty or invalid. Aborting.');
    process.exitCode = 1;
    return;
  }

  for (const classObj of weaviateSchema.classes) {
    const className = (classObj as WeaviateClass).class;
    if (!className) {
      console.error('Found a class definition in schema without a name. Skipping.', classObj);
      process.exitCode = 1;
      continue;
    }

    try {
      // Check if class exists
      await client.schema.classGetter().withClassName(className).do();
      console.log(`Class '${className}' already exists. Skipping creation.`);
    } catch (e) {
      // Class does not exist, try to create it
      console.log(`Class '${className}' does not exist. Attempting to create...`);
      try {
        await client.schema.classCreator().withClass(classObj as WeaviateClass).do(); 
        console.log(`Successfully created class: ${className}`);
      } catch (createError: any) {
        console.error(`Failed to create class ${className}:`, JSON.stringify(createError.message || createError, null, 2));
        process.exitCode = 1; // Indicate an error to the calling process
      }
    }
  }
  console.log('Schema push process completed.');
}

pushSchema()
  .then(() => {
    if (process.exitCode !== 1) {
      console.log('Script finished successfully.');
    }
  })
  .catch((e) => {
    console.error('Unhandled error in pushSchema script:', e);
    process.exitCode = 1;
  })
  .finally(() => {
    if (process.exitCode === 1) {
      console.error('Script finished with errors.');
    }
  });