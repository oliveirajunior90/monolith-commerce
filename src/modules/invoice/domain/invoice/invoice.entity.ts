import Address from "../../../../@shared/domain/value-object/address/address.value-object";
import BaseEntity from "../../../../@shared/domain/entity/base.entity";
import Id from "../../../../@shared/domain/value-object/id.value-object";
import Product from "../product/product.entity";

type clientProps = {
    id?: Id,
    name: string,
    document: string,
    address: Address,
    items: Product[],
}

export default class Invoice extends BaseEntity {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: Product[];

    constructor(props : clientProps) {
        super(props.id);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
    }

    get name() {
        return this._name;
    }

    get document() {
        return this._document;
    }

    get address() {
        return this._address;
    }

    get items() {
        return this._items;
    }
    get total(): number {
        return this._items
            .map(product => product.price)
            .reduce((acc, value) => acc + value)
    }

}