import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Sal", 20.8);
const product2 = ProductFactory.create("b", "Sazon", 16.90);

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

describe("Unit Teste de lista de produto use case", () => {

    it("should list a product", async () => {
        const productRepository = MockRepository();
        const useCase = new ListProductUseCase(productRepository)

        const resultado = await useCase.execute({});

        expect(resultado.products.length).toBe(2);
        expect(resultado.products[0].id).toBe(product1.id);
        expect(resultado.products[0].name).toBe(product1.name);
        expect(resultado.products[0].price).toBe(product1.price);
        expect(resultado.products[1].id).toBe(product2.id);
        expect(resultado.products[1].name).toBe(product2.name);
        expect(resultado.products[1].price).toBe(product2.price);
    });
})