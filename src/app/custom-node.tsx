import {Item} from '../../models/item.model';
import {Handle, Position} from 'reactflow';
import classNames from 'classnames';
import {ItemImportance} from '../../enums/item-importance.enum';

const CustomNode = ({data}: {data: Item}) => {
    const wrapper = classNames('px-4 py-2 shadow-md rounded-md border-2 border-stone-400', {
        'bg-red-500 text-white': data.importance === ItemImportance.MustKnow,
        'bg-orange-500 text-white': data.importance === ItemImportance.BetterToKnow,
        'bg-yellow-500 text-white': data.importance === ItemImportance.Suggested
    }
)

    return <div className={wrapper}>
        <div className="flex">
            <div className="ml-2">
                <div className="text-sm">{data.label}</div>
            </div>
        </div>
        <Handle type="target" position={Position.Top} className="" />
        <Handle type="source" position={Position.Bottom} className="" />
    </div>
}

export default CustomNode;
