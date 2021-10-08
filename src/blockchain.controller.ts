import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ReturnDto } from './core/application/dto/return.dto';
import { AppService } from './app.service';
import { MetaDto } from './core/application/dto/meta.dto';
import { SignatureRequest } from './signature.rq.dto';
import { SignatureResponse } from './signature.rs.dto';
import { VerifyRequest } from './verify.rq.dto';

@ApiTags('secp256k1')
@Controller('secp256k1')
export class BlockchainController {
  constructor(private readonly _signatureService: AppService) {}
  @Get()
  @ApiOperation({
    summary: 'Get signature from privateKey and message',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the signature',
    type: SignatureResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - Please check request',
  })
  async getSignature(
    @Body() _signal: SignatureRequest,
  ): Promise<ReturnDto<SignatureResponse>> {
    try {
      const result = await this._signatureService.getSignature(_signal);
      return new ReturnDto<SignatureResponse>(
        new MetaDto('success', HttpStatus.OK),
        result,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('verify')
  @ApiOperation({
    summary: 'Verify signature',
  })
  @ApiResponse({
    status: 200,
    description: 'Return verification result',
    schema: {
      type: 'object',
      properties: {
        isVerifySuccessful: { type: 'boolean' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - Please check request',
  })
  async verify(@Body() _signal: VerifyRequest): Promise<ReturnDto<boolean>> {
    try {
      const result = await this._signatureService.verify(_signal);
      return new ReturnDto<boolean>(
        new MetaDto('success', HttpStatus.OK),
        result,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
