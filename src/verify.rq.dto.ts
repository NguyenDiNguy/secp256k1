import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
export class VerifyRequest {
  @Length(1, 500)
  @ApiProperty({ type: String, description: 'Length: 1-500' })
  message: string;

  @Length(64)
  @ApiProperty({ type: String, description: 'Length: 64' })
  signature: string;

  @Length(32)
  @ApiProperty({ type: String, description: 'Length: 32' })
  publicKey: string;
}
