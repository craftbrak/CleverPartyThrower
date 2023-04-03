import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>("PORT");
  const logger = new Logger("MAIN");
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, "0.0.0.0");
  logger.log(`listening at 0.0.0.0 on on port:${port}`);
}

bootstrap();
