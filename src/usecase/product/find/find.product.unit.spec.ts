import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1", "Arroz", 20.99);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Teste de produto use case", () => {

  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository)

    const input = {
        id: "1"
    }

    const output = {
        id: "1",
        name: "Arroz",
        price: 20.99
    }

    const resultado = await useCase.execute(input);
    expect(resultado).toEqual(output);
  })

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found")
    })
    const useCase = new FindProductUseCase(productRepository)

    const input = {
        id: "2"
    }

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Product not found");
  })

})