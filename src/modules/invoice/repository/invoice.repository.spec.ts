import {Sequelize} from "sequelize-typescript";
import Address from "../../../@shared/domain/value-object/address/address.value-object";
import Invoice from "../domain/invoice/invoice.entity";
import Product from "../domain/product/product.entity";
import InvoiceRepository from "./invoice.repository";
import {ProductInvoiceModel} from "./product-invoice.model";
import {InvoiceModel} from "./invoice.repository.model";
import Id from "../../../@shared/domain/value-object/id.value-object";

const address = new Address({
    street: 'Rua Sacadura cabral',
    number: '120',
    complement: 'fundos',
    city: 'Rio de Janeiro',
    state: 'RJ',
    zipCode: '21650190',
})

const product1 = new Product({
    name: 'Guitarra Fender Stratocaster',
    price: 5000,
    createdAt: new Date(),
    updatedAt: new Date(),
});

const product2 = new Product({
    name: 'Guitarra Gibson Les Paul',
    price: 15000,
    createdAt: new Date(),
    updatedAt: new Date(),
});

const clientProps = {
    id: new Id("1"),
    name: 'Carlos Calhorda',
    document: '1234567789',
    address,
    items: [product1, product2],
}
describe("InvoiceRepository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([InvoiceModel, ProductInvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate a invoice ", async() => {

        const invoiceRepository = new InvoiceRepository();

        const invoice = new Invoice(clientProps);

        await invoiceRepository.generate(invoice);

        const result = await invoiceRepository.find("1");

        expect(result.id.id).toBe(clientProps.id.id);
        expect(result.name).toBe(clientProps.name);
        expect(result.document).toBe(clientProps.document);
        expect(result.address.street).toBe(clientProps.address.street);
        expect(result.address.number).toBe(clientProps.address.number);
        expect(result.address.complement).toBe(clientProps.address.complement);
        expect(result.address.city).toBe(clientProps.address.city);
        expect(result.address.state).toBe(clientProps.address.state);
        expect(result.address.zipCode).toBe(clientProps.address.zipCode);
        expect(result.items).toHaveLength(2);
    });

    it("should find invoice ", async() => {
        const invoiceRepository = new InvoiceRepository();

        const invoice = new Invoice(clientProps);

        await invoiceRepository.generate(invoice);

        const result = await invoiceRepository.find("1");

        expect(result.id.id).toBe(clientProps.id.id);
        expect(result.name).toBe(clientProps.name);
        expect(result.document).toBe(clientProps.document);
        expect(result.address.street).toBe(clientProps.address.street);
        expect(result.address.number).toBe(clientProps.address.number);
        expect(result.address.complement).toBe(clientProps.address.complement);
        expect(result.address.city).toBe(clientProps.address.city);
        expect(result.address.state).toBe(clientProps.address.state);
        expect(result.address.zipCode).toBe(clientProps.address.zipCode);
        expect(result.items).toHaveLength(2);

        expect(result.items[0].id.id).toBe(clientProps.items[0].id.id);
        expect(result.items[0].name).toBe(clientProps.items[0].name);
        expect(result.items[0].price).toBe(clientProps.items[0].price);

        expect(result.items[1].id.id).toBe(clientProps.items[1].id.id);
        expect(result.items[1].name).toBe(clientProps.items[1].name);
        expect(result.items[1].price).toBe(clientProps.items[1].price);
    });

});