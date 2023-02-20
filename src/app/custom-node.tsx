import {Item} from '../../models/item.model';
import {Handle, Position} from 'reactflow';
import classNames from 'classnames';
import {ItemImportance} from '../../enums/item-importance.enum';
import React, {useState} from 'react';
import NodeDetails from '@/app/node-details';
import {Dialog} from '@headlessui/react';

const CustomNode = ({data}: {data: Item, isConnectable: any}) => {
    const [displayData, setDisplayData] = useState<boolean>(false);
    const wrapper = classNames('px-4 py-2 shadow-md rounded-md border border-slate-400 relative', {
        'bg-red-500 text-white': data.importance === ItemImportance.MustKnow,
        'bg-orange-500 text-white': data.importance === ItemImportance.BetterToKnow,
        'bg-sky-500 text-white': data.importance === ItemImportance.Suggested
    }
)
    const display = () => {
        setDisplayData((value) => !value);
    }

    return <div className={wrapper}>
        <div className="flex group">
            <div className='flex flex-col items-center'>
                <div className="text-sm">{data.label}</div>
                <div className='hidden group-hover:block pt-2'>
                    <button className='bg-white border border-blue-500 text-blue-400 px-4 py-1 rounded-md text-xs' onClick={() => display()}>Display</button>
                </div>
            </div>
            {displayData &&  <Dialog
                open={displayData}
                onClose={setDisplayData}
                className="relative z-50"
                >
                <div className="fixed inset-0 bg-black/200" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <NodeDetails onComplete={() => setDisplayData(false)} shortCode={data.shortCode} />
                </div>
            </Dialog> }
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
