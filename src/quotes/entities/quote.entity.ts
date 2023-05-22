import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Quote {
  @PrimaryColumn()
  quote_id: number;

  @Column("text")
  quote: string;

  @Column("text")
  character: string;
}
