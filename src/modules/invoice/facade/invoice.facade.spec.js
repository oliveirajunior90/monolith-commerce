import {Sequelize} from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/facade.factory";
import {InvoiceModel} from "../repository/invoice.repository.model";
import {ProductInvoiceModel} from "../repository/product-invoice.model";
import Id from "../../../@shared/domain/value-object/id.value-object";

describe("InvoiceFacadeTest", () => {

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

    it("should generate invoice", async() => {

        const invoiceFacade = InvoiceFacadeFactory.create();

        const input = {
            id: '1',
            name: 'Carlos Calhorda',
            document: '1234567789',
            number: '120',
            complement: 'fundos',
            city: 'Rio de Janeiro',
            state: 'RJ',
            street: 'Rua Sacadura Cabral',
            zipCode: '21750190',
            items: [
                {
                    id: '1',
                    name: 'Guitarra Fender Stratocaster',
                    price: 5000,
                },
                {
                    id: '2',
                    name: 'Guitarra Gibson Les Paul',
                    price: 5000,
                }
                ],
        }

        await invoiceFacade.generate(input);

        const result = await InvoiceModel.findOne({
            where: { id: '1'},
            include: ["items"],
        });

        expect(result.id).toBe(input.id);
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.street).toBe(input.street);
        expect(result.zipCode).toBe(input.zipCode);

        expect(result.items[0].id).toBe(input.items[0].id);
        expect(result.items[0].name).toBe(input.items[0].name);
        expect(result.items[0].price).toBe(input.items[0].price);

        expect(result.items[1].id).toBe(input.items[1].id);
        expect(result.items[1].name).toBe(input.items[1].name);
        expect(result.items[1].price).toBe(input.items[1].price);
    });

    it("should find invoice", async() => {

        const invoiceFacade = InvoiceFacadeFactory.create();

        const input = {
            id: '1',
            name: 'Carlos Calhorda',
            document: '1234567789',
            number: '120',
            complement: 'fundos',
            city: 'Rio de Janeiro',
            state: 'RJ',
            street: 'Rua Sacadura Cabral',
            zipCode: '21750190',
            items: [
                {
                    id: '1',
                    name: 'Guitarra Fender Stratocaster',
                    price: 5000,
                },
                {
                    id: '2',
                    name: 'Guitarra Gibson Les Paul',
                    price: 5000,
                }
            ],
        }

        await invoiceFacade.generate(input);

        const result = await invoiceFacade.find({ id: "1" });

        expect(result.id).toBe(input.id);
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.address.number).toBe(input.number);
        expect(result.address.complement).toBe(input.complement);
        expect(result.address.city).toBe(input.city);
        expect(result.address.state).toBe(input.state);
        expect(result.address.street).toBe(input.street);
        expect(result.address.zipCode).toBe(input.zipCode);

        expect(result.items[0].id).toBe(input.items[0].id);
        expect(result.items[0].name).toBe(input.items[0].name);
        expect(result.items[0].price).toBe(input.items[0].price);

        expect(result.items[1].id).toBe(input.items[1].id);
        expect(result.items[1].name).toBe(input.items[1].name);
        expect(result.items[1].price).toBe(input.items[1].price);

    });

})