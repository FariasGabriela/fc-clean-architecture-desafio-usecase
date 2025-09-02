import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.usecase";

describe("Teste de produto use case", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository)

    const product = new Product("1", "Arroz", 20.99);
    await productRepository.create(product);

    const input = {
        name: "Arroz",
        price: 20.99
    }

    const output = {
        id: expect.any(String), 
        name: "Arroz",
        price: 20.99
    }

    const resultado = await useCase.execute(input);
    expect(resultado).toEqual(output);
  })
})