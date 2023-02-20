import Address from "../../../../@shared/domain/value-object/address/address.value-object";
import Product from "../../domain/product/product.entity";
import Invoice from "../../domain/invoice/invoice.entity";
import Id from "../../../../@shared/domain/value-object/id.value-object";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const address = new Address({
    street: 'Rua Sacadura cabral',
    number: '120',
    complement: 'fundos',
    city: 'Rio de Janeiro',
    state: 'RJ',
    zipCode: '21650190',
})

const product1 = new Product({
    id: new Id('1'),
    name: 'Guitarra Fender Stratocaster',
    price: 5000,
    createdAt: new Date(),
    updatedAt: new Date(),
});

const product2 = new Product({
    id: new Id('2'),
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

describe("Generate invoice usecase unit test", () => {

    it('should generate', async() => {

        const repository = MockRepository();

        const input = {
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: [
                {
                    id: '1',
                    name: product1.name,
                    price: product1.price,
                },
                {
                    id: '2',
                    name: product2.name,
                    price: product2.price,
                }
            ]
        }

        const invoiceUseCase = await new GenerateInvoiceUseCase(repository);

        const result = await invoiceUseCase.execute(input);

        expect(repository.generate).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(invoice.name);
        expect(result.street).toEqual(invoice.address.street);
        expect(result.number).toEqual(invoice.address.number);
        expect(result.complement).toEqual(invoice.address.complement);
        expect(result.city).toEqual(invoice.address.city);
        expect(result.state).toEqual(invoice.address.state);
        expect(result.zipCode).toEqual(invoice.address.zipCode);
        expect(result.total).toEqual(invoice.total);

        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);

        expect(result.items[1].id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);

    });

});