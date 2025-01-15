import 'dotenv/config';
import type { IGraphQLConfig } from 'graphql-config';

const config: IGraphQLConfig = {
  schema: [
    {
      'https://graphql.datocms.com': {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN || '6febe686639cf55b557df79ec978ff'}`,
          'X-Exclude-Invalid': 'true',
        },
      },
    },
  ],
  documents: ['./src/app/**/*.graphql'],
  extensions: {
    codegen: {
      generates: {
        './src/app/graphql/types/': {
          preset: 'client',
          presetConfig: {
            fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
          },
          config: {
            strictScalars: true,
            scalars: {
              BooleanType: 'boolean',
              CustomData: 'Record<string, unknown>',
              Date: 'string',
              DateTime: 'string',
              FloatType: 'number',
              IntType: 'number',
              ItemId: 'string',
              JsonField: 'unknown',
              MetaTagAttributes: 'Record<string, string>',
              UploadId: 'string',
            },
          },
        },
      },
      ignoreNoDocuments: true,
    },
  },
};

export default config;