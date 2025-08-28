import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { Author } from './entities/author.entity';
import { AuthorsRepository } from './authors.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Author])],
    providers: [AuthorsService, AuthorsResolver, AuthorsRepository],
    exports: [AuthorsRepository],
})
export class AuthorsModule { }
