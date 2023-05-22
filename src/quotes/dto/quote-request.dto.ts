import { IsNotEmpty, IsNumberString } from "class-validator";

export class QuoteRequestDto {
  @IsNumberString()
  quote_id: number;

  @IsNotEmpty()
  quote: string;

  @IsNotEmpty()
  character: string;
}
