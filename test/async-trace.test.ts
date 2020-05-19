import { asyncTrace } from "../src/async-trace"

/**
 * AsyncTrace test
 */
describe("AsyncTrace test", () => {
  it("AsyncTrace is not instantiable", () => {
    expect(asyncTrace).toBeInstanceOf(Object)
  })
})
