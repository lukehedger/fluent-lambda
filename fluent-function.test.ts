import { expect, test } from "bun:test";
import { handler } from "./fluent-function";

test("hello alice", async () => {
  const actual = await handler({ name: "alice" });

  const expected = { hello: "alice" };

  expect(actual).toStrictEqual(expected);
});
