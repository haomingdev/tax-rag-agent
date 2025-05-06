import { IsNotEmpty, IsUrl } from 'class-validator';

export class IngestUrlDto {
  @IsUrl({}, { message: 'Please provide a valid URL.' })
  @IsNotEmpty({ message: 'URL should not be empty.' })
  url!: string;
}
