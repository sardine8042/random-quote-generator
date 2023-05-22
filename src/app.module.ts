import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Quote } from "./quotes/entities/quote.entity";
import { QuotesModule } from "./quotes/quotes.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: ":memory:",
      logging: true,
      entities: [Quote],
      synchronize: true, // TODO: remove this before deploying
    }),
    QuotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
