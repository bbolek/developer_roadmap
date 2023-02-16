import {Item} from '../../models/item.model';
import {Handle, Position} from 'reactflow';
import classNames from 'classnames';
import {ItemImportance} from '../../enums/item-importance.enum';

const CustomNode = ({data}: {data: Item, isConnectable: any}) => {
    const wrapper = classNames('px-4 py-2 shadow-md rounded-md border-2 border-stone-400', {
        'bg-red-500 text-white': data.importance === ItemImportance.MustKnow,
        'bg-orange-500 text-white': data.importance === ItemImportance.BetterToKnow,
        'bg-yellow-500 text-white': data.importance === ItemImportance.Suggested
    }
)

    return <div className={wrapper}>
        <div className="flex">
            <div>
                <div className="text-sm">{data.label}</div>
            </div>
        </div>
        <Handle
            type="source"
            position={Position.Top}
            id='top'
            style={{
                border: '1px solid rgb(152,152,152)',
                backgroundColor: 'white',
            }}
        />

        <Handle
            type="source"
            position={Position.Bottom}
            id='bottom'
            style={{
                border: '1px solid rgb(152,152,152)',
                backgroundColor: 'white',
            }}
        />
        <Handle
            type="source"
            position={Position.Right}
            id='right'
            style={{
                border: '1px solid rgb(152,152,152)',
                backgroundColor: 'white',
            }}
        />
        <Handle
            type="source"
            position={Position.Left}
            id='left'
            style={{
                border: '1px solid rgb(152,152,152)',
                backgroundColor: 'white',
            }}
        />
    </div>
}

export default CustomNode;
