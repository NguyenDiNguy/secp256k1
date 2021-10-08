import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
export class SignatureRequest {
  @Length(32)
  @ApiProperty({ type: String, description: 'Length: 32' })
  privateKey: string;

  @Length(1, 500)
  @ApiProperty({ type: String, description: 'Length: 1-500' })
  message: string;
}
