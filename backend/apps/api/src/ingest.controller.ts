import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { IngestService } from './ingest.service';
import { IngestUrlDto } from './dto/ingest-url.dto'; // Corrected path

@Controller('ingest')
export class IngestController {
  constructor(private readonly ingestService: IngestService) {}

  @Post()
  async ingestUrl(@Body() ingestUrlDto: IngestUrlDto) {
    try {
      // Basic logging for now, can be expanded
      console.log(`Received request to ingest URL: ${ingestUrlDto.url}`);
      const result = await this.ingestService.processUrl(ingestUrlDto.url);
      return { message: 'Ingestion job started successfully.', data: result };
    } catch (error) {
      // Log the error for debugging
      console.error('Error during ingestion request:', error);
      // Re-throw as HttpException or a more specific custom exception
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to start ingestion job.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
