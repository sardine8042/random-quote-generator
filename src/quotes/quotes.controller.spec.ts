import { HttpException, HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Response } from "express";
import { Quote } from "./entities/quote.entity";
import { QuotesController } from "./quotes.controller";
import { QuotesService } from "./quotes.service";

const mock_result = { quote_id: 0, quote: "", character: "" };

export const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe("QuotesController", () => {
  let quotesController: QuotesController;
  let quotesService: QuotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotesController],
      providers: [
        QuotesService,
        { provide: getRepositoryToken(Quote), useClass: mockRepository },
      ],
    }).compile();

    quotesController = module.get<QuotesController>(QuotesController);
    quotesService = module.get<QuotesService>(QuotesService);
  });

  describe("create", () => {
    it("should return the uploaded quote", async () => {
      jest
        .spyOn(quotesService, "create")
        .mockImplementation(async () => mock_result);

      expect(await quotesController.create(mock_result)).toBe(mock_result);
    });
  });

  describe("findAll", () => {
    it("should return an array of quotes", async () => {
      jest
        .spyOn(quotesService, "findAll")
        .mockImplementation(async () => [mock_result]);

      expect(await quotesController.findAll()).toStrictEqual([mock_result]);
    });
  });

  describe("findRandom", () => {
    it("should return a quote", async () => {
      jest
        .spyOn(quotesService, "findRandom")
        .mockImplementation(async () => mock_result);

      const responseMock = {
        redirect: jest.fn((x) => x),
      } as unknown as Response;
      expect(await quotesController.findRandom(responseMock)).toBe(
        `/quotes/${mock_result.quote_id}`
      );
    });
  });

  describe("findRandom", () => {
    it("should raise a 404 when no quotes are in database", async () => {
      jest
        .spyOn(quotesService, "findRandom")
        .mockImplementation(async () => null);

      const responseMock = {
        redirect: jest.fn((x) => x),
      } as unknown as Response;
      await expect(quotesController.findRandom(responseMock)).rejects.toEqual(
        new HttpException("no quotes found in database", HttpStatus.NOT_FOUND)
      );
    });
  });

  describe("findOne", () => {
    it("should return a quote", async () => {
      jest
        .spyOn(quotesService, "findOne")
        .mockImplementation(async () => mock_result);

      expect(await quotesController.findOne("0")).toBe(mock_result);
    });
  });

  describe("findOne", () => {
    it("should raise a 404 when no quotes are in database", async () => {
      jest.spyOn(quotesService, "findOne").mockImplementation(async () => null);

      await expect(quotesController.findOne("0")).rejects.toEqual(
        new HttpException("quote not found", HttpStatus.NOT_FOUND)
      );
    });
  });
});
