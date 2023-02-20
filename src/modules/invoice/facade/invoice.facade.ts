import InvoiceFacadeInterface, {FindInvoiceUseCaseOutputDTO} from "./invoice.facade.interface";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import { GenerateInvoiceUseCaseInputDto } from "../usecase/generate-invoice/generate-invoice.dto";
import {FindInvoiceUseCaseInputDTO} from "../usecase/find-invoice/find-invoice.dto";


export interface UseCaseProps {
    generateInvoiceUseCase: UseCaseInterface;
    findInvoiceUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface{

    private _generateInvoiceUseCase : UseCaseInterface;
    private _findInvoiceUseCase : UseCaseInterface;

    constructor(useCaseProps: UseCaseProps) {
        this._generateInvoiceUseCase = useCaseProps.generateInvoiceUseCase;
        this._findInvoiceUseCase = useCaseProps.findInvoiceUseCase;
    }

    find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        return this._findInvoiceUseCase.execute(input)
    }

    generate(input: GenerateInvoiceUseCaseInputDto) {
        return this._generateInvoiceUseCase.execute(input)
    }



}