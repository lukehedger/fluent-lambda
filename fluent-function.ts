import { Pipe } from "sloth-pipe";

interface Event {
  name: string;
}

// TODO: XRay instrumentation, wide tracing, async HTTP call

export const handler = async (event: Event) =>
  Pipe(event)
    .tap((x) => console.log(x))
    .to((event) => ({ hello: event.name }))
    .catch((error) => ({ status: "error" }))
    .exec();
