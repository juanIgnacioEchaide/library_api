import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PublisherService } from './publisher.service';
import { PublisherResolver } from './publisher.resolver';
import { Publisher } from './entities/publisher.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Publisher])],
    providers: [PublisherService, PublisherResolver],
    exports: [PublisherService],
})
export class PublisherModule { }
