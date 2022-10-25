import { Resolver, Query, Mutation, Args, Int, ID } from "@nestjs/graphql";
import { CarService } from "./car.service";
import { Car } from "./entities/car.entity";
import { CreateCarInput } from "./dto/create-car.input";
import { UpdateCarInput } from "./dto/update-car.input";

@Resolver(() => Car)
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Mutation(() => Car)
  createCar(@Args("createCarInput") createCarInput: CreateCarInput) {
    return this.carService.create(createCarInput);
  }

  @Query(() => [Car], { name: "car" })
  findAll() {
    return this.carService.findAll();
  }

  @Query(() => Car, { name: "car" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.carService.findOne(id);
  }

  @Mutation(() => Car)
  updateCar(@Args("updateCarInput") updateCarInput: UpdateCarInput) {
    return this.carService.update(updateCarInput.id, updateCarInput);
  }

  @Mutation(() => Car)
  removeCar(@Args("id", { type: () => ID }) id: string) {
    return this.carService.remove(id);
  }
}
