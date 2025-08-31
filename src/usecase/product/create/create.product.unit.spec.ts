import CreateProductUseCase from "./create.product.usecase";

const input = {
    id: "2",
    name: "Feijão",
    price: 20.99
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Teste de criar um produto use case", () => {

    it("should create a product", async () => {
        const productRepository = MockRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });

    });

    it("should throw error when name is invalid", async () => {
      const productRepository = MockRepository();
      const useCase = new CreateProductUseCase(productRepository);

      input.name = "";

      await expect(useCase.execute(input)).rejects.toThrow("Name is required");

    })
});