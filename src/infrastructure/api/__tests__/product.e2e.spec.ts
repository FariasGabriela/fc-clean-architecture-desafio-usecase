import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });
    
    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Arroz",
        price: 20.99
      });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Arroz");
      expect(response.body.price).toBe(20.99);
    });

    it("should not create a product", async () => {
        const response = await request(app)
        .post("/product")
        .send({
          name: "arroz",
        });
        expect(response.status).toBe(500);
      });

    it("should list all products", async () => {
        const response = await request(app)
          .post("/product")
          .send({
              name: "Feijão",
              price: 13.87
          });

          expect(response.status).toBe(200);

        const response2 = await request(app)
          .post("/product")
          .send({
              name: "Macarrão",
              price: 23.44
          });

        expect(response2.status).toBe(200);
      
        const listResponse = await request(app).get("/product").send();
      
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const product = listResponse.body.products[0];
        expect(product.name).toBe("Feijão");
        expect(product.price).toBe(13.87);
        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Macarrão");
        expect(product2.price).toBe(23.44);
      
        });

});