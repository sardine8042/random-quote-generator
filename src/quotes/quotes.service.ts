import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuoteRequestDto } from "./dto/quote-request.dto";
import { QuoteResponseDto } from "./dto/quote-response.dto";
import { Quote } from "./entities/quote.entity";

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>
  ) {}

  create(quote: QuoteRequestDto): Promise<QuoteResponseDto> {
    return this.quotesRepository.save(quote);
  }

  findAll(): Promise<QuoteResponseDto[]> {
    return this.quotesRepository.find();
  }

  findRandom(): Promise<QuoteResponseDto> {
    return this.quotesRepository
      .createQueryBuilder()
      .select("quotes.quote_id")
      .from(Quote, "quotes")
      .orderBy("RANDOM()")
      .limit(1)
      .getOne();
  }

  findOne(quote_id: number): Promise<QuoteResponseDto> {
    return this.quotesRepository.findOneBy({
      quote_id: quote_id,
    });
  }
}
