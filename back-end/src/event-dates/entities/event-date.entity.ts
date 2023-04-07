import { Field, ObjectType } from "@nestjs/graphql";
import { Event } from "../../event/entities/event.entity";
import { Node } from "../../pagination/entities/node.entity";
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm";
import { DatesToUser } from "../../dates-to-user/entities/dates-to-user.entity";

@ObjectType()
@Entity()
export class EventDate extends Node {
  @Column()
  @Field(() => String, { description: "The date" })
  date: Date;
  @RelationId((self: EventDate) => self.event)
  @Field(() => String)
  eventId: Event["id"];
  @Column()
  @Field(() => Number)
  numberVotes: number;
  @Field(() => Event)
  @ManyToOne(() => Event, (event) => event.availableDates)
  event: Event;

  @Field(() => DatesToUser)
  @OneToMany(() => DatesToUser, (DatestoUser) => DatestoUser.eventDate)
  datesToUsers: DatesToUser[];
}
