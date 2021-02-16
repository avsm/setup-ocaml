import * as io from "@actions/io";
import * as path from "path";

import * as installer from "../src/installer";

const toolDir = path.join(__dirname, "runner", "tools");
const tempDir = path.join(__dirname, "runner", "temp");

process.env["RUNNER_TOOL_CACHE"] = toolDir;
process.env["RUNNER_TEMP"] = tempDir;

describe("installer tests", () => {
  beforeAll(async () => {
    await io.rmRF(toolDir);
    await io.rmRF(tempDir);
  }, 100000);

  afterAll(async () => {
    try {
      await io.rmRF(toolDir);
      await io.rmRF(tempDir);
    } catch {
      console.log("Failed to remove test directories");
    }
  }, 100000);

  it("Acquires opam source", async () => {
    await installer.getOpam("");
  }, 1000000);

  it("Acquires opam source and uses custom repository", async () => {
    await installer.getOpam(
      "https://github.com/ocaml/opam-repository.git#master"
    );
  }, 1000000);
});
