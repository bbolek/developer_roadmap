import {Item} from '../../models/item.model';
import {Handle, Position} from 'reactflow';
import classNames from 'classnames';
import {ItemImportance} from '../../enums/item-importance.enum';
import React, {Fragment, useState} from 'react';
import NodeDetails from '@/app/node-details';
import OutsideClickHandler from 'react-outside-click-handler';
import Draggable from 'react-draggable';
import {Dialog, Transition} from '@headlessui/react';

const CustomNode = ({data}: {data: Item, isConnectable: any}) => {
    const [displayData, setDisplayData] = useState<boolean>(false);
    const wrapper = classNames('px-4 py-2 shadow-md rounded-md border-2 border-stone-400 relative', {
        'bg-red-500 text-white': data.importance === ItemImportance.MustKnow,
        'bg-orange-500 text-white': data.importance === ItemImportance.BetterToKnow,
        'bg-yellow-500 text-white': data.importance === ItemImportance.Suggested
    }
)
    const display = () => {
        setDisplayData((value) => !value);
    }

    return <div className={wrapper} onClick={() => display()}>
        <div className="flex">
            <div>
                <div className="text-sm">{data.label}</div>
            </div>
            {displayData &&  <Transition
                show={displayData}
                as={Fragment}
            ><Dialog
                open={displayData}
                onClose={() => setDisplayData(false)}
                className="relative z-50"
                >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-black/50 blur-lg" aria-hidden="true" />
                </Transition.Child>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                    <NodeDetails shortCode={data.shortCode} />
                    </Transition.Child>
                </div>
            </Dialog>
            </Transition>




                }
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
