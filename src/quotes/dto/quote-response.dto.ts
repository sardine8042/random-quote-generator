import { IsNotEmpty, IsNumberString } from "class-validator";

export class QuoteResponseDto {
  @IsNumberString()
  quote_id: number;

  @IsNotEmpty()
  quote: string;

  @IsNotEmpty()
  character: string;
}
