import InvoiceGateway from "../gateway/invoice.gateway";
import Invoice from "../domain/invoice/invoice.entity";
import {InvoiceModel} from "./invoice.repository.model";
import {ProductInvoiceModel} from "./product-invoice.model";
import {ProductModel} from "../../product-adm/repository/product/product-repository.model";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/domain/value-object/address/address.value-object";
import Product from "../domain/product/product.entity";

export default class InvoiceRepository implements InvoiceGateway {

    async generate(invoice: Invoice) : Promise<void> {
        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            })),
            createdAt: new Date(),
            updatedAt: new Date(),
        },{
            include: [{ model: ProductInvoiceModel }],
        });
    }

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({
            where: { id },
            include: ["items"],
        });

        if(!invoice) {
            throw new Error(`$Invoice with id ${id} not found`)
        }

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address({
                street: invoice.street,
                number: invoice.number,
                complement: invoice.complement,
                city: invoice.city,
                state: invoice.state,
                zipCode: invoice.zipCode,
            }),
            items: invoice.items.map((item) => new Product({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }))
        });
    }


}