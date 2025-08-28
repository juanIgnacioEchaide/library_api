import { Author } from "@/modules/author/entities/author.entity";
import { Publisher } from "@/modules/publisher/entities/publisher.entity";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";

@ObjectType()
@Entity()
export class Book {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field(() => Int)
    @Column()
    year: number;

    @Field()
    @Column({ unique: true })
    isbn: string;

    @Field(() => Int)
    @Column()
    pages: number;

    @Field(() => [Author], { nullable: true })
    @ManyToMany(() => Author, (author) => author.books, { cascade: true })
    @JoinTable()
    authors?: Author[];

    @Field(() => Publisher)
    @ManyToOne(() => Publisher, (publisher) => publisher.books, { eager: true })
    publisher: Publisher;

}
