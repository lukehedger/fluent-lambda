import path from "node:path";
import { type App, Duration, Stack, type StackProps } from "aws-cdk-lib";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";

export class FluentFunction extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, "FluentFunction", {
      architecture: Architecture.ARM_64,
      bundling: {
        format: OutputFormat.ESM,
        minify: true,
        target: "esnext",
      },
      entry: path.join(path.resolve(), "fluent-function.ts"),
      functionName: "fluent-function",
      memorySize: 512,
      runtime: Runtime.NODEJS_20_X,
      timeout: Duration.seconds(5),
    });
  }
}
