import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './modules/shared/query-root';
import { BooksModule } from './modules/books/books.module';
import { AuthorsModule } from './modules/author/authors.module';
import { PublisherModule } from './modules/publisher/publisher.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'library_user',
      password: 'library',
      database: 'library',
      autoLoadEntities: true,
      synchronize: false,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    BooksModule,
    AuthorsModule,
    PublisherModule
  ],


  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule { }
