// smithy-typescript generated code
import { RuleSetObject } from "@aws-sdk/util-endpoints";

export const ruleSet: RuleSetObject = {
  version: "1.0",
  parameters: {
    Bucket: {
      required: false,
      documentation:
        "The S3 bucket used to send the request. This is an optional parameter that will be set automatically for operations that are scoped to an S3 bucket.",
      type: "String",
    },
    Region: {
      builtIn: "AWS::Region",
      required: false,
      documentation: "The AWS region used to dispatch the request.",
      type: "String",
    },
    UseFIPS: {
      builtIn: "AWS::UseFIPS",
      required: true,
      default: false,
      documentation:
        "When true, send this request to the FIPS-compliant regional endpoint. If the configured endpoint does not have a FIPS compliant endpoint, dispatching the request will return an error.",
      type: "Boolean",
    },
    UseDualStack: {
      builtIn: "AWS::UseDualStack",
      required: true,
      default: false,
      documentation:
        "When true, use the dual-stack endpoint. If the configured endpoint does not support dual-stack, dispatching the request MAY return an error.",
      type: "Boolean",
    },
    Endpoint: {
      builtIn: "SDK::Endpoint",
      required: false,
      documentation: "Override the endpoint used to send this request",
      type: "String",
    },
    ForcePathStyle: {
      builtIn: "AWS::S3::ForcePathStyle",
      required: false,
      documentation: "When true, force a path-style endpoint to be used where the bucket name is part of the path.",
      type: "Boolean",
    },
    Accelerate: {
      builtIn: "AWS::S3::Accelerate",
      required: true,
      default: false,
      documentation: "When true, use S3 Accelerate. NOTE: Not all regions support S3 accelerate.",
      type: "Boolean",
    },
    UseGlobalEndpoint: {
      builtIn: "AWS::S3::UseGlobalEndpoint",
      required: true,
      default: false,
      documentation: "Whether the global endpoint should be used, rather then the regional endpoint for us-east-1.",
      type: "Boolean",
    },
    UseObjectLambdaEndpoint: {
      required: false,
      documentation: "Internal parameter to use object lambda endpoint for an operation (eg: WriteGetObjectResponse)",
      type: "Boolean",
    },
    DisableAccessPoints: {
      required: false,
      documentation: "Internal parameter to disable Access Point Buckets",
      type: "Boolean",
    },
    DisableMultiRegionAccessPoints: {
      builtIn: "AWS::S3::DisableMultiRegionAccessPoints",
      required: true,
      default: false,
      documentation: "Whether multi-region access points (MRAP) should be disabled.",
      type: "Boolean",
    },
    UseArnRegion: {
      builtIn: "AWS::S3::UseArnRegion",
      required: false,
      documentation:
        "When an Access Point ARN is provided and this flag is enabled, the SDK MUST use the ARN's region when constructing the endpoint instead of the client's configured region.",
      type: "Boolean",
    },
  },
  rules: [
    {
      conditions: [],
      type: "tree",
      rules: [
        {
          conditions: [
            {
              fn: "isSet",
              argv: [
                {
                  ref: "Region",
                },
              ],
            },
          ],
          type: "tree",
          rules: [
            {
              conditions: [],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "isSet",
                      argv: [
                        {
                          ref: "Bucket",
                        },
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [
                        {
                          fn: "isSet",
                          argv: [
                            {
                              ref: "Endpoint",
                            },
                          ],
                        },
                        {
                          fn: "not",
                          argv: [
                            {
                              fn: "isSet",
                              argv: [
                                {
                                  fn: "parseURL",
                                  argv: [
                                    {
                                      ref: "Endpoint",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      error: "Custom endpoint `{Endpoint}` was not a valid URI",
                      type: "error",
                    },
                    {
                      conditions: [],
                      type: "tree",
                      rules: [
                        {
                          conditions: [
                            {
                              fn: "isSet",
                              argv: [
                                {
                                  ref: "ForcePathStyle",
                                },
                              ],
                            },
                            {
                              fn: "booleanEquals",
                              argv: [
                                {
                                  ref: "ForcePathStyle",
                                },
                                true,
                              ],
                            },
                          ],
                          type: "tree",
                          rules: [
                            {
                              conditions: [],
                              type: "tree",
                              rules: [
                                {
                                  conditions: [
                                    {
                                      fn: "aws.parseArn",
                                      argv: [
                                        {
                                          ref: "Bucket",
                                        },
                                      ],
                                    },
                                  ],
                                  error: "Path-style addressing cannot be used with ARN buckets",
                                  type: "error",
                                },
                                {
                                  conditions: [
                                    {
                                      fn: "uriEncode",
                                      argv: [
                                        {
                                          ref: "Bucket",
                                        },
                                      ],
                                      assign: "uri_encoded_bucket",
                                    },
                                  ],
                                  type: "tree",
                                  rules: [
                                    {
                                      conditions: [
                                        {
                                          fn: "booleanEquals",
                                          argv: [
                                            {
                                              ref: "UseDualStack",
                                            },
                                            true,
                                          ],
                                        },
                                        {
                                          fn: "isSet",
                                          argv: [
                                            {
                                              ref: "Endpoint",
                                            },
                                          ],
                                        },
                                      ],
                                      error: "Cannot set dual-stack in combination with a custom endpoint.",
                                      type: "error",
                                    },
                                    {
                                      conditions: [],
                                      type: "tree",
                                      rules: [
                                        {
                                          conditions: [
                                            {
                                              fn: "aws.partition",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                              ],
                                              assign: "partitionResult",
                                            },
                                          ],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [],
                                              type: "tree",
                                              rules: [
                                                {
                                                  conditions: [
                                                    {
                                                      fn: "booleanEquals",
                                                      argv: [
                                                        {
                                                          ref: "Accelerate",
                                                        },
                                                        false,
                                                      ],
                                                    },
                                                  ],
                                                  type: "tree",
                                                  rules: [
                                                    {
                                                      conditions: [],
                                                      type: "tree",
                                                      rules: [
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseFIPS",
                                                                },
                                                                false,
                                                              ],
                                                            },
                                                          ],
                                                          type: "tree",
                                                          rules: [
                                                            {
                                                              conditions: [],
                                                              type: "tree",
                                                              rules: [
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseDualStack",
                                                                        },
                                                                        true,
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "stringEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "Region",
                                                                        },
                                                                        "aws-global",
                                                                      ],
                                                                    },
                                                                  ],
                                                                  endpoint: {
                                                                    url: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                                    properties: {
                                                                      authSchemes: [
                                                                        {
                                                                          name: "sigv4",
                                                                          signingRegion: "us-east-1",
                                                                          disableDoubleEncoding: true,
                                                                          signingName: "s3",
                                                                        },
                                                                      ],
                                                                    },
                                                                    headers: {},
                                                                  },
                                                                  type: "endpoint",
                                                                },
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseDualStack",
                                                                        },
                                                                        true,
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "stringEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "Region",
                                                                        },
                                                                        "aws-global",
                                                                      ],
                                                                    },
                                                                  ],
                                                                  endpoint: {
                                                                    url: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                                    properties: {
                                                                      authSchemes: [
                                                                        {
                                                                          name: "sigv4",
                                                                          signingRegion: "us-east-1",
                                                                          disableDoubleEncoding: true,
                                                                          signingName: "s3",
                                                                        },
                                                                      ],
                                                                    },
                                                                    headers: {},
                                                                  },
                                                                  type: "endpoint",
                                                                },
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseDualStack",
                                                                        },
                                                                        true,
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseGlobalEndpoint",
                                                                        },
                                                                        true,
                                                                      ],
                                                                    },
                                                                  ],
                                                                  type: "tree",
                                                                  rules: [
                                                                    {
                                                                      conditions: [],
                                                                      endpoint: {
                                                                        url: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "{Region}",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                  ],
                                                                },
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseDualStack",
                                                                        },
                                                                        true,
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseGlobalEndpoint",
                                                                        },
                                                                        false,
                                                                      ],
                                                                    },
                                                                  ],
                                                                  endpoint: {
                                                                    url: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                                    properties: {
                                                                      authSchemes: [
                                                                        {
                                                                          name: "sigv4",
                                                                          signingRegion: "{Region}",
                                                                          disableDoubleEncoding: true,
                                                                          signingName: "s3",
                                                                        },
                                                                      ],
                                                                    },
                                                                    headers: {},
                                                                  },
                                                                  type: "endpoint",
                                                                },
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseDualStack",
                                                                        },
                                                                        false,
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "isSet",
                                                                      argv: [
                                                                        {
                                                                          ref: "Endpoint",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "parseURL",
                                                                      argv: [
                                                                        {
                                                                          ref: "Endpoint",
                                                                        },
                                                                      ],
                                                                      assign: "url",
                                                                    },
                                                                    {
                                                                      fn: "stringEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "Region",
                                                                        },
                                                                        "aws-global",
                                                                      ],
                                                                    },
                                                                  ],
                                                                  endpoint: {
                                                                    url: "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}",
                                                                    properties: {
                                                                      authSchemes: [
                                                                        {
                                                                          name: "sigv4",
                                                                          signingRegion: "us-east-1",
                                                                          disableDoubleEncoding: true,
                                                                          signingName: "s3",
                                                                        },
                                                                      ],
                                                                    },
                                                                    headers: {},
                                                                  },
                                                                  type: "endpoint",
                                                                },
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseDualStack",
                                                                        },
                                                                        false,
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "isSet",
                                                                      argv: [
                                                                        {
                                                                          ref: "Endpoint",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "parseURL",
                                                                      argv: [
                                                                        {
                                                                          ref: "Endpoint",
                                                                        },
                                                                      ],
                                                                      assign: "url",
                                                                    },
                                                                    {
                                                                      fn: "stringEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "Region",
                                                                        },
                                                                        "aws-global",
                                                                      ],
                                                                    },
                                                                  ],
                                                                  endpoint: {
                                                                    url: "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}",
                                                                    properties: {
                                                                      authSchemes: [
                                                                        {
                                                                          name: "sigv4",
                                                                          signingRegion: "us-east-1",
                                                                          disableDoubleEncoding: true,
                                                                          signingName: "s3",
                                                                        },
                                                                      ],
                                                                    },
                                                                    headers: {},
                                                                  },
                                                                  type: "endpoint",
                                                                },
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseDualStack",
                                                                        },
                                                                        false,
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "isSet",
                                                                      argv: [
                                                                        {
                                                                          ref: "Endpoint",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "parseURL",
                                                                      argv: [
                                                                        {
                                                                          ref: "Endpoint",
                                                                        },
                                                                      ],
                                                                      assign: "url",
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseGlobalEndpoint",
                                                                        },
                                                                        true,
                                                                      ],
                                                                    },
                                                                  ],
                                                                  type: "tree",
                                                                  rules: [
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "us-east-1",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "{Region}",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [],
                                                                      endpoint: {
                                                                        url: "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "{Region}",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                  ],
                                                                },
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseDualStack",
                                                                        },
                                                                        false,
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "isSet",
                                                                      argv: [
                                                                        {
                                                                          ref: "Endpoint",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "parseURL",
                                                                      argv: [
                                                                        {
                                                                          ref: "Endpoint",
                                                                        },
                                                                      ],
                                                                      assign: "url",
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseGlobalEndpoint",
                                                                        },
                                                                        false,
                                                                      ],
                                                                    },
                                                                  ],
                                                                  endpoint: {
                                                                    url: "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}",
                                                                    properties: {
                                                                      authSchemes: [
                                                                        {
                                                                          name: "sigv4",
                                                                          signingRegion: "{Region}",
                                                                          disableDoubleEncoding: true,
                                                                          signingName: "s3",
                                                                        },
                                                                      ],
                                                                    },
                                                                    headers: {},
                                                                  },
                                                                  type: "endpoint",
                                                                },
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseDualStack",
                                                                        },
                                                                        false,
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "stringEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "Region",
                                                                        },
                                                                        "aws-global",
                                                                      ],
                                                                    },
                                                                  ],
                                                                  endpoint: {
                                                                    url: "https://s3.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                                    properties: {
                                                                      authSchemes: [
                                                                        {
                                                                          name: "sigv4",
                                                                          signingRegion: "us-east-1",
                                                                          disableDoubleEncoding: true,
                                                                          signingName: "s3",
                                                                        },
                                                                      ],
                                                                    },
                                                                    headers: {},
                                                                  },
                                                                  type: "endpoint",
                                                                },
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseDualStack",
                                                                        },
                                                                        false,
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "stringEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "Region",
                                                                        },
                                                                        "aws-global",
                                                                      ],
                                                                    },
                                                                  ],
                                                                  endpoint: {
                                                                    url: "https://s3.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                                    properties: {
                                                                      authSchemes: [
                                                                        {
                                                                          name: "sigv4",
                                                                          signingRegion: "us-east-1",
                                                                          disableDoubleEncoding: true,
                                                                          signingName: "s3",
                                                                        },
                                                                      ],
                                                                    },
                                                                    headers: {},
                                                                  },
                                                                  type: "endpoint",
                                                                },
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseDualStack",
                                                                        },
                                                                        false,
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseGlobalEndpoint",
                                                                        },
                                                                        true,
                                                                      ],
                                                                    },
                                                                  ],
                                                                  type: "tree",
                                                                  rules: [
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "us-east-1",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://s3.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "{Region}",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [],
                                                                      endpoint: {
                                                                        url: "https://s3.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "{Region}",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                  ],
                                                                },
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseDualStack",
                                                                        },
                                                                        false,
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseGlobalEndpoint",
                                                                        },
                                                                        false,
                                                                      ],
                                                                    },
                                                                  ],
                                                                  endpoint: {
                                                                    url: "https://s3.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                                    properties: {
                                                                      authSchemes: [
                                                                        {
                                                                          name: "sigv4",
                                                                          signingRegion: "{Region}",
                                                                          disableDoubleEncoding: true,
                                                                          signingName: "s3",
                                                                        },
                                                                      ],
                                                                    },
                                                                    headers: {},
                                                                  },
                                                                  type: "endpoint",
                                                                },
                                                              ],
                                                            },
                                                          ],
                                                        },
                                                        {
                                                          conditions: [],
                                                          error: "Path-style addressing cannot be used with FIPS",
                                                          type: "error",
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                                {
                                                  conditions: [],
                                                  error: "Path-style addressing cannot be used with S3 Accelerate",
                                                  type: "error",
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                        {
                                          conditions: [],
                                          error: "A valid partition could not be determined",
                                          type: "error",
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          conditions: [
                            {
                              fn: "aws.isVirtualHostableS3Bucket",
                              argv: [
                                {
                                  ref: "Bucket",
                                },
                                false,
                              ],
                            },
                          ],
                          type: "tree",
                          rules: [
                            {
                              conditions: [
                                {
                                  fn: "aws.partition",
                                  argv: [
                                    {
                                      ref: "Region",
                                    },
                                  ],
                                  assign: "partitionResult",
                                },
                              ],
                              type: "tree",
                              rules: [
                                {
                                  conditions: [],
                                  type: "tree",
                                  rules: [
                                    {
                                      conditions: [
                                        {
                                          fn: "isValidHostLabel",
                                          argv: [
                                            {
                                              ref: "Region",
                                            },
                                            false,
                                          ],
                                        },
                                      ],
                                      type: "tree",
                                      rules: [
                                        {
                                          conditions: [],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [
                                                {
                                                  fn: "booleanEquals",
                                                  argv: [
                                                    {
                                                      ref: "UseFIPS",
                                                    },
                                                    true,
                                                  ],
                                                },
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      fn: "getAttr",
                                                      argv: [
                                                        {
                                                          ref: "partitionResult",
                                                        },
                                                        "name",
                                                      ],
                                                    },
                                                    "aws-cn",
                                                  ],
                                                },
                                              ],
                                              error: "Partition does not support FIPS",
                                              type: "error",
                                            },
                                            {
                                              conditions: [],
                                              type: "tree",
                                              rules: [
                                                {
                                                  conditions: [
                                                    {
                                                      fn: "booleanEquals",
                                                      argv: [
                                                        {
                                                          ref: "Accelerate",
                                                        },
                                                        true,
                                                      ],
                                                    },
                                                    {
                                                      fn: "booleanEquals",
                                                      argv: [
                                                        {
                                                          ref: "UseFIPS",
                                                        },
                                                        true,
                                                      ],
                                                    },
                                                  ],
                                                  error: "Accelerate cannot be used with FIPS",
                                                  type: "error",
                                                },
                                                {
                                                  conditions: [],
                                                  type: "tree",
                                                  rules: [
                                                    {
                                                      conditions: [
                                                        {
                                                          fn: "booleanEquals",
                                                          argv: [
                                                            {
                                                              ref: "Accelerate",
                                                            },
                                                            true,
                                                          ],
                                                        },
                                                        {
                                                          fn: "stringEquals",
                                                          argv: [
                                                            {
                                                              fn: "getAttr",
                                                              argv: [
                                                                {
                                                                  ref: "partitionResult",
                                                                },
                                                                "name",
                                                              ],
                                                            },
                                                            "aws-cn",
                                                          ],
                                                        },
                                                      ],
                                                      error: "S3 Accelerate cannot be used in this region",
                                                      type: "error",
                                                    },
                                                    {
                                                      conditions: [],
                                                      type: "tree",
                                                      rules: [
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "isSet",
                                                              argv: [
                                                                {
                                                                  ref: "Endpoint",
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                true,
                                                              ],
                                                            },
                                                          ],
                                                          error:
                                                            "Host override cannot be combined with Dualstack, FIPS, or S3 Accelerate",
                                                          type: "error",
                                                        },
                                                        {
                                                          conditions: [],
                                                          type: "tree",
                                                          rules: [
                                                            {
                                                              conditions: [
                                                                {
                                                                  fn: "isSet",
                                                                  argv: [
                                                                    {
                                                                      ref: "Endpoint",
                                                                    },
                                                                  ],
                                                                },
                                                                {
                                                                  fn: "booleanEquals",
                                                                  argv: [
                                                                    {
                                                                      ref: "UseFIPS",
                                                                    },
                                                                    true,
                                                                  ],
                                                                },
                                                              ],
                                                              error:
                                                                "Host override cannot be combined with Dualstack, FIPS, or S3 Accelerate",
                                                              type: "error",
                                                            },
                                                            {
                                                              conditions: [],
                                                              type: "tree",
                                                              rules: [
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "isSet",
                                                                      argv: [
                                                                        {
                                                                          ref: "Endpoint",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "Accelerate",
                                                                        },
                                                                        true,
                                                                      ],
                                                                    },
                                                                  ],
                                                                  error:
                                                                    "Host override cannot be combined with Dualstack, FIPS, or S3 Accelerate",
                                                                  type: "error",
                                                                },
                                                                {
                                                                  conditions: [],
                                                                  type: "tree",
                                                                  rules: [
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      type: "tree",
                                                                      rules: [
                                                                        {
                                                                          conditions: [],
                                                                          endpoint: {
                                                                            url: "https://{Bucket}.s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}",
                                                                            properties: {
                                                                              authSchemes: [
                                                                                {
                                                                                  name: "sigv4",
                                                                                  signingRegion: "{Region}",
                                                                                  disableDoubleEncoding: true,
                                                                                  signingName: "s3",
                                                                                },
                                                                              ],
                                                                            },
                                                                            headers: {},
                                                                          },
                                                                          type: "endpoint",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "{Region}",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3-fips.us-east-1.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3-fips.us-east-1.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      type: "tree",
                                                                      rules: [
                                                                        {
                                                                          conditions: [],
                                                                          endpoint: {
                                                                            url: "https://{Bucket}.s3-fips.{Region}.{partitionResult#dnsSuffix}",
                                                                            properties: {
                                                                              authSchemes: [
                                                                                {
                                                                                  name: "sigv4",
                                                                                  signingRegion: "{Region}",
                                                                                  disableDoubleEncoding: true,
                                                                                  signingName: "s3",
                                                                                },
                                                                              ],
                                                                            },
                                                                            headers: {},
                                                                          },
                                                                          type: "endpoint",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3-fips.{Region}.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "{Region}",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3-accelerate.dualstack.us-east-1.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3-accelerate.dualstack.us-east-1.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      type: "tree",
                                                                      rules: [
                                                                        {
                                                                          conditions: [],
                                                                          endpoint: {
                                                                            url: "https://{Bucket}.s3-accelerate.dualstack.{partitionResult#dnsSuffix}",
                                                                            properties: {
                                                                              authSchemes: [
                                                                                {
                                                                                  name: "sigv4",
                                                                                  signingRegion: "{Region}",
                                                                                  disableDoubleEncoding: true,
                                                                                  signingName: "s3",
                                                                                },
                                                                              ],
                                                                            },
                                                                            headers: {},
                                                                          },
                                                                          type: "endpoint",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3-accelerate.dualstack.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "{Region}",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3.dualstack.us-east-1.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3.dualstack.us-east-1.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      type: "tree",
                                                                      rules: [
                                                                        {
                                                                          conditions: [],
                                                                          endpoint: {
                                                                            url: "https://{Bucket}.s3.dualstack.{Region}.{partitionResult#dnsSuffix}",
                                                                            properties: {
                                                                              authSchemes: [
                                                                                {
                                                                                  name: "sigv4",
                                                                                  signingRegion: "{Region}",
                                                                                  disableDoubleEncoding: true,
                                                                                  signingName: "s3",
                                                                                },
                                                                              ],
                                                                            },
                                                                            headers: {},
                                                                          },
                                                                          type: "endpoint",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3.dualstack.{Region}.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "{Region}",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "parseURL",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                          assign: "url",
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              fn: "getAttr",
                                                                              argv: [
                                                                                {
                                                                                  ref: "url",
                                                                                },
                                                                                "isIp",
                                                                              ],
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "{url#scheme}://{url#authority}{url#normalizedPath}{Bucket}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "parseURL",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                          assign: "url",
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              fn: "getAttr",
                                                                              argv: [
                                                                                {
                                                                                  ref: "url",
                                                                                },
                                                                                "isIp",
                                                                              ],
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "{url#scheme}://{Bucket}.{url#authority}{url#path}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "parseURL",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                          assign: "url",
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              fn: "getAttr",
                                                                              argv: [
                                                                                {
                                                                                  ref: "url",
                                                                                },
                                                                                "isIp",
                                                                              ],
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "{url#scheme}://{url#authority}{url#normalizedPath}{Bucket}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "parseURL",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                          assign: "url",
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              fn: "getAttr",
                                                                              argv: [
                                                                                {
                                                                                  ref: "url",
                                                                                },
                                                                                "isIp",
                                                                              ],
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "{url#scheme}://{Bucket}.{url#authority}{url#path}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "parseURL",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                          assign: "url",
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              fn: "getAttr",
                                                                              argv: [
                                                                                {
                                                                                  ref: "url",
                                                                                },
                                                                                "isIp",
                                                                              ],
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      type: "tree",
                                                                      rules: [
                                                                        {
                                                                          conditions: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "us-east-1",
                                                                              ],
                                                                            },
                                                                          ],
                                                                          endpoint: {
                                                                            url: "{url#scheme}://{url#authority}{url#normalizedPath}{Bucket}",
                                                                            properties: {
                                                                              authSchemes: [
                                                                                {
                                                                                  name: "sigv4",
                                                                                  signingRegion: "{Region}",
                                                                                  disableDoubleEncoding: true,
                                                                                  signingName: "s3",
                                                                                },
                                                                              ],
                                                                            },
                                                                            headers: {},
                                                                          },
                                                                          type: "endpoint",
                                                                        },
                                                                        {
                                                                          conditions: [],
                                                                          endpoint: {
                                                                            url: "{url#scheme}://{url#authority}{url#normalizedPath}{Bucket}",
                                                                            properties: {
                                                                              authSchemes: [
                                                                                {
                                                                                  name: "sigv4",
                                                                                  signingRegion: "{Region}",
                                                                                  disableDoubleEncoding: true,
                                                                                  signingName: "s3",
                                                                                },
                                                                              ],
                                                                            },
                                                                            headers: {},
                                                                          },
                                                                          type: "endpoint",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "parseURL",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                          assign: "url",
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              fn: "getAttr",
                                                                              argv: [
                                                                                {
                                                                                  ref: "url",
                                                                                },
                                                                                "isIp",
                                                                              ],
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      type: "tree",
                                                                      rules: [
                                                                        {
                                                                          conditions: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "us-east-1",
                                                                              ],
                                                                            },
                                                                          ],
                                                                          endpoint: {
                                                                            url: "{url#scheme}://{Bucket}.{url#authority}{url#path}",
                                                                            properties: {
                                                                              authSchemes: [
                                                                                {
                                                                                  name: "sigv4",
                                                                                  signingRegion: "{Region}",
                                                                                  disableDoubleEncoding: true,
                                                                                  signingName: "s3",
                                                                                },
                                                                              ],
                                                                            },
                                                                            headers: {},
                                                                          },
                                                                          type: "endpoint",
                                                                        },
                                                                        {
                                                                          conditions: [],
                                                                          endpoint: {
                                                                            url: "{url#scheme}://{Bucket}.{url#authority}{url#path}",
                                                                            properties: {
                                                                              authSchemes: [
                                                                                {
                                                                                  name: "sigv4",
                                                                                  signingRegion: "{Region}",
                                                                                  disableDoubleEncoding: true,
                                                                                  signingName: "s3",
                                                                                },
                                                                              ],
                                                                            },
                                                                            headers: {},
                                                                          },
                                                                          type: "endpoint",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "parseURL",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                          assign: "url",
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              fn: "getAttr",
                                                                              argv: [
                                                                                {
                                                                                  ref: "url",
                                                                                },
                                                                                "isIp",
                                                                              ],
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "{url#scheme}://{url#authority}{url#normalizedPath}{Bucket}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "{Region}",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "isSet",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "parseURL",
                                                                          argv: [
                                                                            {
                                                                              ref: "Endpoint",
                                                                            },
                                                                          ],
                                                                          assign: "url",
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              fn: "getAttr",
                                                                              argv: [
                                                                                {
                                                                                  ref: "url",
                                                                                },
                                                                                "isIp",
                                                                              ],
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "{url#scheme}://{Bucket}.{url#authority}{url#path}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "{Region}",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3-accelerate.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3-accelerate.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      type: "tree",
                                                                      rules: [
                                                                        {
                                                                          conditions: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "us-east-1",
                                                                              ],
                                                                            },
                                                                          ],
                                                                          endpoint: {
                                                                            url: "https://{Bucket}.s3-accelerate.{partitionResult#dnsSuffix}",
                                                                            properties: {
                                                                              authSchemes: [
                                                                                {
                                                                                  name: "sigv4",
                                                                                  signingRegion: "{Region}",
                                                                                  disableDoubleEncoding: true,
                                                                                  signingName: "s3",
                                                                                },
                                                                              ],
                                                                            },
                                                                            headers: {},
                                                                          },
                                                                          type: "endpoint",
                                                                        },
                                                                        {
                                                                          conditions: [],
                                                                          endpoint: {
                                                                            url: "https://{Bucket}.s3-accelerate.{partitionResult#dnsSuffix}",
                                                                            properties: {
                                                                              authSchemes: [
                                                                                {
                                                                                  name: "sigv4",
                                                                                  signingRegion: "{Region}",
                                                                                  disableDoubleEncoding: true,
                                                                                  signingName: "s3",
                                                                                },
                                                                              ],
                                                                            },
                                                                            headers: {},
                                                                          },
                                                                          type: "endpoint",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3-accelerate.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "{Region}",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Region",
                                                                            },
                                                                            "aws-global",
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "us-east-1",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      type: "tree",
                                                                      rules: [
                                                                        {
                                                                          conditions: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "us-east-1",
                                                                              ],
                                                                            },
                                                                          ],
                                                                          endpoint: {
                                                                            url: "https://{Bucket}.s3.{partitionResult#dnsSuffix}",
                                                                            properties: {
                                                                              authSchemes: [
                                                                                {
                                                                                  name: "sigv4",
                                                                                  signingRegion: "{Region}",
                                                                                  disableDoubleEncoding: true,
                                                                                  signingName: "s3",
                                                                                },
                                                                              ],
                                                                            },
                                                                            headers: {},
                                                                          },
                                                                          type: "endpoint",
                                                                        },
                                                                        {
                                                                          conditions: [],
                                                                          endpoint: {
                                                                            url: "https://{Bucket}.s3.{Region}.{partitionResult#dnsSuffix}",
                                                                            properties: {
                                                                              authSchemes: [
                                                                                {
                                                                                  name: "sigv4",
                                                                                  signingRegion: "{Region}",
                                                                                  disableDoubleEncoding: true,
                                                                                  signingName: "s3",
                                                                                },
                                                                              ],
                                                                            },
                                                                            headers: {},
                                                                          },
                                                                          type: "endpoint",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseDualStack",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseFIPS",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Endpoint",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "stringEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "Region",
                                                                                },
                                                                                "aws-global",
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "UseGlobalEndpoint",
                                                                            },
                                                                            false,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      endpoint: {
                                                                        url: "https://{Bucket}.s3.{Region}.{partitionResult#dnsSuffix}",
                                                                        properties: {
                                                                          authSchemes: [
                                                                            {
                                                                              name: "sigv4",
                                                                              signingRegion: "{Region}",
                                                                              disableDoubleEncoding: true,
                                                                              signingName: "s3",
                                                                            },
                                                                          ],
                                                                        },
                                                                        headers: {},
                                                                      },
                                                                      type: "endpoint",
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      conditions: [],
                                      error: "Invalid region: region was not a valid DNS name.",
                                      type: "error",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              conditions: [],
                              error: "A valid partition could not be determined",
                              type: "error",
                            },
                          ],
                        },
                        {
                          conditions: [
                            {
                              fn: "isSet",
                              argv: [
                                {
                                  ref: "Endpoint",
                                },
                              ],
                            },
                            {
                              fn: "parseURL",
                              argv: [
                                {
                                  ref: "Endpoint",
                                },
                              ],
                              assign: "url",
                            },
                            {
                              fn: "stringEquals",
                              argv: [
                                {
                                  fn: "getAttr",
                                  argv: [
                                    {
                                      ref: "url",
                                    },
                                    "scheme",
                                  ],
                                },
                                "http",
                              ],
                            },
                            {
                              fn: "aws.isVirtualHostableS3Bucket",
                              argv: [
                                {
                                  ref: "Bucket",
                                },
                                true,
                              ],
                            },
                            {
                              fn: "booleanEquals",
                              argv: [
                                {
                                  ref: "UseFIPS",
                                },
                                false,
                              ],
                            },
                            {
                              fn: "booleanEquals",
                              argv: [
                                {
                                  ref: "UseDualStack",
                                },
                                false,
                              ],
                            },
                            {
                              fn: "booleanEquals",
                              argv: [
                                {
                                  ref: "Accelerate",
                                },
                                false,
                              ],
                            },
                          ],
                          type: "tree",
                          rules: [
                            {
                              conditions: [
                                {
                                  fn: "aws.partition",
                                  argv: [
                                    {
                                      ref: "Region",
                                    },
                                  ],
                                  assign: "partitionResult",
                                },
                              ],
                              type: "tree",
                              rules: [
                                {
                                  conditions: [],
                                  type: "tree",
                                  rules: [
                                    {
                                      conditions: [
                                        {
                                          fn: "isValidHostLabel",
                                          argv: [
                                            {
                                              ref: "Region",
                                            },
                                            false,
                                          ],
                                        },
                                      ],
                                      type: "tree",
                                      rules: [
                                        {
                                          conditions: [],
                                          endpoint: {
                                            url: "{url#scheme}://{Bucket}.{url#authority}{url#path}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "{Region}",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                      ],
                                    },
                                    {
                                      conditions: [],
                                      error: "Invalid region: region was not a valid DNS name.",
                                      type: "error",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              conditions: [],
                              error: "A valid partition could not be determined",
                              type: "error",
                            },
                          ],
                        },
                        {
                          conditions: [
                            {
                              fn: "aws.parseArn",
                              argv: [
                                {
                                  ref: "Bucket",
                                },
                              ],
                              assign: "bucketArn",
                            },
                          ],
                          type: "tree",
                          rules: [
                            {
                              conditions: [
                                {
                                  fn: "getAttr",
                                  argv: [
                                    {
                                      ref: "bucketArn",
                                    },
                                    "resourceId[0]",
                                  ],
                                  assign: "arnType",
                                },
                                {
                                  fn: "not",
                                  argv: [
                                    {
                                      fn: "stringEquals",
                                      argv: [
                                        {
                                          ref: "arnType",
                                        },
                                        "",
                                      ],
                                    },
                                  ],
                                },
                              ],
                              type: "tree",
                              rules: [
                                {
                                  conditions: [],
                                  type: "tree",
                                  rules: [
                                    {
                                      conditions: [
                                        {
                                          fn: "stringEquals",
                                          argv: [
                                            {
                                              fn: "getAttr",
                                              argv: [
                                                {
                                                  ref: "bucketArn",
                                                },
                                                "service",
                                              ],
                                            },
                                            "s3-object-lambda",
                                          ],
                                        },
                                      ],
                                      type: "tree",
                                      rules: [
                                        {
                                          conditions: [
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "arnType",
                                                },
                                                "accesspoint",
                                              ],
                                            },
                                          ],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [],
                                              type: "tree",
                                              rules: [
                                                {
                                                  conditions: [
                                                    {
                                                      fn: "getAttr",
                                                      argv: [
                                                        {
                                                          ref: "bucketArn",
                                                        },
                                                        "resourceId[1]",
                                                      ],
                                                      assign: "accessPointName",
                                                    },
                                                    {
                                                      fn: "not",
                                                      argv: [
                                                        {
                                                          fn: "stringEquals",
                                                          argv: [
                                                            {
                                                              ref: "accessPointName",
                                                            },
                                                            "",
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                  type: "tree",
                                                  rules: [
                                                    {
                                                      conditions: [],
                                                      type: "tree",
                                                      rules: [
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                true,
                                                              ],
                                                            },
                                                          ],
                                                          error: "S3 Object Lambda does not support Dual-stack",
                                                          type: "error",
                                                        },
                                                        {
                                                          conditions: [],
                                                          type: "tree",
                                                          rules: [
                                                            {
                                                              conditions: [
                                                                {
                                                                  fn: "booleanEquals",
                                                                  argv: [
                                                                    {
                                                                      ref: "Accelerate",
                                                                    },
                                                                    true,
                                                                  ],
                                                                },
                                                              ],
                                                              error: "S3 Object Lambda does not support S3 Accelerate",
                                                              type: "error",
                                                            },
                                                            {
                                                              conditions: [],
                                                              type: "tree",
                                                              rules: [
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "not",
                                                                      argv: [
                                                                        {
                                                                          fn: "stringEquals",
                                                                          argv: [
                                                                            {
                                                                              fn: "getAttr",
                                                                              argv: [
                                                                                {
                                                                                  ref: "bucketArn",
                                                                                },
                                                                                "region",
                                                                              ],
                                                                            },
                                                                            "",
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                  ],
                                                                  type: "tree",
                                                                  rules: [
                                                                    {
                                                                      conditions: [],
                                                                      type: "tree",
                                                                      rules: [
                                                                        {
                                                                          conditions: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "DisableAccessPoints",
                                                                                },
                                                                              ],
                                                                            },
                                                                            {
                                                                              fn: "booleanEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "DisableAccessPoints",
                                                                                },
                                                                                true,
                                                                              ],
                                                                            },
                                                                          ],
                                                                          error:
                                                                            "Access points are not supported for this operation",
                                                                          type: "error",
                                                                        },
                                                                        {
                                                                          conditions: [],
                                                                          type: "tree",
                                                                          rules: [
                                                                            {
                                                                              conditions: [
                                                                                {
                                                                                  fn: "not",
                                                                                  argv: [
                                                                                    {
                                                                                      fn: "isSet",
                                                                                      argv: [
                                                                                        {
                                                                                          fn: "getAttr",
                                                                                          argv: [
                                                                                            {
                                                                                              ref: "bucketArn",
                                                                                            },
                                                                                            "resourceId[2]",
                                                                                          ],
                                                                                        },
                                                                                      ],
                                                                                    },
                                                                                  ],
                                                                                },
                                                                              ],
                                                                              type: "tree",
                                                                              rules: [
                                                                                {
                                                                                  conditions: [],
                                                                                  type: "tree",
                                                                                  rules: [
                                                                                    {
                                                                                      conditions: [
                                                                                        {
                                                                                          fn: "isSet",
                                                                                          argv: [
                                                                                            {
                                                                                              ref: "UseArnRegion",
                                                                                            },
                                                                                          ],
                                                                                        },
                                                                                        {
                                                                                          fn: "booleanEquals",
                                                                                          argv: [
                                                                                            {
                                                                                              ref: "UseArnRegion",
                                                                                            },
                                                                                            false,
                                                                                          ],
                                                                                        },
                                                                                        {
                                                                                          fn: "not",
                                                                                          argv: [
                                                                                            {
                                                                                              fn: "stringEquals",
                                                                                              argv: [
                                                                                                {
                                                                                                  fn: "getAttr",
                                                                                                  argv: [
                                                                                                    {
                                                                                                      ref: "bucketArn",
                                                                                                    },
                                                                                                    "region",
                                                                                                  ],
                                                                                                },
                                                                                                "{Region}",
                                                                                              ],
                                                                                            },
                                                                                          ],
                                                                                        },
                                                                                      ],
                                                                                      error:
                                                                                        "Invalid configuration: region from ARN `{bucketArn#region}` does not match client region `{Region}` and UseArnRegion is `false`",
                                                                                      type: "error",
                                                                                    },
                                                                                    {
                                                                                      conditions: [],
                                                                                      type: "tree",
                                                                                      rules: [
                                                                                        {
                                                                                          conditions: [
                                                                                            {
                                                                                              fn: "aws.partition",
                                                                                              argv: [
                                                                                                {
                                                                                                  fn: "getAttr",
                                                                                                  argv: [
                                                                                                    {
                                                                                                      ref: "bucketArn",
                                                                                                    },
                                                                                                    "region",
                                                                                                  ],
                                                                                                },
                                                                                              ],
                                                                                              assign: "bucketPartition",
                                                                                            },
                                                                                          ],
                                                                                          type: "tree",
                                                                                          rules: [
                                                                                            {
                                                                                              conditions: [],
                                                                                              type: "tree",
                                                                                              rules: [
                                                                                                {
                                                                                                  conditions: [
                                                                                                    {
                                                                                                      fn: "aws.partition",
                                                                                                      argv: [
                                                                                                        {
                                                                                                          ref: "Region",
                                                                                                        },
                                                                                                      ],
                                                                                                      assign:
                                                                                                        "partitionResult",
                                                                                                    },
                                                                                                  ],
                                                                                                  type: "tree",
                                                                                                  rules: [
                                                                                                    {
                                                                                                      conditions: [],
                                                                                                      type: "tree",
                                                                                                      rules: [
                                                                                                        {
                                                                                                          conditions: [
                                                                                                            {
                                                                                                              fn: "stringEquals",
                                                                                                              argv: [
                                                                                                                {
                                                                                                                  fn: "getAttr",
                                                                                                                  argv: [
                                                                                                                    {
                                                                                                                      ref: "bucketPartition",
                                                                                                                    },
                                                                                                                    "name",
                                                                                                                  ],
                                                                                                                },
                                                                                                                {
                                                                                                                  fn: "getAttr",
                                                                                                                  argv: [
                                                                                                                    {
                                                                                                                      ref: "partitionResult",
                                                                                                                    },
                                                                                                                    "name",
                                                                                                                  ],
                                                                                                                },
                                                                                                              ],
                                                                                                            },
                                                                                                          ],
                                                                                                          type: "tree",
                                                                                                          rules: [
                                                                                                            {
                                                                                                              conditions:
                                                                                                                [],
                                                                                                              type: "tree",
                                                                                                              rules: [
                                                                                                                {
                                                                                                                  conditions:
                                                                                                                    [
                                                                                                                      {
                                                                                                                        fn: "isValidHostLabel",
                                                                                                                        argv: [
                                                                                                                          {
                                                                                                                            fn: "getAttr",
                                                                                                                            argv: [
                                                                                                                              {
                                                                                                                                ref: "bucketArn",
                                                                                                                              },
                                                                                                                              "region",
                                                                                                                            ],
                                                                                                                          },
                                                                                                                          true,
                                                                                                                        ],
                                                                                                                      },
                                                                                                                    ],
                                                                                                                  type: "tree",
                                                                                                                  rules:
                                                                                                                    [
                                                                                                                      {
                                                                                                                        conditions:
                                                                                                                          [],
                                                                                                                        type: "tree",
                                                                                                                        rules:
                                                                                                                          [
                                                                                                                            {
                                                                                                                              conditions:
                                                                                                                                [
                                                                                                                                  {
                                                                                                                                    fn: "stringEquals",
                                                                                                                                    argv: [
                                                                                                                                      {
                                                                                                                                        fn: "getAttr",
                                                                                                                                        argv: [
                                                                                                                                          {
                                                                                                                                            ref: "bucketArn",
                                                                                                                                          },
                                                                                                                                          "accountId",
                                                                                                                                        ],
                                                                                                                                      },
                                                                                                                                      "",
                                                                                                                                    ],
                                                                                                                                  },
                                                                                                                                ],
                                                                                                                              error:
                                                                                                                                "Invalid ARN: Missing account id",
                                                                                                                              type: "error",
                                                                                                                            },
                                                                                                                            {
                                                                                                                              conditions:
                                                                                                                                [],
                                                                                                                              type: "tree",
                                                                                                                              rules:
                                                                                                                                [
                                                                                                                                  {
                                                                                                                                    conditions:
                                                                                                                                      [
                                                                                                                                        {
                                                                                                                                          fn: "isValidHostLabel",
                                                                                                                                          argv: [
                                                                                                                                            {
                                                                                                                                              fn: "getAttr",
                                                                                                                                              argv: [
                                                                                                                                                {
                                                                                                                                                  ref: "bucketArn",
                                                                                                                                                },
                                                                                                                                                "accountId",
                                                                                                                                              ],
                                                                                                                                            },
                                                                                                                                            false,
                                                                                                                                          ],
                                                                                                                                        },
                                                                                                                                      ],
                                                                                                                                    type: "tree",
                                                                                                                                    rules:
                                                                                                                                      [
                                                                                                                                        {
                                                                                                                                          conditions:
                                                                                                                                            [],
                                                                                                                                          type: "tree",
                                                                                                                                          rules:
                                                                                                                                            [
                                                                                                                                              {
                                                                                                                                                conditions:
                                                                                                                                                  [
                                                                                                                                                    {
                                                                                                                                                      fn: "isValidHostLabel",
                                                                                                                                                      argv: [
                                                                                                                                                        {
                                                                                                                                                          ref: "accessPointName",
                                                                                                                                                        },
                                                                                                                                                        false,
                                                                                                                                                      ],
                                                                                                                                                    },
                                                                                                                                                  ],
                                                                                                                                                type: "tree",
                                                                                                                                                rules:
                                                                                                                                                  [
                                                                                                                                                    {
                                                                                                                                                      conditions:
                                                                                                                                                        [],
                                                                                                                                                      type: "tree",
                                                                                                                                                      rules:
                                                                                                                                                        [
                                                                                                                                                          {
                                                                                                                                                            conditions:
                                                                                                                                                              [
                                                                                                                                                                {
                                                                                                                                                                  fn: "booleanEquals",
                                                                                                                                                                  argv: [
                                                                                                                                                                    {
                                                                                                                                                                      ref: "UseFIPS",
                                                                                                                                                                    },
                                                                                                                                                                    true,
                                                                                                                                                                  ],
                                                                                                                                                                },
                                                                                                                                                                {
                                                                                                                                                                  fn: "stringEquals",
                                                                                                                                                                  argv: [
                                                                                                                                                                    {
                                                                                                                                                                      fn: "getAttr",
                                                                                                                                                                      argv: [
                                                                                                                                                                        {
                                                                                                                                                                          ref: "bucketPartition",
                                                                                                                                                                        },
                                                                                                                                                                        "name",
                                                                                                                                                                      ],
                                                                                                                                                                    },
                                                                                                                                                                    "aws-cn",
                                                                                                                                                                  ],
                                                                                                                                                                },
                                                                                                                                                              ],
                                                                                                                                                            error:
                                                                                                                                                              "Partition does not support FIPS",
                                                                                                                                                            type: "error",
                                                                                                                                                          },
                                                                                                                                                          {
                                                                                                                                                            conditions:
                                                                                                                                                              [],
                                                                                                                                                            type: "tree",
                                                                                                                                                            rules:
                                                                                                                                                              [
                                                                                                                                                                {
                                                                                                                                                                  conditions:
                                                                                                                                                                    [
                                                                                                                                                                      {
                                                                                                                                                                        fn: "isSet",
                                                                                                                                                                        argv: [
                                                                                                                                                                          {
                                                                                                                                                                            ref: "Endpoint",
                                                                                                                                                                          },
                                                                                                                                                                        ],
                                                                                                                                                                      },
                                                                                                                                                                      {
                                                                                                                                                                        fn: "parseURL",
                                                                                                                                                                        argv: [
                                                                                                                                                                          {
                                                                                                                                                                            ref: "Endpoint",
                                                                                                                                                                          },
                                                                                                                                                                        ],
                                                                                                                                                                        assign:
                                                                                                                                                                          "url",
                                                                                                                                                                      },
                                                                                                                                                                    ],
                                                                                                                                                                  endpoint:
                                                                                                                                                                    {
                                                                                                                                                                      url: "{url#scheme}://{accessPointName}-{bucketArn#accountId}.{url#authority}{url#path}",
                                                                                                                                                                      properties:
                                                                                                                                                                        {
                                                                                                                                                                          authSchemes:
                                                                                                                                                                            [
                                                                                                                                                                              {
                                                                                                                                                                                name: "sigv4",
                                                                                                                                                                                signingRegion:
                                                                                                                                                                                  "{bucketArn#region}",
                                                                                                                                                                                disableDoubleEncoding:
                                                                                                                                                                                  true,
                                                                                                                                                                                signingName:
                                                                                                                                                                                  "s3-object-lambda",
                                                                                                                                                                              },
                                                                                                                                                                            ],
                                                                                                                                                                        },
                                                                                                                                                                      headers:
                                                                                                                                                                        {},
                                                                                                                                                                    },
                                                                                                                                                                  type: "endpoint",
                                                                                                                                                                },
                                                                                                                                                                {
                                                                                                                                                                  conditions:
                                                                                                                                                                    [
                                                                                                                                                                      {
                                                                                                                                                                        fn: "booleanEquals",
                                                                                                                                                                        argv: [
                                                                                                                                                                          {
                                                                                                                                                                            ref: "UseFIPS",
                                                                                                                                                                          },
                                                                                                                                                                          true,
                                                                                                                                                                        ],
                                                                                                                                                                      },
                                                                                                                                                                    ],
                                                                                                                                                                  endpoint:
                                                                                                                                                                    {
                                                                                                                                                                      url: "https://{accessPointName}-{bucketArn#accountId}.s3-object-lambda-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}",
                                                                                                                                                                      properties:
                                                                                                                                                                        {
                                                                                                                                                                          authSchemes:
                                                                                                                                                                            [
                                                                                                                                                                              {
                                                                                                                                                                                name: "sigv4",
                                                                                                                                                                                signingRegion:
                                                                                                                                                                                  "{bucketArn#region}",
                                                                                                                                                                                disableDoubleEncoding:
                                                                                                                                                                                  true,
                                                                                                                                                                                signingName:
                                                                                                                                                                                  "s3-object-lambda",
                                                                                                                                                                              },
                                                                                                                                                                            ],
                                                                                                                                                                        },
                                                                                                                                                                      headers:
                                                                                                                                                                        {},
                                                                                                                                                                    },
                                                                                                                                                                  type: "endpoint",
                                                                                                                                                                },
                                                                                                                                                                {
                                                                                                                                                                  conditions:
                                                                                                                                                                    [],
                                                                                                                                                                  endpoint:
                                                                                                                                                                    {
                                                                                                                                                                      url: "https://{accessPointName}-{bucketArn#accountId}.s3-object-lambda.{bucketArn#region}.{bucketPartition#dnsSuffix}",
                                                                                                                                                                      properties:
                                                                                                                                                                        {
                                                                                                                                                                          authSchemes:
                                                                                                                                                                            [
                                                                                                                                                                              {
                                                                                                                                                                                name: "sigv4",
                                                                                                                                                                                signingRegion:
                                                                                                                                                                                  "{bucketArn#region}",
                                                                                                                                                                                disableDoubleEncoding:
                                                                                                                                                                                  true,
                                                                                                                                                                                signingName:
                                                                                                                                                                                  "s3-object-lambda",
                                                                                                                                                                              },
                                                                                                                                                                            ],
                                                                                                                                                                        },
                                                                                                                                                                      headers:
                                                                                                                                                                        {},
                                                                                                                                                                    },
                                                                                                                                                                  type: "endpoint",
                                                                                                                                                                },
                                                                                                                                                              ],
                                                                                                                                                          },
                                                                                                                                                        ],
                                                                                                                                                    },
                                                                                                                                                  ],
                                                                                                                                              },
                                                                                                                                              {
                                                                                                                                                conditions:
                                                                                                                                                  [],
                                                                                                                                                error:
                                                                                                                                                  "Invalid ARN: The access point name may only contain a-z, A-Z, 0-9 and `-`. Found: `{accessPointName}`",
                                                                                                                                                type: "error",
                                                                                                                                              },
                                                                                                                                            ],
                                                                                                                                        },
                                                                                                                                      ],
                                                                                                                                  },
                                                                                                                                  {
                                                                                                                                    conditions:
                                                                                                                                      [],
                                                                                                                                    error:
                                                                                                                                      "Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and `-`. Found: `{bucketArn#accountId}`",
                                                                                                                                    type: "error",
                                                                                                                                  },
                                                                                                                                ],
                                                                                                                            },
                                                                                                                          ],
                                                                                                                      },
                                                                                                                    ],
                                                                                                                },
                                                                                                                {
                                                                                                                  conditions:
                                                                                                                    [],
                                                                                                                  error:
                                                                                                                    "Invalid region in ARN: `{bucketArn#region}` (invalid DNS name)",
                                                                                                                  type: "error",
                                                                                                                },
                                                                                                              ],
                                                                                                            },
                                                                                                          ],
                                                                                                        },
                                                                                                        {
                                                                                                          conditions:
                                                                                                            [],
                                                                                                          error:
                                                                                                            "Client was configured for partition `{partitionResult#name}` but ARN (`{Bucket}`) has `{bucketPartition#name}`",
                                                                                                          type: "error",
                                                                                                        },
                                                                                                      ],
                                                                                                    },
                                                                                                  ],
                                                                                                },
                                                                                                {
                                                                                                  conditions: [],
                                                                                                  error:
                                                                                                    "A valid partition could not be determined",
                                                                                                  type: "error",
                                                                                                },
                                                                                              ],
                                                                                            },
                                                                                          ],
                                                                                        },
                                                                                        {
                                                                                          conditions: [],
                                                                                          error:
                                                                                            "Could not load partition for ARN region `{bucketArn#region}`",
                                                                                          type: "error",
                                                                                        },
                                                                                      ],
                                                                                    },
                                                                                  ],
                                                                                },
                                                                              ],
                                                                            },
                                                                            {
                                                                              conditions: [],
                                                                              error:
                                                                                "Invalid ARN: The ARN may only contain a single resource component after `accesspoint`.",
                                                                              type: "error",
                                                                            },
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                  ],
                                                                },
                                                                {
                                                                  conditions: [],
                                                                  error: "Invalid ARN: bucket ARN is missing a region",
                                                                  type: "error",
                                                                },
                                                              ],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                                {
                                                  conditions: [],
                                                  error:
                                                    "Invalid ARN: Expected a resource of the format `accesspoint:<accesspoint name>` but no name was provided",
                                                  type: "error",
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                        {
                                          conditions: [],
                                          error:
                                            "Invalid ARN: Object Lambda ARNs only support `accesspoint` arn types, but found: `{arnType}`",
                                          type: "error",
                                        },
                                      ],
                                    },
                                    {
                                      conditions: [
                                        {
                                          fn: "stringEquals",
                                          argv: [
                                            {
                                              ref: "arnType",
                                            },
                                            "accesspoint",
                                          ],
                                        },
                                      ],
                                      type: "tree",
                                      rules: [
                                        {
                                          conditions: [
                                            {
                                              fn: "getAttr",
                                              argv: [
                                                {
                                                  ref: "bucketArn",
                                                },
                                                "resourceId[1]",
                                              ],
                                              assign: "accessPointName",
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "accessPointName",
                                                    },
                                                    "",
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [],
                                              type: "tree",
                                              rules: [
                                                {
                                                  conditions: [
                                                    {
                                                      fn: "not",
                                                      argv: [
                                                        {
                                                          fn: "stringEquals",
                                                          argv: [
                                                            {
                                                              fn: "getAttr",
                                                              argv: [
                                                                {
                                                                  ref: "bucketArn",
                                                                },
                                                                "region",
                                                              ],
                                                            },
                                                            "",
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                  type: "tree",
                                                  rules: [
                                                    {
                                                      conditions: [
                                                        {
                                                          fn: "stringEquals",
                                                          argv: [
                                                            {
                                                              ref: "arnType",
                                                            },
                                                            "accesspoint",
                                                          ],
                                                        },
                                                      ],
                                                      type: "tree",
                                                      rules: [
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "stringEquals",
                                                                  argv: [
                                                                    {
                                                                      fn: "getAttr",
                                                                      argv: [
                                                                        {
                                                                          ref: "bucketArn",
                                                                        },
                                                                        "region",
                                                                      ],
                                                                    },
                                                                    "",
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                          ],
                                                          type: "tree",
                                                          rules: [
                                                            {
                                                              conditions: [],
                                                              type: "tree",
                                                              rules: [
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "isSet",
                                                                      argv: [
                                                                        {
                                                                          ref: "DisableAccessPoints",
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "DisableAccessPoints",
                                                                        },
                                                                        true,
                                                                      ],
                                                                    },
                                                                  ],
                                                                  error:
                                                                    "Access points are not supported for this operation",
                                                                  type: "error",
                                                                },
                                                                {
                                                                  conditions: [],
                                                                  type: "tree",
                                                                  rules: [
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "not",
                                                                          argv: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  fn: "getAttr",
                                                                                  argv: [
                                                                                    {
                                                                                      ref: "bucketArn",
                                                                                    },
                                                                                    "resourceId[2]",
                                                                                  ],
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                      ],
                                                                      type: "tree",
                                                                      rules: [
                                                                        {
                                                                          conditions: [],
                                                                          type: "tree",
                                                                          rules: [
                                                                            {
                                                                              conditions: [
                                                                                {
                                                                                  fn: "isSet",
                                                                                  argv: [
                                                                                    {
                                                                                      ref: "UseArnRegion",
                                                                                    },
                                                                                  ],
                                                                                },
                                                                                {
                                                                                  fn: "booleanEquals",
                                                                                  argv: [
                                                                                    {
                                                                                      ref: "UseArnRegion",
                                                                                    },
                                                                                    false,
                                                                                  ],
                                                                                },
                                                                                {
                                                                                  fn: "not",
                                                                                  argv: [
                                                                                    {
                                                                                      fn: "stringEquals",
                                                                                      argv: [
                                                                                        {
                                                                                          fn: "getAttr",
                                                                                          argv: [
                                                                                            {
                                                                                              ref: "bucketArn",
                                                                                            },
                                                                                            "region",
                                                                                          ],
                                                                                        },
                                                                                        "{Region}",
                                                                                      ],
                                                                                    },
                                                                                  ],
                                                                                },
                                                                              ],
                                                                              error:
                                                                                "Invalid configuration: region from ARN `{bucketArn#region}` does not match client region `{Region}` and UseArnRegion is `false`",
                                                                              type: "error",
                                                                            },
                                                                            {
                                                                              conditions: [],
                                                                              type: "tree",
                                                                              rules: [
                                                                                {
                                                                                  conditions: [
                                                                                    {
                                                                                      fn: "aws.partition",
                                                                                      argv: [
                                                                                        {
                                                                                          fn: "getAttr",
                                                                                          argv: [
                                                                                            {
                                                                                              ref: "bucketArn",
                                                                                            },
                                                                                            "region",
                                                                                          ],
                                                                                        },
                                                                                      ],
                                                                                      assign: "bucketPartition",
                                                                                    },
                                                                                  ],
                                                                                  type: "tree",
                                                                                  rules: [
                                                                                    {
                                                                                      conditions: [],
                                                                                      type: "tree",
                                                                                      rules: [
                                                                                        {
                                                                                          conditions: [
                                                                                            {
                                                                                              fn: "aws.partition",
                                                                                              argv: [
                                                                                                {
                                                                                                  ref: "Region",
                                                                                                },
                                                                                              ],
                                                                                              assign: "partitionResult",
                                                                                            },
                                                                                          ],
                                                                                          type: "tree",
                                                                                          rules: [
                                                                                            {
                                                                                              conditions: [],
                                                                                              type: "tree",
                                                                                              rules: [
                                                                                                {
                                                                                                  conditions: [
                                                                                                    {
                                                                                                      fn: "stringEquals",
                                                                                                      argv: [
                                                                                                        {
                                                                                                          fn: "getAttr",
                                                                                                          argv: [
                                                                                                            {
                                                                                                              ref: "bucketPartition",
                                                                                                            },
                                                                                                            "name",
                                                                                                          ],
                                                                                                        },
                                                                                                        "{partitionResult#name}",
                                                                                                      ],
                                                                                                    },
                                                                                                  ],
                                                                                                  type: "tree",
                                                                                                  rules: [
                                                                                                    {
                                                                                                      conditions: [],
                                                                                                      type: "tree",
                                                                                                      rules: [
                                                                                                        {
                                                                                                          conditions: [
                                                                                                            {
                                                                                                              fn: "isValidHostLabel",
                                                                                                              argv: [
                                                                                                                {
                                                                                                                  fn: "getAttr",
                                                                                                                  argv: [
                                                                                                                    {
                                                                                                                      ref: "bucketArn",
                                                                                                                    },
                                                                                                                    "region",
                                                                                                                  ],
                                                                                                                },
                                                                                                                true,
                                                                                                              ],
                                                                                                            },
                                                                                                          ],
                                                                                                          type: "tree",
                                                                                                          rules: [
                                                                                                            {
                                                                                                              conditions:
                                                                                                                [],
                                                                                                              type: "tree",
                                                                                                              rules: [
                                                                                                                {
                                                                                                                  conditions:
                                                                                                                    [
                                                                                                                      {
                                                                                                                        fn: "stringEquals",
                                                                                                                        argv: [
                                                                                                                          {
                                                                                                                            fn: "getAttr",
                                                                                                                            argv: [
                                                                                                                              {
                                                                                                                                ref: "bucketArn",
                                                                                                                              },
                                                                                                                              "service",
                                                                                                                            ],
                                                                                                                          },
                                                                                                                          "s3",
                                                                                                                        ],
                                                                                                                      },
                                                                                                                    ],
                                                                                                                  type: "tree",
                                                                                                                  rules:
                                                                                                                    [
                                                                                                                      {
                                                                                                                        conditions:
                                                                                                                          [],
                                                                                                                        type: "tree",
                                                                                                                        rules:
                                                                                                                          [
                                                                                                                            {
                                                                                                                              conditions:
                                                                                                                                [
                                                                                                                                  {
                                                                                                                                    fn: "isValidHostLabel",
                                                                                                                                    argv: [
                                                                                                                                      {
                                                                                                                                        fn: "getAttr",
                                                                                                                                        argv: [
                                                                                                                                          {
                                                                                                                                            ref: "bucketArn",
                                                                                                                                          },
                                                                                                                                          "accountId",
                                                                                                                                        ],
                                                                                                                                      },
                                                                                                                                      false,
                                                                                                                                    ],
                                                                                                                                  },
                                                                                                                                ],
                                                                                                                              type: "tree",
                                                                                                                              rules:
                                                                                                                                [
                                                                                                                                  {
                                                                                                                                    conditions:
                                                                                                                                      [],
                                                                                                                                    type: "tree",
                                                                                                                                    rules:
                                                                                                                                      [
                                                                                                                                        {
                                                                                                                                          conditions:
                                                                                                                                            [
                                                                                                                                              {
                                                                                                                                                fn: "isValidHostLabel",
                                                                                                                                                argv: [
                                                                                                                                                  {
                                                                                                                                                    ref: "accessPointName",
                                                                                                                                                  },
                                                                                                                                                  false,
                                                                                                                                                ],
                                                                                                                                              },
                                                                                                                                            ],
                                                                                                                                          type: "tree",
                                                                                                                                          rules:
                                                                                                                                            [
                                                                                                                                              {
                                                                                                                                                conditions:
                                                                                                                                                  [],
                                                                                                                                                type: "tree",
                                                                                                                                                rules:
                                                                                                                                                  [
                                                                                                                                                    {
                                                                                                                                                      conditions:
                                                                                                                                                        [
                                                                                                                                                          {
                                                                                                                                                            fn: "booleanEquals",
                                                                                                                                                            argv: [
                                                                                                                                                              {
                                                                                                                                                                ref: "Accelerate",
                                                                                                                                                              },
                                                                                                                                                              true,
                                                                                                                                                            ],
                                                                                                                                                          },
                                                                                                                                                        ],
                                                                                                                                                      error:
                                                                                                                                                        "Access Points do not support S3 Accelerate",
                                                                                                                                                      type: "error",
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                      conditions:
                                                                                                                                                        [],
                                                                                                                                                      type: "tree",
                                                                                                                                                      rules:
                                                                                                                                                        [
                                                                                                                                                          {
                                                                                                                                                            conditions:
                                                                                                                                                              [
                                                                                                                                                                {
                                                                                                                                                                  fn: "booleanEquals",
                                                                                                                                                                  argv: [
                                                                                                                                                                    {
                                                                                                                                                                      ref: "UseFIPS",
                                                                                                                                                                    },
                                                                                                                                                                    true,
                                                                                                                                                                  ],
                                                                                                                                                                },
                                                                                                                                                                {
                                                                                                                                                                  fn: "stringEquals",
                                                                                                                                                                  argv: [
                                                                                                                                                                    {
                                                                                                                                                                      fn: "getAttr",
                                                                                                                                                                      argv: [
                                                                                                                                                                        {
                                                                                                                                                                          ref: "bucketPartition",
                                                                                                                                                                        },
                                                                                                                                                                        "name",
                                                                                                                                                                      ],
                                                                                                                                                                    },
                                                                                                                                                                    "aws-cn",
                                                                                                                                                                  ],
                                                                                                                                                                },
                                                                                                                                                              ],
                                                                                                                                                            error:
                                                                                                                                                              "Partition does not support FIPS",
                                                                                                                                                            type: "error",
                                                                                                                                                          },
                                                                                                                                                          {
                                                                                                                                                            conditions:
                                                                                                                                                              [],
                                                                                                                                                            type: "tree",
                                                                                                                                                            rules:
                                                                                                                                                              [
                                                                                                                                                                {
                                                                                                                                                                  conditions:
                                                                                                                                                                    [
                                                                                                                                                                      {
                                                                                                                                                                        fn: "booleanEquals",
                                                                                                                                                                        argv: [
                                                                                                                                                                          {
                                                                                                                                                                            ref: "UseDualStack",
                                                                                                                                                                          },
                                                                                                                                                                          true,
                                                                                                                                                                        ],
                                                                                                                                                                      },
                                                                                                                                                                      {
                                                                                                                                                                        fn: "isSet",
                                                                                                                                                                        argv: [
                                                                                                                                                                          {
                                                                                                                                                                            ref: "Endpoint",
                                                                                                                                                                          },
                                                                                                                                                                        ],
                                                                                                                                                                      },
                                                                                                                                                                    ],
                                                                                                                                                                  error:
                                                                                                                                                                    "DualStack cannot be combined with a Host override (PrivateLink)",
                                                                                                                                                                  type: "error",
                                                                                                                                                                },
                                                                                                                                                                {
                                                                                                                                                                  conditions:
                                                                                                                                                                    [],
                                                                                                                                                                  type: "tree",
                                                                                                                                                                  rules:
                                                                                                                                                                    [
                                                                                                                                                                      {
                                                                                                                                                                        conditions:
                                                                                                                                                                          [
                                                                                                                                                                            {
                                                                                                                                                                              fn: "booleanEquals",
                                                                                                                                                                              argv: [
                                                                                                                                                                                {
                                                                                                                                                                                  ref: "UseFIPS",
                                                                                                                                                                                },
                                                                                                                                                                                true,
                                                                                                                                                                              ],
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                              fn: "booleanEquals",
                                                                                                                                                                              argv: [
                                                                                                                                                                                {
                                                                                                                                                                                  ref: "UseDualStack",
                                                                                                                                                                                },
                                                                                                                                                                                true,
                                                                                                                                                                              ],
                                                                                                                                                                            },
                                                                                                                                                                          ],
                                                                                                                                                                        endpoint:
                                                                                                                                                                          {
                                                                                                                                                                            url: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint-fips.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}",
                                                                                                                                                                            properties:
                                                                                                                                                                              {
                                                                                                                                                                                authSchemes:
                                                                                                                                                                                  [
                                                                                                                                                                                    {
                                                                                                                                                                                      name: "sigv4",
                                                                                                                                                                                      signingRegion:
                                                                                                                                                                                        "{bucketArn#region}",
                                                                                                                                                                                      disableDoubleEncoding:
                                                                                                                                                                                        true,
                                                                                                                                                                                      signingName:
                                                                                                                                                                                        "s3",
                                                                                                                                                                                    },
                                                                                                                                                                                  ],
                                                                                                                                                                              },
                                                                                                                                                                            headers:
                                                                                                                                                                              {},
                                                                                                                                                                          },
                                                                                                                                                                        type: "endpoint",
                                                                                                                                                                      },
                                                                                                                                                                      {
                                                                                                                                                                        conditions:
                                                                                                                                                                          [
                                                                                                                                                                            {
                                                                                                                                                                              fn: "booleanEquals",
                                                                                                                                                                              argv: [
                                                                                                                                                                                {
                                                                                                                                                                                  ref: "UseFIPS",
                                                                                                                                                                                },
                                                                                                                                                                                true,
                                                                                                                                                                              ],
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                              fn: "booleanEquals",
                                                                                                                                                                              argv: [
                                                                                                                                                                                {
                                                                                                                                                                                  ref: "UseDualStack",
                                                                                                                                                                                },
                                                                                                                                                                                false,
                                                                                                                                                                              ],
                                                                                                                                                                            },
                                                                                                                                                                          ],
                                                                                                                                                                        endpoint:
                                                                                                                                                                          {
                                                                                                                                                                            url: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}",
                                                                                                                                                                            properties:
                                                                                                                                                                              {
                                                                                                                                                                                authSchemes:
                                                                                                                                                                                  [
                                                                                                                                                                                    {
                                                                                                                                                                                      name: "sigv4",
                                                                                                                                                                                      signingRegion:
                                                                                                                                                                                        "{bucketArn#region}",
                                                                                                                                                                                      disableDoubleEncoding:
                                                                                                                                                                                        true,
                                                                                                                                                                                      signingName:
                                                                                                                                                                                        "s3",
                                                                                                                                                                                    },
                                                                                                                                                                                  ],
                                                                                                                                                                              },
                                                                                                                                                                            headers:
                                                                                                                                                                              {},
                                                                                                                                                                          },
                                                                                                                                                                        type: "endpoint",
                                                                                                                                                                      },
                                                                                                                                                                      {
                                                                                                                                                                        conditions:
                                                                                                                                                                          [
                                                                                                                                                                            {
                                                                                                                                                                              fn: "booleanEquals",
                                                                                                                                                                              argv: [
                                                                                                                                                                                {
                                                                                                                                                                                  ref: "UseFIPS",
                                                                                                                                                                                },
                                                                                                                                                                                false,
                                                                                                                                                                              ],
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                              fn: "booleanEquals",
                                                                                                                                                                              argv: [
                                                                                                                                                                                {
                                                                                                                                                                                  ref: "UseDualStack",
                                                                                                                                                                                },
                                                                                                                                                                                true,
                                                                                                                                                                              ],
                                                                                                                                                                            },
                                                                                                                                                                          ],
                                                                                                                                                                        endpoint:
                                                                                                                                                                          {
                                                                                                                                                                            url: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}",
                                                                                                                                                                            properties:
                                                                                                                                                                              {
                                                                                                                                                                                authSchemes:
                                                                                                                                                                                  [
                                                                                                                                                                                    {
                                                                                                                                                                                      name: "sigv4",
                                                                                                                                                                                      signingRegion:
                                                                                                                                                                                        "{bucketArn#region}",
                                                                                                                                                                                      disableDoubleEncoding:
                                                                                                                                                                                        true,
                                                                                                                                                                                      signingName:
                                                                                                                                                                                        "s3",
                                                                                                                                                                                    },
                                                                                                                                                                                  ],
                                                                                                                                                                              },
                                                                                                                                                                            headers:
                                                                                                                                                                              {},
                                                                                                                                                                          },
                                                                                                                                                                        type: "endpoint",
                                                                                                                                                                      },
                                                                                                                                                                      {
                                                                                                                                                                        conditions:
                                                                                                                                                                          [
                                                                                                                                                                            {
                                                                                                                                                                              fn: "booleanEquals",
                                                                                                                                                                              argv: [
                                                                                                                                                                                {
                                                                                                                                                                                  ref: "UseFIPS",
                                                                                                                                                                                },
                                                                                                                                                                                false,
                                                                                                                                                                              ],
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                              fn: "booleanEquals",
                                                                                                                                                                              argv: [
                                                                                                                                                                                {
                                                                                                                                                                                  ref: "UseDualStack",
                                                                                                                                                                                },
                                                                                                                                                                                false,
                                                                                                                                                                              ],
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                              fn: "isSet",
                                                                                                                                                                              argv: [
                                                                                                                                                                                {
                                                                                                                                                                                  ref: "Endpoint",
                                                                                                                                                                                },
                                                                                                                                                                              ],
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                              fn: "parseURL",
                                                                                                                                                                              argv: [
                                                                                                                                                                                {
                                                                                                                                                                                  ref: "Endpoint",
                                                                                                                                                                                },
                                                                                                                                                                              ],
                                                                                                                                                                              assign:
                                                                                                                                                                                "url",
                                                                                                                                                                            },
                                                                                                                                                                          ],
                                                                                                                                                                        endpoint:
                                                                                                                                                                          {
                                                                                                                                                                            url: "{url#scheme}://{accessPointName}-{bucketArn#accountId}.{url#authority}{url#path}",
                                                                                                                                                                            properties:
                                                                                                                                                                              {
                                                                                                                                                                                authSchemes:
                                                                                                                                                                                  [
                                                                                                                                                                                    {
                                                                                                                                                                                      name: "sigv4",
                                                                                                                                                                                      signingRegion:
                                                                                                                                                                                        "{bucketArn#region}",
                                                                                                                                                                                      disableDoubleEncoding:
                                                                                                                                                                                        true,
                                                                                                                                                                                      signingName:
                                                                                                                                                                                        "s3",
                                                                                                                                                                                    },
                                                                                                                                                                                  ],
                                                                                                                                                                              },
                                                                                                                                                                            headers:
                                                                                                                                                                              {},
                                                                                                                                                                          },
                                                                                                                                                                        type: "endpoint",
                                                                                                                                                                      },
                                                                                                                                                                      {
                                                                                                                                                                        conditions:
                                                                                                                                                                          [
                                                                                                                                                                            {
                                                                                                                                                                              fn: "booleanEquals",
                                                                                                                                                                              argv: [
                                                                                                                                                                                {
                                                                                                                                                                                  ref: "UseFIPS",
                                                                                                                                                                                },
                                                                                                                                                                                false,
                                                                                                                                                                              ],
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                              fn: "booleanEquals",
                                                                                                                                                                              argv: [
                                                                                                                                                                                {
                                                                                                                                                                                  ref: "UseDualStack",
                                                                                                                                                                                },
                                                                                                                                                                                false,
                                                                                                                                                                              ],
                                                                                                                                                                            },
                                                                                                                                                                          ],
                                                                                                                                                                        endpoint:
                                                                                                                                                                          {
                                                                                                                                                                            url: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint.{bucketArn#region}.{bucketPartition#dnsSuffix}",
                                                                                                                                                                            properties:
                                                                                                                                                                              {
                                                                                                                                                                                authSchemes:
                                                                                                                                                                                  [
                                                                                                                                                                                    {
                                                                                                                                                                                      name: "sigv4",
                                                                                                                                                                                      signingRegion:
                                                                                                                                                                                        "{bucketArn#region}",
                                                                                                                                                                                      disableDoubleEncoding:
                                                                                                                                                                                        true,
                                                                                                                                                                                      signingName:
                                                                                                                                                                                        "s3",
                                                                                                                                                                                    },
                                                                                                                                                                                  ],
                                                                                                                                                                              },
                                                                                                                                                                            headers:
                                                                                                                                                                              {},
                                                                                                                                                                          },
                                                                                                                                                                        type: "endpoint",
                                                                                                                                                                      },
                                                                                                                                                                    ],
                                                                                                                                                                },
                                                                                                                                                              ],
                                                                                                                                                          },
                                                                                                                                                        ],
                                                                                                                                                    },
                                                                                                                                                  ],
                                                                                                                                              },
                                                                                                                                            ],
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                          conditions:
                                                                                                                                            [],
                                                                                                                                          error:
                                                                                                                                            "Invalid ARN: The access point name may only contain a-z, A-Z, 0-9 and `-`. Found: `{accessPointName}`",
                                                                                                                                          type: "error",
                                                                                                                                        },
                                                                                                                                      ],
                                                                                                                                  },
                                                                                                                                ],
                                                                                                                            },
                                                                                                                            {
                                                                                                                              conditions:
                                                                                                                                [],
                                                                                                                              error:
                                                                                                                                "Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and `-`. Found: `{bucketArn#accountId}`",
                                                                                                                              type: "error",
                                                                                                                            },
                                                                                                                          ],
                                                                                                                      },
                                                                                                                    ],
                                                                                                                },
                                                                                                                {
                                                                                                                  conditions:
                                                                                                                    [],
                                                                                                                  error:
                                                                                                                    "Invalid ARN: The ARN was not for the S3 service, found: {bucketArn#service}",
                                                                                                                  type: "error",
                                                                                                                },
                                                                                                              ],
                                                                                                            },
                                                                                                          ],
                                                                                                        },
                                                                                                        {
                                                                                                          conditions:
                                                                                                            [],
                                                                                                          error:
                                                                                                            "Invalid region in ARN: `{bucketArn#region}` (invalid DNS name)",
                                                                                                          type: "error",
                                                                                                        },
                                                                                                      ],
                                                                                                    },
                                                                                                  ],
                                                                                                },
                                                                                                {
                                                                                                  conditions: [],
                                                                                                  error:
                                                                                                    "Client was configured for partition `{partitionResult#name}` but ARN (`{Bucket}`) has `{bucketPartition#name}`",
                                                                                                  type: "error",
                                                                                                },
                                                                                              ],
                                                                                            },
                                                                                          ],
                                                                                        },
                                                                                        {
                                                                                          conditions: [],
                                                                                          error:
                                                                                            "A valid partition could not be determined",
                                                                                          type: "error",
                                                                                        },
                                                                                      ],
                                                                                    },
                                                                                  ],
                                                                                },
                                                                                {
                                                                                  conditions: [],
                                                                                  error:
                                                                                    "Could not load partition for ARN region `{bucketArn#region}`",
                                                                                  type: "error",
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                    {
                                                                      conditions: [],
                                                                      error:
                                                                        "Invalid ARN: The ARN may only contain a single resource component after `accesspoint`.",
                                                                      type: "error",
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                          ],
                                                        },
                                                        {
                                                          conditions: [],
                                                          error: "Invalid ARN: bucket ARN is missing a region",
                                                          type: "error",
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                                {
                                                  conditions: [],
                                                  type: "tree",
                                                  rules: [
                                                    {
                                                      conditions: [
                                                        {
                                                          fn: "isValidHostLabel",
                                                          argv: [
                                                            {
                                                              ref: "accessPointName",
                                                            },
                                                            true,
                                                          ],
                                                        },
                                                      ],
                                                      type: "tree",
                                                      rules: [
                                                        {
                                                          conditions: [],
                                                          type: "tree",
                                                          rules: [
                                                            {
                                                              conditions: [
                                                                {
                                                                  fn: "booleanEquals",
                                                                  argv: [
                                                                    {
                                                                      ref: "UseDualStack",
                                                                    },
                                                                    true,
                                                                  ],
                                                                },
                                                              ],
                                                              error: "S3 MRAP does not support dual-stack",
                                                              type: "error",
                                                            },
                                                            {
                                                              conditions: [],
                                                              type: "tree",
                                                              rules: [
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "booleanEquals",
                                                                      argv: [
                                                                        {
                                                                          ref: "UseFIPS",
                                                                        },
                                                                        true,
                                                                      ],
                                                                    },
                                                                  ],
                                                                  error: "S3 MRAP does not support FIPS",
                                                                  type: "error",
                                                                },
                                                                {
                                                                  conditions: [],
                                                                  type: "tree",
                                                                  rules: [
                                                                    {
                                                                      conditions: [
                                                                        {
                                                                          fn: "booleanEquals",
                                                                          argv: [
                                                                            {
                                                                              ref: "Accelerate",
                                                                            },
                                                                            true,
                                                                          ],
                                                                        },
                                                                      ],
                                                                      error: "S3 MRAP does not support S3 Accelerate",
                                                                      type: "error",
                                                                    },
                                                                    {
                                                                      conditions: [],
                                                                      type: "tree",
                                                                      rules: [
                                                                        {
                                                                          conditions: [
                                                                            {
                                                                              fn: "booleanEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "DisableMultiRegionAccessPoints",
                                                                                },
                                                                                true,
                                                                              ],
                                                                            },
                                                                          ],
                                                                          error:
                                                                            "Invalid configuration: Multi-Region Access Point ARNs are disabled.",
                                                                          type: "error",
                                                                        },
                                                                        {
                                                                          conditions: [],
                                                                          type: "tree",
                                                                          rules: [
                                                                            {
                                                                              conditions: [
                                                                                {
                                                                                  fn: "aws.partition",
                                                                                  argv: [
                                                                                    {
                                                                                      ref: "Region",
                                                                                    },
                                                                                  ],
                                                                                  assign: "mrapPartition",
                                                                                },
                                                                              ],
                                                                              type: "tree",
                                                                              rules: [
                                                                                {
                                                                                  conditions: [],
                                                                                  type: "tree",
                                                                                  rules: [
                                                                                    {
                                                                                      conditions: [
                                                                                        {
                                                                                          fn: "stringEquals",
                                                                                          argv: [
                                                                                            {
                                                                                              fn: "getAttr",
                                                                                              argv: [
                                                                                                {
                                                                                                  ref: "mrapPartition",
                                                                                                },
                                                                                                "name",
                                                                                              ],
                                                                                            },
                                                                                            {
                                                                                              fn: "getAttr",
                                                                                              argv: [
                                                                                                {
                                                                                                  ref: "bucketArn",
                                                                                                },
                                                                                                "partition",
                                                                                              ],
                                                                                            },
                                                                                          ],
                                                                                        },
                                                                                      ],
                                                                                      type: "tree",
                                                                                      rules: [
                                                                                        {
                                                                                          conditions: [],
                                                                                          endpoint: {
                                                                                            url: "https://{accessPointName}.accesspoint.s3-global.{mrapPartition#dnsSuffix}",
                                                                                            properties: {
                                                                                              authSchemes: [
                                                                                                {
                                                                                                  name: "sigv4a",
                                                                                                  signingRegionSet: [
                                                                                                    "*",
                                                                                                  ],
                                                                                                  disableDoubleEncoding:
                                                                                                    true,
                                                                                                  signingName: "s3",
                                                                                                },
                                                                                              ],
                                                                                            },
                                                                                            headers: {},
                                                                                          },
                                                                                          type: "endpoint",
                                                                                        },
                                                                                      ],
                                                                                    },
                                                                                    {
                                                                                      conditions: [],
                                                                                      error:
                                                                                        "Client was configured for partition `{mrapPartition#name}` but bucket referred to partition `{bucketArn#partition}`",
                                                                                      type: "error",
                                                                                    },
                                                                                  ],
                                                                                },
                                                                              ],
                                                                            },
                                                                            {
                                                                              conditions: [],
                                                                              error: "{Region} was not a valid region",
                                                                              type: "error",
                                                                            },
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                    {
                                                      conditions: [],
                                                      error: "Invalid Access Point Name",
                                                      type: "error",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                        {
                                          conditions: [],
                                          error:
                                            "Invalid ARN: Expected a resource of the format `accesspoint:<accesspoint name>` but no name was provided",
                                          type: "error",
                                        },
                                      ],
                                    },
                                    {
                                      conditions: [
                                        {
                                          fn: "stringEquals",
                                          argv: [
                                            {
                                              fn: "getAttr",
                                              argv: [
                                                {
                                                  ref: "bucketArn",
                                                },
                                                "service",
                                              ],
                                            },
                                            "s3-outposts",
                                          ],
                                        },
                                      ],
                                      type: "tree",
                                      rules: [
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                          ],
                                          error: "S3 Outposts does not support Dual-stack",
                                          type: "error",
                                        },
                                        {
                                          conditions: [],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [
                                                {
                                                  fn: "booleanEquals",
                                                  argv: [
                                                    {
                                                      ref: "UseFIPS",
                                                    },
                                                    true,
                                                  ],
                                                },
                                              ],
                                              error: "S3 Outposts does not support FIPS",
                                              type: "error",
                                            },
                                            {
                                              conditions: [],
                                              type: "tree",
                                              rules: [
                                                {
                                                  conditions: [
                                                    {
                                                      fn: "booleanEquals",
                                                      argv: [
                                                        {
                                                          ref: "Accelerate",
                                                        },
                                                        true,
                                                      ],
                                                    },
                                                  ],
                                                  error: "S3 Outposts does not support S3 Accelerate",
                                                  type: "error",
                                                },
                                                {
                                                  conditions: [],
                                                  type: "tree",
                                                  rules: [
                                                    {
                                                      conditions: [
                                                        {
                                                          fn: "isSet",
                                                          argv: [
                                                            {
                                                              fn: "getAttr",
                                                              argv: [
                                                                {
                                                                  ref: "bucketArn",
                                                                },
                                                                "resourceId[4]",
                                                              ],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                      error:
                                                        "Invalid Arn: Outpost Access Point ARN contains sub resources",
                                                      type: "error",
                                                    },
                                                    {
                                                      conditions: [],
                                                      type: "tree",
                                                      rules: [
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "getAttr",
                                                              argv: [
                                                                {
                                                                  ref: "bucketArn",
                                                                },
                                                                "resourceId[1]",
                                                              ],
                                                              assign: "outpostId",
                                                            },
                                                          ],
                                                          type: "tree",
                                                          rules: [
                                                            {
                                                              conditions: [],
                                                              type: "tree",
                                                              rules: [
                                                                {
                                                                  conditions: [
                                                                    {
                                                                      fn: "isValidHostLabel",
                                                                      argv: [
                                                                        {
                                                                          ref: "outpostId",
                                                                        },
                                                                        false,
                                                                      ],
                                                                    },
                                                                  ],
                                                                  type: "tree",
                                                                  rules: [
                                                                    {
                                                                      conditions: [],
                                                                      type: "tree",
                                                                      rules: [
                                                                        {
                                                                          conditions: [
                                                                            {
                                                                              fn: "isSet",
                                                                              argv: [
                                                                                {
                                                                                  ref: "UseArnRegion",
                                                                                },
                                                                              ],
                                                                            },
                                                                            {
                                                                              fn: "booleanEquals",
                                                                              argv: [
                                                                                {
                                                                                  ref: "UseArnRegion",
                                                                                },
                                                                                false,
                                                                              ],
                                                                            },
                                                                            {
                                                                              fn: "not",
                                                                              argv: [
                                                                                {
                                                                                  fn: "stringEquals",
                                                                                  argv: [
                                                                                    {
                                                                                      fn: "getAttr",
                                                                                      argv: [
                                                                                        {
                                                                                          ref: "bucketArn",
                                                                                        },
                                                                                        "region",
                                                                                      ],
                                                                                    },
                                                                                    "{Region}",
                                                                                  ],
                                                                                },
                                                                              ],
                                                                            },
                                                                          ],
                                                                          error:
                                                                            "Invalid configuration: region from ARN `{bucketArn#region}` does not match client region `{Region}` and UseArnRegion is `false`",
                                                                          type: "error",
                                                                        },
                                                                        {
                                                                          conditions: [],
                                                                          type: "tree",
                                                                          rules: [
                                                                            {
                                                                              conditions: [
                                                                                {
                                                                                  fn: "aws.partition",
                                                                                  argv: [
                                                                                    {
                                                                                      fn: "getAttr",
                                                                                      argv: [
                                                                                        {
                                                                                          ref: "bucketArn",
                                                                                        },
                                                                                        "region",
                                                                                      ],
                                                                                    },
                                                                                  ],
                                                                                  assign: "bucketPartition",
                                                                                },
                                                                              ],
                                                                              type: "tree",
                                                                              rules: [
                                                                                {
                                                                                  conditions: [],
                                                                                  type: "tree",
                                                                                  rules: [
                                                                                    {
                                                                                      conditions: [
                                                                                        {
                                                                                          fn: "aws.partition",
                                                                                          argv: [
                                                                                            {
                                                                                              ref: "Region",
                                                                                            },
                                                                                          ],
                                                                                          assign: "partitionResult",
                                                                                        },
                                                                                      ],
                                                                                      type: "tree",
                                                                                      rules: [
                                                                                        {
                                                                                          conditions: [],
                                                                                          type: "tree",
                                                                                          rules: [
                                                                                            {
                                                                                              conditions: [
                                                                                                {
                                                                                                  fn: "stringEquals",
                                                                                                  argv: [
                                                                                                    {
                                                                                                      fn: "getAttr",
                                                                                                      argv: [
                                                                                                        {
                                                                                                          ref: "bucketPartition",
                                                                                                        },
                                                                                                        "name",
                                                                                                      ],
                                                                                                    },
                                                                                                    {
                                                                                                      fn: "getAttr",
                                                                                                      argv: [
                                                                                                        {
                                                                                                          ref: "partitionResult",
                                                                                                        },
                                                                                                        "name",
                                                                                                      ],
                                                                                                    },
                                                                                                  ],
                                                                                                },
                                                                                              ],
                                                                                              type: "tree",
                                                                                              rules: [
                                                                                                {
                                                                                                  conditions: [],
                                                                                                  type: "tree",
                                                                                                  rules: [
                                                                                                    {
                                                                                                      conditions: [
                                                                                                        {
                                                                                                          fn: "isValidHostLabel",
                                                                                                          argv: [
                                                                                                            {
                                                                                                              fn: "getAttr",
                                                                                                              argv: [
                                                                                                                {
                                                                                                                  ref: "bucketArn",
                                                                                                                },
                                                                                                                "region",
                                                                                                              ],
                                                                                                            },
                                                                                                            true,
                                                                                                          ],
                                                                                                        },
                                                                                                      ],
                                                                                                      type: "tree",
                                                                                                      rules: [
                                                                                                        {
                                                                                                          conditions:
                                                                                                            [],
                                                                                                          type: "tree",
                                                                                                          rules: [
                                                                                                            {
                                                                                                              conditions:
                                                                                                                [
                                                                                                                  {
                                                                                                                    fn: "isValidHostLabel",
                                                                                                                    argv: [
                                                                                                                      {
                                                                                                                        fn: "getAttr",
                                                                                                                        argv: [
                                                                                                                          {
                                                                                                                            ref: "bucketArn",
                                                                                                                          },
                                                                                                                          "accountId",
                                                                                                                        ],
                                                                                                                      },
                                                                                                                      false,
                                                                                                                    ],
                                                                                                                  },
                                                                                                                ],
                                                                                                              type: "tree",
                                                                                                              rules: [
                                                                                                                {
                                                                                                                  conditions:
                                                                                                                    [],
                                                                                                                  type: "tree",
                                                                                                                  rules:
                                                                                                                    [
                                                                                                                      {
                                                                                                                        conditions:
                                                                                                                          [
                                                                                                                            {
                                                                                                                              fn: "getAttr",
                                                                                                                              argv: [
                                                                                                                                {
                                                                                                                                  ref: "bucketArn",
                                                                                                                                },
                                                                                                                                "resourceId[2]",
                                                                                                                              ],
                                                                                                                              assign:
                                                                                                                                "outpostType",
                                                                                                                            },
                                                                                                                          ],
                                                                                                                        type: "tree",
                                                                                                                        rules:
                                                                                                                          [
                                                                                                                            {
                                                                                                                              conditions:
                                                                                                                                [],
                                                                                                                              type: "tree",
                                                                                                                              rules:
                                                                                                                                [
                                                                                                                                  {
                                                                                                                                    conditions:
                                                                                                                                      [
                                                                                                                                        {
                                                                                                                                          fn: "getAttr",
                                                                                                                                          argv: [
                                                                                                                                            {
                                                                                                                                              ref: "bucketArn",
                                                                                                                                            },
                                                                                                                                            "resourceId[3]",
                                                                                                                                          ],
                                                                                                                                          assign:
                                                                                                                                            "accessPointName",
                                                                                                                                        },
                                                                                                                                      ],
                                                                                                                                    type: "tree",
                                                                                                                                    rules:
                                                                                                                                      [
                                                                                                                                        {
                                                                                                                                          conditions:
                                                                                                                                            [],
                                                                                                                                          type: "tree",
                                                                                                                                          rules:
                                                                                                                                            [
                                                                                                                                              {
                                                                                                                                                conditions:
                                                                                                                                                  [
                                                                                                                                                    {
                                                                                                                                                      fn: "stringEquals",
                                                                                                                                                      argv: [
                                                                                                                                                        {
                                                                                                                                                          ref: "outpostType",
                                                                                                                                                        },
                                                                                                                                                        "accesspoint",
                                                                                                                                                      ],
                                                                                                                                                    },
                                                                                                                                                  ],
                                                                                                                                                type: "tree",
                                                                                                                                                rules:
                                                                                                                                                  [
                                                                                                                                                    {
                                                                                                                                                      conditions:
                                                                                                                                                        [],
                                                                                                                                                      type: "tree",
                                                                                                                                                      rules:
                                                                                                                                                        [
                                                                                                                                                          {
                                                                                                                                                            conditions:
                                                                                                                                                              [
                                                                                                                                                                {
                                                                                                                                                                  fn: "isSet",
                                                                                                                                                                  argv: [
                                                                                                                                                                    {
                                                                                                                                                                      ref: "Endpoint",
                                                                                                                                                                    },
                                                                                                                                                                  ],
                                                                                                                                                                },
                                                                                                                                                                {
                                                                                                                                                                  fn: "parseURL",
                                                                                                                                                                  argv: [
                                                                                                                                                                    {
                                                                                                                                                                      ref: "Endpoint",
                                                                                                                                                                    },
                                                                                                                                                                  ],
                                                                                                                                                                  assign:
                                                                                                                                                                    "url",
                                                                                                                                                                },
                                                                                                                                                              ],
                                                                                                                                                            endpoint:
                                                                                                                                                              {
                                                                                                                                                                url: "https://{accessPointName}-{bucketArn#accountId}.{outpostId}.{url#authority}",
                                                                                                                                                                properties:
                                                                                                                                                                  {
                                                                                                                                                                    authSchemes:
                                                                                                                                                                      [
                                                                                                                                                                        {
                                                                                                                                                                          name: "sigv4",
                                                                                                                                                                          signingRegion:
                                                                                                                                                                            "{bucketArn#region}",
                                                                                                                                                                          disableDoubleEncoding:
                                                                                                                                                                            true,
                                                                                                                                                                          signingName:
                                                                                                                                                                            "s3-outposts",
                                                                                                                                                                        },
                                                                                                                                                                      ],
                                                                                                                                                                  },
                                                                                                                                                                headers:
                                                                                                                                                                  {},
                                                                                                                                                              },
                                                                                                                                                            type: "endpoint",
                                                                                                                                                          },
                                                                                                                                                          {
                                                                                                                                                            conditions:
                                                                                                                                                              [],
                                                                                                                                                            endpoint:
                                                                                                                                                              {
                                                                                                                                                                url: "https://{accessPointName}-{bucketArn#accountId}.{outpostId}.s3-outposts.{bucketArn#region}.{bucketPartition#dnsSuffix}",
                                                                                                                                                                properties:
                                                                                                                                                                  {
                                                                                                                                                                    authSchemes:
                                                                                                                                                                      [
                                                                                                                                                                        {
                                                                                                                                                                          name: "sigv4",
                                                                                                                                                                          signingRegion:
                                                                                                                                                                            "{bucketArn#region}",
                                                                                                                                                                          disableDoubleEncoding:
                                                                                                                                                                            true,
                                                                                                                                                                          signingName:
                                                                                                                                                                            "s3-outposts",
                                                                                                                                                                        },
                                                                                                                                                                      ],
                                                                                                                                                                  },
                                                                                                                                                                headers:
                                                                                                                                                                  {},
                                                                                                                                                              },
                                                                                                                                                            type: "endpoint",
                                                                                                                                                          },
                                                                                                                                                        ],
                                                                                                                                                    },
                                                                                                                                                  ],
                                                                                                                                              },
                                                                                                                                              {
                                                                                                                                                conditions:
                                                                                                                                                  [],
                                                                                                                                                error:
                                                                                                                                                  "Expected an outpost type `accesspoint`, found {outpostType}",
                                                                                                                                                type: "error",
                                                                                                                                              },
                                                                                                                                            ],
                                                                                                                                        },
                                                                                                                                      ],
                                                                                                                                  },
                                                                                                                                  {
                                                                                                                                    conditions:
                                                                                                                                      [],
                                                                                                                                    error:
                                                                                                                                      "Invalid ARN: expected an access point name",
                                                                                                                                    type: "error",
                                                                                                                                  },
                                                                                                                                ],
                                                                                                                            },
                                                                                                                          ],
                                                                                                                      },
                                                                                                                      {
                                                                                                                        conditions:
                                                                                                                          [],
                                                                                                                        error:
                                                                                                                          "Invalid ARN: Expected a 4-component resource",
                                                                                                                        type: "error",
                                                                                                                      },
                                                                                                                    ],
                                                                                                                },
                                                                                                              ],
                                                                                                            },
                                                                                                            {
                                                                                                              conditions:
                                                                                                                [],
                                                                                                              error:
                                                                                                                "Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and `-`. Found: `{bucketArn#accountId}`",
                                                                                                              type: "error",
                                                                                                            },
                                                                                                          ],
                                                                                                        },
                                                                                                      ],
                                                                                                    },
                                                                                                    {
                                                                                                      conditions: [],
                                                                                                      error:
                                                                                                        "Invalid region in ARN: `{bucketArn#region}` (invalid DNS name)",
                                                                                                      type: "error",
                                                                                                    },
                                                                                                  ],
                                                                                                },
                                                                                              ],
                                                                                            },
                                                                                            {
                                                                                              conditions: [],
                                                                                              error:
                                                                                                "Client was configured for partition `{partitionResult#name}` but ARN (`{Bucket}`) has `{bucketPartition#name}`",
                                                                                              type: "error",
                                                                                            },
                                                                                          ],
                                                                                        },
                                                                                      ],
                                                                                    },
                                                                                    {
                                                                                      conditions: [],
                                                                                      error:
                                                                                        "A valid partition could not be determined",
                                                                                      type: "error",
                                                                                    },
                                                                                  ],
                                                                                },
                                                                              ],
                                                                            },
                                                                            {
                                                                              conditions: [],
                                                                              error:
                                                                                "Could not load partition for ARN region {bucketArn#region}",
                                                                              type: "error",
                                                                            },
                                                                          ],
                                                                        },
                                                                      ],
                                                                    },
                                                                  ],
                                                                },
                                                                {
                                                                  conditions: [],
                                                                  error:
                                                                    "Invalid ARN: The outpost Id may only contain a-z, A-Z, 0-9 and `-`. Found: `{outpostId}`",
                                                                  type: "error",
                                                                },
                                                              ],
                                                            },
                                                          ],
                                                        },
                                                        {
                                                          conditions: [],
                                                          error: "Invalid ARN: The Outpost Id was not set",
                                                          type: "error",
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      conditions: [],
                                      error: "Invalid ARN: Unrecognized format: {Bucket} (type: {arnType})",
                                      type: "error",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              conditions: [],
                              error: "Invalid ARN: No ARN type specified",
                              type: "error",
                            },
                          ],
                        },
                        {
                          conditions: [
                            {
                              fn: "substring",
                              argv: [
                                {
                                  ref: "Bucket",
                                },
                                0,
                                4,
                                false,
                              ],
                              assign: "arnPrefix",
                            },
                            {
                              fn: "stringEquals",
                              argv: [
                                {
                                  ref: "arnPrefix",
                                },
                                "arn:",
                              ],
                            },
                            {
                              fn: "not",
                              argv: [
                                {
                                  fn: "isSet",
                                  argv: [
                                    {
                                      fn: "aws.parseArn",
                                      argv: [
                                        {
                                          ref: "Bucket",
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          error: "Invalid ARN: `{Bucket}` was not a valid ARN",
                          type: "error",
                        },
                        {
                          conditions: [
                            {
                              fn: "uriEncode",
                              argv: [
                                {
                                  ref: "Bucket",
                                },
                              ],
                              assign: "uri_encoded_bucket",
                            },
                          ],
                          type: "tree",
                          rules: [
                            {
                              conditions: [
                                {
                                  fn: "booleanEquals",
                                  argv: [
                                    {
                                      ref: "UseDualStack",
                                    },
                                    true,
                                  ],
                                },
                                {
                                  fn: "isSet",
                                  argv: [
                                    {
                                      ref: "Endpoint",
                                    },
                                  ],
                                },
                              ],
                              error: "Cannot set dual-stack in combination with a custom endpoint.",
                              type: "error",
                            },
                            {
                              conditions: [],
                              type: "tree",
                              rules: [
                                {
                                  conditions: [
                                    {
                                      fn: "aws.partition",
                                      argv: [
                                        {
                                          ref: "Region",
                                        },
                                      ],
                                      assign: "partitionResult",
                                    },
                                  ],
                                  type: "tree",
                                  rules: [
                                    {
                                      conditions: [],
                                      type: "tree",
                                      rules: [
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "Accelerate",
                                                },
                                                false,
                                              ],
                                            },
                                          ],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [],
                                              type: "tree",
                                              rules: [
                                                {
                                                  conditions: [
                                                    {
                                                      fn: "booleanEquals",
                                                      argv: [
                                                        {
                                                          ref: "UseFIPS",
                                                        },
                                                        false,
                                                      ],
                                                    },
                                                  ],
                                                  type: "tree",
                                                  rules: [
                                                    {
                                                      conditions: [],
                                                      type: "tree",
                                                      rules: [
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                true,
                                                              ],
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "isSet",
                                                                  argv: [
                                                                    {
                                                                      ref: "Endpoint",
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "stringEquals",
                                                              argv: [
                                                                {
                                                                  ref: "Region",
                                                                },
                                                                "aws-global",
                                                              ],
                                                            },
                                                          ],
                                                          endpoint: {
                                                            url: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                            properties: {
                                                              authSchemes: [
                                                                {
                                                                  name: "sigv4",
                                                                  signingRegion: "us-east-1",
                                                                  disableDoubleEncoding: true,
                                                                  signingName: "s3",
                                                                },
                                                              ],
                                                            },
                                                            headers: {},
                                                          },
                                                          type: "endpoint",
                                                        },
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                true,
                                                              ],
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "isSet",
                                                                  argv: [
                                                                    {
                                                                      ref: "Endpoint",
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "stringEquals",
                                                              argv: [
                                                                {
                                                                  ref: "Region",
                                                                },
                                                                "aws-global",
                                                              ],
                                                            },
                                                          ],
                                                          endpoint: {
                                                            url: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                            properties: {
                                                              authSchemes: [
                                                                {
                                                                  name: "sigv4",
                                                                  signingRegion: "us-east-1",
                                                                  disableDoubleEncoding: true,
                                                                  signingName: "s3",
                                                                },
                                                              ],
                                                            },
                                                            headers: {},
                                                          },
                                                          type: "endpoint",
                                                        },
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                true,
                                                              ],
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "isSet",
                                                                  argv: [
                                                                    {
                                                                      ref: "Endpoint",
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "stringEquals",
                                                                  argv: [
                                                                    {
                                                                      ref: "Region",
                                                                    },
                                                                    "aws-global",
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseGlobalEndpoint",
                                                                },
                                                                true,
                                                              ],
                                                            },
                                                          ],
                                                          type: "tree",
                                                          rules: [
                                                            {
                                                              conditions: [],
                                                              endpoint: {
                                                                url: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                                properties: {
                                                                  authSchemes: [
                                                                    {
                                                                      name: "sigv4",
                                                                      signingRegion: "{Region}",
                                                                      disableDoubleEncoding: true,
                                                                      signingName: "s3",
                                                                    },
                                                                  ],
                                                                },
                                                                headers: {},
                                                              },
                                                              type: "endpoint",
                                                            },
                                                          ],
                                                        },
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                true,
                                                              ],
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "isSet",
                                                                  argv: [
                                                                    {
                                                                      ref: "Endpoint",
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "stringEquals",
                                                                  argv: [
                                                                    {
                                                                      ref: "Region",
                                                                    },
                                                                    "aws-global",
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseGlobalEndpoint",
                                                                },
                                                                false,
                                                              ],
                                                            },
                                                          ],
                                                          endpoint: {
                                                            url: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                            properties: {
                                                              authSchemes: [
                                                                {
                                                                  name: "sigv4",
                                                                  signingRegion: "{Region}",
                                                                  disableDoubleEncoding: true,
                                                                  signingName: "s3",
                                                                },
                                                              ],
                                                            },
                                                            headers: {},
                                                          },
                                                          type: "endpoint",
                                                        },
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                false,
                                                              ],
                                                            },
                                                            {
                                                              fn: "isSet",
                                                              argv: [
                                                                {
                                                                  ref: "Endpoint",
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "parseURL",
                                                              argv: [
                                                                {
                                                                  ref: "Endpoint",
                                                                },
                                                              ],
                                                              assign: "url",
                                                            },
                                                            {
                                                              fn: "stringEquals",
                                                              argv: [
                                                                {
                                                                  ref: "Region",
                                                                },
                                                                "aws-global",
                                                              ],
                                                            },
                                                          ],
                                                          endpoint: {
                                                            url: "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}",
                                                            properties: {
                                                              authSchemes: [
                                                                {
                                                                  name: "sigv4",
                                                                  signingRegion: "us-east-1",
                                                                  disableDoubleEncoding: true,
                                                                  signingName: "s3",
                                                                },
                                                              ],
                                                            },
                                                            headers: {},
                                                          },
                                                          type: "endpoint",
                                                        },
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                false,
                                                              ],
                                                            },
                                                            {
                                                              fn: "isSet",
                                                              argv: [
                                                                {
                                                                  ref: "Endpoint",
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "parseURL",
                                                              argv: [
                                                                {
                                                                  ref: "Endpoint",
                                                                },
                                                              ],
                                                              assign: "url",
                                                            },
                                                            {
                                                              fn: "stringEquals",
                                                              argv: [
                                                                {
                                                                  ref: "Region",
                                                                },
                                                                "aws-global",
                                                              ],
                                                            },
                                                          ],
                                                          endpoint: {
                                                            url: "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}",
                                                            properties: {
                                                              authSchemes: [
                                                                {
                                                                  name: "sigv4",
                                                                  signingRegion: "us-east-1",
                                                                  disableDoubleEncoding: true,
                                                                  signingName: "s3",
                                                                },
                                                              ],
                                                            },
                                                            headers: {},
                                                          },
                                                          type: "endpoint",
                                                        },
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                false,
                                                              ],
                                                            },
                                                            {
                                                              fn: "isSet",
                                                              argv: [
                                                                {
                                                                  ref: "Endpoint",
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "parseURL",
                                                              argv: [
                                                                {
                                                                  ref: "Endpoint",
                                                                },
                                                              ],
                                                              assign: "url",
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "stringEquals",
                                                                  argv: [
                                                                    {
                                                                      ref: "Region",
                                                                    },
                                                                    "aws-global",
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseGlobalEndpoint",
                                                                },
                                                                true,
                                                              ],
                                                            },
                                                          ],
                                                          type: "tree",
                                                          rules: [
                                                            {
                                                              conditions: [
                                                                {
                                                                  fn: "stringEquals",
                                                                  argv: [
                                                                    {
                                                                      ref: "Region",
                                                                    },
                                                                    "us-east-1",
                                                                  ],
                                                                },
                                                              ],
                                                              endpoint: {
                                                                url: "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}",
                                                                properties: {
                                                                  authSchemes: [
                                                                    {
                                                                      name: "sigv4",
                                                                      signingRegion: "{Region}",
                                                                      disableDoubleEncoding: true,
                                                                      signingName: "s3",
                                                                    },
                                                                  ],
                                                                },
                                                                headers: {},
                                                              },
                                                              type: "endpoint",
                                                            },
                                                            {
                                                              conditions: [],
                                                              endpoint: {
                                                                url: "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}",
                                                                properties: {
                                                                  authSchemes: [
                                                                    {
                                                                      name: "sigv4",
                                                                      signingRegion: "{Region}",
                                                                      disableDoubleEncoding: true,
                                                                      signingName: "s3",
                                                                    },
                                                                  ],
                                                                },
                                                                headers: {},
                                                              },
                                                              type: "endpoint",
                                                            },
                                                          ],
                                                        },
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                false,
                                                              ],
                                                            },
                                                            {
                                                              fn: "isSet",
                                                              argv: [
                                                                {
                                                                  ref: "Endpoint",
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "parseURL",
                                                              argv: [
                                                                {
                                                                  ref: "Endpoint",
                                                                },
                                                              ],
                                                              assign: "url",
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "stringEquals",
                                                                  argv: [
                                                                    {
                                                                      ref: "Region",
                                                                    },
                                                                    "aws-global",
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseGlobalEndpoint",
                                                                },
                                                                false,
                                                              ],
                                                            },
                                                          ],
                                                          endpoint: {
                                                            url: "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}",
                                                            properties: {
                                                              authSchemes: [
                                                                {
                                                                  name: "sigv4",
                                                                  signingRegion: "{Region}",
                                                                  disableDoubleEncoding: true,
                                                                  signingName: "s3",
                                                                },
                                                              ],
                                                            },
                                                            headers: {},
                                                          },
                                                          type: "endpoint",
                                                        },
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                false,
                                                              ],
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "isSet",
                                                                  argv: [
                                                                    {
                                                                      ref: "Endpoint",
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "stringEquals",
                                                              argv: [
                                                                {
                                                                  ref: "Region",
                                                                },
                                                                "aws-global",
                                                              ],
                                                            },
                                                          ],
                                                          endpoint: {
                                                            url: "https://s3.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                            properties: {
                                                              authSchemes: [
                                                                {
                                                                  name: "sigv4",
                                                                  signingRegion: "us-east-1",
                                                                  disableDoubleEncoding: true,
                                                                  signingName: "s3",
                                                                },
                                                              ],
                                                            },
                                                            headers: {},
                                                          },
                                                          type: "endpoint",
                                                        },
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                false,
                                                              ],
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "isSet",
                                                                  argv: [
                                                                    {
                                                                      ref: "Endpoint",
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "stringEquals",
                                                              argv: [
                                                                {
                                                                  ref: "Region",
                                                                },
                                                                "aws-global",
                                                              ],
                                                            },
                                                          ],
                                                          endpoint: {
                                                            url: "https://s3.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                            properties: {
                                                              authSchemes: [
                                                                {
                                                                  name: "sigv4",
                                                                  signingRegion: "us-east-1",
                                                                  disableDoubleEncoding: true,
                                                                  signingName: "s3",
                                                                },
                                                              ],
                                                            },
                                                            headers: {},
                                                          },
                                                          type: "endpoint",
                                                        },
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                false,
                                                              ],
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "isSet",
                                                                  argv: [
                                                                    {
                                                                      ref: "Endpoint",
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "stringEquals",
                                                                  argv: [
                                                                    {
                                                                      ref: "Region",
                                                                    },
                                                                    "aws-global",
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseGlobalEndpoint",
                                                                },
                                                                true,
                                                              ],
                                                            },
                                                          ],
                                                          type: "tree",
                                                          rules: [
                                                            {
                                                              conditions: [
                                                                {
                                                                  fn: "stringEquals",
                                                                  argv: [
                                                                    {
                                                                      ref: "Region",
                                                                    },
                                                                    "us-east-1",
                                                                  ],
                                                                },
                                                              ],
                                                              endpoint: {
                                                                url: "https://s3.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                                properties: {
                                                                  authSchemes: [
                                                                    {
                                                                      name: "sigv4",
                                                                      signingRegion: "{Region}",
                                                                      disableDoubleEncoding: true,
                                                                      signingName: "s3",
                                                                    },
                                                                  ],
                                                                },
                                                                headers: {},
                                                              },
                                                              type: "endpoint",
                                                            },
                                                            {
                                                              conditions: [],
                                                              endpoint: {
                                                                url: "https://s3.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                                properties: {
                                                                  authSchemes: [
                                                                    {
                                                                      name: "sigv4",
                                                                      signingRegion: "{Region}",
                                                                      disableDoubleEncoding: true,
                                                                      signingName: "s3",
                                                                    },
                                                                  ],
                                                                },
                                                                headers: {},
                                                              },
                                                              type: "endpoint",
                                                            },
                                                          ],
                                                        },
                                                        {
                                                          conditions: [
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseDualStack",
                                                                },
                                                                false,
                                                              ],
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "isSet",
                                                                  argv: [
                                                                    {
                                                                      ref: "Endpoint",
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "not",
                                                              argv: [
                                                                {
                                                                  fn: "stringEquals",
                                                                  argv: [
                                                                    {
                                                                      ref: "Region",
                                                                    },
                                                                    "aws-global",
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              fn: "booleanEquals",
                                                              argv: [
                                                                {
                                                                  ref: "UseGlobalEndpoint",
                                                                },
                                                                false,
                                                              ],
                                                            },
                                                          ],
                                                          endpoint: {
                                                            url: "https://s3.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
                                                            properties: {
                                                              authSchemes: [
                                                                {
                                                                  name: "sigv4",
                                                                  signingRegion: "{Region}",
                                                                  disableDoubleEncoding: true,
                                                                  signingName: "s3",
                                                                },
                                                              ],
                                                            },
                                                            headers: {},
                                                          },
                                                          type: "endpoint",
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                                {
                                                  conditions: [],
                                                  error: "Path-style addressing cannot be used with FIPS",
                                                  type: "error",
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                        {
                                          conditions: [],
                                          error: "Path-style addressing cannot be used with S3 Accelerate",
                                          type: "error",
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  conditions: [],
                                  error: "A valid partition could not be determined",
                                  type: "error",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  conditions: [
                    {
                      fn: "isSet",
                      argv: [
                        {
                          ref: "UseObjectLambdaEndpoint",
                        },
                      ],
                    },
                    {
                      fn: "booleanEquals",
                      argv: [
                        {
                          ref: "UseObjectLambdaEndpoint",
                        },
                        true,
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [
                        {
                          fn: "aws.partition",
                          argv: [
                            {
                              ref: "Region",
                            },
                          ],
                          assign: "partitionResult",
                        },
                      ],
                      type: "tree",
                      rules: [
                        {
                          conditions: [],
                          type: "tree",
                          rules: [
                            {
                              conditions: [
                                {
                                  fn: "isValidHostLabel",
                                  argv: [
                                    {
                                      ref: "Region",
                                    },
                                    true,
                                  ],
                                },
                              ],
                              type: "tree",
                              rules: [
                                {
                                  conditions: [],
                                  type: "tree",
                                  rules: [
                                    {
                                      conditions: [
                                        {
                                          fn: "booleanEquals",
                                          argv: [
                                            {
                                              ref: "UseDualStack",
                                            },
                                            true,
                                          ],
                                        },
                                      ],
                                      error: "S3 Object Lambda does not support Dual-stack",
                                      type: "error",
                                    },
                                    {
                                      conditions: [],
                                      type: "tree",
                                      rules: [
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "Accelerate",
                                                },
                                                true,
                                              ],
                                            },
                                          ],
                                          error: "S3 Object Lambda does not support S3 Accelerate",
                                          type: "error",
                                        },
                                        {
                                          conditions: [],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [
                                                {
                                                  fn: "booleanEquals",
                                                  argv: [
                                                    {
                                                      ref: "UseFIPS",
                                                    },
                                                    true,
                                                  ],
                                                },
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      fn: "getAttr",
                                                      argv: [
                                                        {
                                                          ref: "partitionResult",
                                                        },
                                                        "name",
                                                      ],
                                                    },
                                                    "aws-cn",
                                                  ],
                                                },
                                              ],
                                              error: "Partition does not support FIPS",
                                              type: "error",
                                            },
                                            {
                                              conditions: [],
                                              type: "tree",
                                              rules: [
                                                {
                                                  conditions: [
                                                    {
                                                      fn: "isSet",
                                                      argv: [
                                                        {
                                                          ref: "Endpoint",
                                                        },
                                                      ],
                                                    },
                                                    {
                                                      fn: "parseURL",
                                                      argv: [
                                                        {
                                                          ref: "Endpoint",
                                                        },
                                                      ],
                                                      assign: "url",
                                                    },
                                                  ],
                                                  endpoint: {
                                                    url: "{url#scheme}://{url#authority}{url#path}",
                                                    properties: {
                                                      authSchemes: [
                                                        {
                                                          name: "sigv4",
                                                          signingRegion: "{Region}",
                                                          disableDoubleEncoding: true,
                                                          signingName: "s3-object-lambda",
                                                        },
                                                      ],
                                                    },
                                                    headers: {},
                                                  },
                                                  type: "endpoint",
                                                },
                                                {
                                                  conditions: [
                                                    {
                                                      fn: "booleanEquals",
                                                      argv: [
                                                        {
                                                          ref: "UseFIPS",
                                                        },
                                                        true,
                                                      ],
                                                    },
                                                  ],
                                                  endpoint: {
                                                    url: "https://s3-object-lambda-fips.{Region}.{partitionResult#dnsSuffix}",
                                                    properties: {
                                                      authSchemes: [
                                                        {
                                                          name: "sigv4",
                                                          signingRegion: "{Region}",
                                                          disableDoubleEncoding: true,
                                                          signingName: "s3-object-lambda",
                                                        },
                                                      ],
                                                    },
                                                    headers: {},
                                                  },
                                                  type: "endpoint",
                                                },
                                                {
                                                  conditions: [],
                                                  endpoint: {
                                                    url: "https://s3-object-lambda.{Region}.{partitionResult#dnsSuffix}",
                                                    properties: {
                                                      authSchemes: [
                                                        {
                                                          name: "sigv4",
                                                          signingRegion: "{Region}",
                                                          disableDoubleEncoding: true,
                                                          signingName: "s3-object-lambda",
                                                        },
                                                      ],
                                                    },
                                                    headers: {},
                                                  },
                                                  type: "endpoint",
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              conditions: [],
                              error: "Invalid region: region was not a valid DNS name.",
                              type: "error",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      conditions: [],
                      error: "A valid partition could not be determined",
                      type: "error",
                    },
                  ],
                },
                {
                  conditions: [
                    {
                      fn: "not",
                      argv: [
                        {
                          fn: "isSet",
                          argv: [
                            {
                              ref: "Bucket",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [
                        {
                          fn: "aws.partition",
                          argv: [
                            {
                              ref: "Region",
                            },
                          ],
                          assign: "partitionResult",
                        },
                      ],
                      type: "tree",
                      rules: [
                        {
                          conditions: [],
                          type: "tree",
                          rules: [
                            {
                              conditions: [
                                {
                                  fn: "isValidHostLabel",
                                  argv: [
                                    {
                                      ref: "Region",
                                    },
                                    true,
                                  ],
                                },
                              ],
                              type: "tree",
                              rules: [
                                {
                                  conditions: [],
                                  type: "tree",
                                  rules: [
                                    {
                                      conditions: [
                                        {
                                          fn: "booleanEquals",
                                          argv: [
                                            {
                                              ref: "UseFIPS",
                                            },
                                            true,
                                          ],
                                        },
                                        {
                                          fn: "stringEquals",
                                          argv: [
                                            {
                                              fn: "getAttr",
                                              argv: [
                                                {
                                                  ref: "partitionResult",
                                                },
                                                "name",
                                              ],
                                            },
                                            "aws-cn",
                                          ],
                                        },
                                      ],
                                      error: "Partition does not support FIPS",
                                      type: "error",
                                    },
                                    {
                                      conditions: [],
                                      type: "tree",
                                      rules: [
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "{url#scheme}://{url#authority}{url#path}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "{url#scheme}://{url#authority}{url#path}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                true,
                                              ],
                                            },
                                          ],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [],
                                              endpoint: {
                                                url: "{url#scheme}://{url#authority}{url#path}",
                                                properties: {
                                                  authSchemes: [
                                                    {
                                                      name: "sigv4",
                                                      signingRegion: "{Region}",
                                                      disableDoubleEncoding: true,
                                                      signingName: "s3",
                                                    },
                                                  ],
                                                },
                                                headers: {},
                                              },
                                              type: "endpoint",
                                            },
                                          ],
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                false,
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "{url#scheme}://{url#authority}{url#path}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "{Region}",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                true,
                                              ],
                                            },
                                          ],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [],
                                              endpoint: {
                                                url: "https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}",
                                                properties: {
                                                  authSchemes: [
                                                    {
                                                      name: "sigv4",
                                                      signingRegion: "{Region}",
                                                      disableDoubleEncoding: true,
                                                      signingName: "s3",
                                                    },
                                                  ],
                                                },
                                                headers: {},
                                              },
                                              type: "endpoint",
                                            },
                                          ],
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                false,
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "{Region}",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "{url#scheme}://{url#authority}{url#path}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "{url#scheme}://{url#authority}{url#path}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                true,
                                              ],
                                            },
                                          ],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [],
                                              endpoint: {
                                                url: "{url#scheme}://{url#authority}{url#path}",
                                                properties: {
                                                  authSchemes: [
                                                    {
                                                      name: "sigv4",
                                                      signingRegion: "{Region}",
                                                      disableDoubleEncoding: true,
                                                      signingName: "s3",
                                                    },
                                                  ],
                                                },
                                                headers: {},
                                              },
                                              type: "endpoint",
                                            },
                                          ],
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                false,
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "{url#scheme}://{url#authority}{url#path}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "{Region}",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "https://s3-fips.us-east-1.{partitionResult#dnsSuffix}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "https://s3-fips.us-east-1.{partitionResult#dnsSuffix}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                true,
                                              ],
                                            },
                                          ],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [],
                                              endpoint: {
                                                url: "https://s3-fips.{Region}.{partitionResult#dnsSuffix}",
                                                properties: {
                                                  authSchemes: [
                                                    {
                                                      name: "sigv4",
                                                      signingRegion: "{Region}",
                                                      disableDoubleEncoding: true,
                                                      signingName: "s3",
                                                    },
                                                  ],
                                                },
                                                headers: {},
                                              },
                                              type: "endpoint",
                                            },
                                          ],
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                false,
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "https://s3-fips.{Region}.{partitionResult#dnsSuffix}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "{Region}",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "{url#scheme}://{url#authority}{url#path}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "{url#scheme}://{url#authority}{url#path}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                true,
                                              ],
                                            },
                                          ],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [],
                                              endpoint: {
                                                url: "{url#scheme}://{url#authority}{url#path}",
                                                properties: {
                                                  authSchemes: [
                                                    {
                                                      name: "sigv4",
                                                      signingRegion: "{Region}",
                                                      disableDoubleEncoding: true,
                                                      signingName: "s3",
                                                    },
                                                  ],
                                                },
                                                headers: {},
                                              },
                                              type: "endpoint",
                                            },
                                          ],
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                false,
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "{url#scheme}://{url#authority}{url#path}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "{Region}",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                true,
                                              ],
                                            },
                                          ],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [],
                                              endpoint: {
                                                url: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}",
                                                properties: {
                                                  authSchemes: [
                                                    {
                                                      name: "sigv4",
                                                      signingRegion: "{Region}",
                                                      disableDoubleEncoding: true,
                                                      signingName: "s3",
                                                    },
                                                  ],
                                                },
                                                headers: {},
                                              },
                                              type: "endpoint",
                                            },
                                          ],
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                true,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                false,
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "{Region}",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "{url#scheme}://{url#authority}{url#path}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "{url#scheme}://{url#authority}{url#path}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                true,
                                              ],
                                            },
                                          ],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "us-east-1",
                                                  ],
                                                },
                                              ],
                                              endpoint: {
                                                url: "{url#scheme}://{url#authority}{url#path}",
                                                properties: {
                                                  authSchemes: [
                                                    {
                                                      name: "sigv4",
                                                      signingRegion: "{Region}",
                                                      disableDoubleEncoding: true,
                                                      signingName: "s3",
                                                    },
                                                  ],
                                                },
                                                headers: {},
                                              },
                                              type: "endpoint",
                                            },
                                            {
                                              conditions: [],
                                              endpoint: {
                                                url: "{url#scheme}://{url#authority}{url#path}",
                                                properties: {
                                                  authSchemes: [
                                                    {
                                                      name: "sigv4",
                                                      signingRegion: "{Region}",
                                                      disableDoubleEncoding: true,
                                                      signingName: "s3",
                                                    },
                                                  ],
                                                },
                                                headers: {},
                                              },
                                              type: "endpoint",
                                            },
                                          ],
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "isSet",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                            },
                                            {
                                              fn: "parseURL",
                                              argv: [
                                                {
                                                  ref: "Endpoint",
                                                },
                                              ],
                                              assign: "url",
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                false,
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "{url#scheme}://{url#authority}{url#path}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "{Region}",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "https://s3.{partitionResult#dnsSuffix}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "stringEquals",
                                              argv: [
                                                {
                                                  ref: "Region",
                                                },
                                                "aws-global",
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "https://s3.{partitionResult#dnsSuffix}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "us-east-1",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                true,
                                              ],
                                            },
                                          ],
                                          type: "tree",
                                          rules: [
                                            {
                                              conditions: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "us-east-1",
                                                  ],
                                                },
                                              ],
                                              endpoint: {
                                                url: "https://s3.{partitionResult#dnsSuffix}",
                                                properties: {
                                                  authSchemes: [
                                                    {
                                                      name: "sigv4",
                                                      signingRegion: "{Region}",
                                                      disableDoubleEncoding: true,
                                                      signingName: "s3",
                                                    },
                                                  ],
                                                },
                                                headers: {},
                                              },
                                              type: "endpoint",
                                            },
                                            {
                                              conditions: [],
                                              endpoint: {
                                                url: "https://s3.{Region}.{partitionResult#dnsSuffix}",
                                                properties: {
                                                  authSchemes: [
                                                    {
                                                      name: "sigv4",
                                                      signingRegion: "{Region}",
                                                      disableDoubleEncoding: true,
                                                      signingName: "s3",
                                                    },
                                                  ],
                                                },
                                                headers: {},
                                              },
                                              type: "endpoint",
                                            },
                                          ],
                                        },
                                        {
                                          conditions: [
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseFIPS",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseDualStack",
                                                },
                                                false,
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "isSet",
                                                  argv: [
                                                    {
                                                      ref: "Endpoint",
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "not",
                                              argv: [
                                                {
                                                  fn: "stringEquals",
                                                  argv: [
                                                    {
                                                      ref: "Region",
                                                    },
                                                    "aws-global",
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              fn: "booleanEquals",
                                              argv: [
                                                {
                                                  ref: "UseGlobalEndpoint",
                                                },
                                                false,
                                              ],
                                            },
                                          ],
                                          endpoint: {
                                            url: "https://s3.{Region}.{partitionResult#dnsSuffix}",
                                            properties: {
                                              authSchemes: [
                                                {
                                                  name: "sigv4",
                                                  signingRegion: "{Region}",
                                                  disableDoubleEncoding: true,
                                                  signingName: "s3",
                                                },
                                              ],
                                            },
                                            headers: {},
                                          },
                                          type: "endpoint",
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              conditions: [],
                              error: "Invalid region: region was not a valid DNS name.",
                              type: "error",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      conditions: [],
                      error: "A valid partition could not be determined",
                      type: "error",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          conditions: [],
          error: "A region must be set when sending requests to S3.",
          type: "error",
        },
      ],
    },
  ],
};
