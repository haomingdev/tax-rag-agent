"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestController = void 0;
const common_1 = require("@nestjs/common");
const ingest_service_1 = require("./ingest.service");
const ingest_url_dto_1 = require("./dto/ingest-url.dto");
let IngestController = class IngestController {
    ingestService;
    constructor(ingestService) {
        this.ingestService = ingestService;
    }
    async ingestUrl(ingestUrlDto) {
        try {
            console.log(`Received request to ingest URL: ${ingestUrlDto.url}`);
            const result = await this.ingestService.processUrl(ingestUrlDto.url);
            return { message: 'Ingestion job started successfully.', data: result };
        }
        catch (error) {
            console.error('Error during ingestion request:', error);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Failed to start ingestion job.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.IngestController = IngestController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ingest_url_dto_1.IngestUrlDto]),
    __metadata("design:returntype", Promise)
], IngestController.prototype, "ingestUrl", null);
exports.IngestController = IngestController = __decorate([
    (0, common_1.Controller)('ingest'),
    __metadata("design:paramtypes", [ingest_service_1.IngestService])
], IngestController);
//# sourceMappingURL=ingest.controller.js.map