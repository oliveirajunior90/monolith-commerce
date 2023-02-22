import Invoice from "../domain/invoice/invoice.entity";
import {
    GenerateInvoiceUseCaseInputDto,
    GenerateInvoiceUseCaseOutputDto
} from "../usecase/generate-invoice/generate-invoice.dto";
import {FindInvoiceUseCaseInputDTO} from "../usecase/find-invoice/find-invoice.dto";

export interface FindInvoiceUseCaseOutputDTO {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
    createdAt: Date;
}

export default interface InvoiceFacadeInterface {

    generate(input: GenerateInvoiceUseCaseInputDto) : Promise<void>

    find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO>

}