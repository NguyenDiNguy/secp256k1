import { ApiProperty } from '@nestjs/swagger';

export class VerifyResponse {
  @ApiProperty({ type: Boolean })
  isVerifySuccessful: boolean;
}
