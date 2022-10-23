import { ObjectType, Field } from "@nestjs/graphql";
import { Node } from "../../pagination/entities/node.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { Country } from "./country.entity";
import { IsPostalCode } from "class-validator";
@Entity()
@ObjectType()
export class Address extends Node {
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  unitNumber: string;

  @Column()
  @Field(() => String)
  streetNumber: string;

  @Column()
  @Field(() => String)
  line1: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  line2: string;

  @Column()
  @Field(() => String)
  city: string;
  @IsPostalCode()
  @Column()
  @Field(() => String)
  postalCode: string;

  @ManyToOne(() => Country, (country) => country.addresses)
  @Field(() => Country)
  country: Country;

  @Field(() => String)
  @RelationId((self: Address) => self.country)
  countryId: Country["id"];
}
