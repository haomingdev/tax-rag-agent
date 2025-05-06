import { IngestService } from './ingest.service';
import { IngestUrlDto } from './dto/ingest-url.dto';
export declare class IngestController {
    private readonly ingestService;
    constructor(ingestService: IngestService);
    ingestUrl(ingestUrlDto: IngestUrlDto): Promise<{
        message: string;
        data: any;
    }>;
}
