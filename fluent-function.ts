import { Logger } from "@aws-lambda-powertools/logger";
import type { LogLevel } from "@aws-lambda-powertools/logger/types";
import { Tracer } from "@aws-lambda-powertools/tracer";
import { Pipe } from "sloth-pipe";

interface Event {
  name: string;
}

const logger = new Logger({
  logLevel: (process.env.LOG_LEVEL as LogLevel) || "INFO",
  serviceName: process.env.AWS_LAMBDA_FUNCTION_NAME,
});

const tracer = new Tracer({
  serviceName: process.env.AWS_LAMBDA_FUNCTION_NAME,
});

export const handler = async (event: Event) =>
  Pipe(event)
    // BUSINESS LOGIC
    .to((event) => ({ hello: event.name }))
    // WIDE LOG
    .tap((event) => logger.info("name", event.hello))
    // WIDE TRACE
    .tap(() => {
      const segment = tracer.getSegment();
      const subsegment = segment?.addNewSubsegment("Annotations");
      subsegment && tracer.setSegment(subsegment);

      tracer.putAnnotation("name", event.name);

      subsegment?.close();
      segment && tracer.setSegment(segment);
    })
    // ERROR HANDLING
    .catch((error) => {
      error instanceof Error &&
        tracer.addErrorAsMetadata(new Error(error.message));

      return { status: "error" };
    })
    .exec();
