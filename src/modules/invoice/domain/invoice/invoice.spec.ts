import Invoice from "./invoice.entity";
import Address from "../../../../@shared/domain/value-object/address/address.value-object";
import Product from "../product/product.entity";

describe("Client Entity", () => {

    it("should get total price", () => {

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
        });

        const product2 = new Product({
            name: 'Guitarra Gibson Les Paul',
            price: 15000
        });

        const clientProps = {
            name: 'Carlos Calhorda',
            document: '1234567789',
            address,
            items: [product1, product2],
        }

        const client = new Invoice(clientProps)

        expect(client.total).toBe(20000)

    })

})
