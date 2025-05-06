"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const ingest_controller_1 = require("./ingest.controller");
describe('IngestController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [ingest_controller_1.IngestController],
        }).compile();
        controller = module.get(ingest_controller_1.IngestController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=ingest.controller.spec.js.map