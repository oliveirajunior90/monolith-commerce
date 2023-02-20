import Invoice from "../domain/invoice/invoice.entity";

export default interface InvoiceGateway {
    generate(invoice: Invoice) : Promise<void>;
    find(id: string): Promise<Invoice>;
}