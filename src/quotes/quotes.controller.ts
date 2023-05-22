import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { QuoteRequestDto } from "./dto/quote-request.dto";
import { QuoteResponseDto } from "./dto/quote-response.dto";
import { QuotesService } from "./quotes.service";

@Controller("quotes")
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  async create(@Body() quote: QuoteRequestDto): Promise<QuoteResponseDto> {
    return this.quotesService.create(quote);
  }

  @Post("/upload")
  @UseInterceptors(FileInterceptor("file"))
  async upload(
    @UploadedFile() file: Express.Multer.File
  ): Promise<QuoteResponseDto[]> {
    try {
      const quotes = JSON.parse(file.buffer.toString());
      for (const quote of quotes) {
        await this.quotesService.create(quote);
      }
      return quotes;
    } catch {
      throw new HttpException(
        "could not parse json in file",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  async findAll(): Promise<QuoteResponseDto[]> {
    return this.quotesService.findAll();
  }

  @Get("/random")
  async findRandom(@Res() response: Response) {
    const quote = await this.quotesService.findRandom();
    if (quote == null) {
      throw new HttpException(
        "no quotes found in database",
        HttpStatus.NOT_FOUND
      );
    }
    return response.redirect(`/quotes/${quote.quote_id}`);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<QuoteResponseDto> {
    const quote = await this.quotesService.findOne(+id);
    if (quote == null) {
      throw new HttpException("quote not found", HttpStatus.NOT_FOUND);
    }
    return quote;
  }
}
