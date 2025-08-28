import { Book } from '@/modules/books/entities/book.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@ObjectType()
@Entity()
export class Publisher {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    country?: string;

    @Field(() => [Book], { nullable: true })
    @OneToMany(() => Book, (book) => book.publisher)
    books?: Book[];
}
