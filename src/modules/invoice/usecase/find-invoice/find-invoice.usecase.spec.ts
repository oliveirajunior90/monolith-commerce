import Invoice from "../../domain/invoice/invoice.entity";
import Address from "../../../../@shared/domain/value-object/address/address.value-object";
import Product from "../../domain/product/product.entity";
import Id from "../../../../@shared/domain/value-object/id.value-object";
import FindInvoiceUseCase from "./find-invoice.usecase";

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

const invoice = new Invoice({
    id: new Id("1"),
    name: 'Carlos Calhorda',
    document: '1234567789',
    address,
    items: [product1, product2],
});

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Find invoice usecase unit test", () => {

    it('should find', async() => {

        const repository = MockRepository();

        const invoiceUseCase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1",
        }

        const result = await invoiceUseCase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);

        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);

        expect(result.items[1].id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);

    })


});