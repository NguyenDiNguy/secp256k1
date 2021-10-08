import { Injectable } from '@nestjs/common';
import * as secp from 'secp256k1';
import { SignatureRequest } from './signature.rq.dto';
import { SignatureResponse } from './signature.rs.dto';
import { sha256 } from 'js-sha256';
import { VerifyRequest } from './verify.rq.dto';

@Injectable()
export class AppService {
  hashAndConvertToUint8Array(str: string): Uint8Array {
    const buffer = Buffer.from(sha256(str), 'hex');
    return new Uint8Array(buffer);
  }
  async getSignature(signal: SignatureRequest): Promise<SignatureResponse> {
    console.log(signal);
    const msg = this.hashAndConvertToUint8Array(signal.message);
    // const privKey = this.hashAndConvertToUint8Array(signal.privateKey);
    const privKey = new Uint8Array(Buffer.from(signal.privateKey, 'hex'));
    console.log(
      'PublicKey: ',
      Buffer.from(secp.publicKeyCreate(privKey)).toString('hex'),
    );
    const sigObj = secp.ecdsaSign(msg, privKey); //signature
    return new SignatureResponse(Buffer.from(sigObj.signature).toString('hex'));
  }

  async verify(verifyInfor: VerifyRequest): Promise<boolean> {
    console.log(verifyInfor);
    const msg = this.hashAndConvertToUint8Array(verifyInfor.message);
    const pulicKey = new Uint8Array(Buffer.from(verifyInfor.publicKey, 'hex'));
    const signature = new Uint8Array(Buffer.from(verifyInfor.signature, 'hex'));
    const sigObj = secp.ecdsaVerify(signature, msg, pulicKey); //signature
    console.log(sigObj);
    return sigObj;
  }
}
