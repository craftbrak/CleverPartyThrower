import {Resolver, Query, Mutation, Args, ID, ResolveField, Parent} from "@nestjs/graphql";
import { CarService } from "./car.service";
import { Car } from "./entities/car.entity";
import { CreateCarInput } from "./dto/create-car.input";
import { UpdateCarInput } from "./dto/update-car.input";
import {CurrentUser} from "../auth/guards/jwtAuth.gruard";
import {JWTPayload} from "../auth/auth.service";
import {User} from "../user/entities/user.entity";

@Resolver(() => Car)
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Mutation(() => Car)
  async createCar(@Args("createCarInput",) createCarInput: CreateCarInput,@CurrentUser() user: JWTPayload,) {
    return await this.carService.create(createCarInput,user);
  }

  @Query(() => [Car], { name: "car" })
  async findAll() {
    return await this.carService.findAll();
  }

  @Query(() => Car, { name: "car" })
  async findOne(@Args("id", { type: () => ID }) id: string) {
    return await this.carService.findOne(id);
  }

  @Mutation(() => Car)
  async updateCar(@Args("updateCarInput") updateCarInput: UpdateCarInput) {
    return await this.carService.update(updateCarInput.id, updateCarInput);
  }

  @Mutation(() => Car)
  async removeCar(@Args("id", { type: () => ID }) id: string) {
    return await this.carService.remove(id);
  }
  @ResolveField("owner",()=>User)
  async findOwner(@Parent()car:Car){
    return await this.carService.getOwner(car)
  }
}
