import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BlockchainController } from './blockchain.controller';

@Module({
  imports: [],
  controllers: [BlockchainController],
  providers: [AppService],
})
export class AppModule {}
