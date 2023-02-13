import ProductAdmFacadeInterface, {
    AddProductFacadeInputDto,
    CheckStockFacadeInputDto, CheckStockFacadeOutputDto
} from "./product-adm.facade.interface";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";

export interface UseCaseProps {
    addUseCase: UseCaseInterface;
    checkStockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addUseCase : UseCaseInterface;
    private _checkStockUseCase : UseCaseInterface;
    constructor(usecasesProps: UseCaseProps) {
        this._addUseCase = usecasesProps.addUseCase;
        this._checkStockUseCase = usecasesProps.checkStockUseCase;
    }
    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUseCase.execute(input);
    }
}