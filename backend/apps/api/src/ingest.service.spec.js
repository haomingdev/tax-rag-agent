"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const ingest_service_1 = require("./ingest.service");
describe('IngestService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [ingest_service_1.IngestService],
        }).compile();
        service = module.get(ingest_service_1.IngestService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=ingest.service.spec.js.map