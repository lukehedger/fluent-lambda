import { App } from "aws-cdk-lib";
import { FluentFunction } from "./stack";

const app = new App();

new FluentFunction(app, "FluentFunction", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
