import {ItemImportance} from '../enums/item-importance.enum';

export interface Item {
    id: string;
    label: string;
    children: Item[];
    importance: ItemImportance
}
