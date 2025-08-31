import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Macarrão", 30);

const input = {
    id: product.id,
    name: "Massa update",
    price: 50.99
}

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };


describe("Unit Teste de atualizar um produto use case", () => {

    it("should update a product", async () => {
        const productRepository = MockRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const output = await useCase.execute(input);
        expect(output).toEqual(input);
    });
})