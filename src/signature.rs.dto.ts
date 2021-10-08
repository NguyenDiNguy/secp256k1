import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class SignatureResponse {
  @Length(1 - 100)
  @ApiProperty({ type: String })
  signature: string;

  constructor(str: string) {
    this.signature = str;
  }
}
