import { Test } from "@nestjs/testing";
import { FooService } from "./foo.service";
import { expect, describe, it, beforeAll } from "vitest";

describe("FooService", () => {
      let service: FooService;

      beforeAll(async () => {
            const module = await Test.createTestingModule({
                  providers: [FooService],
            }).compile();

            service = module.get(FooService);
      });

      it("returns 42", () => {
            expect(service.answer()).toBe(42);
      });
});
