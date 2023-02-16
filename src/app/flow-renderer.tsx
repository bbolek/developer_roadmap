'use client';

import {useCallback, useMemo, useState} from 'react';
import ReactFlow, {addEdge, ConnectionLineType, ConnectionMode, Node, ReactFlowInstance, useEdgesState, useNodesState} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '@/app/custom-node';
import AddNode from '@/app/add-node';
import {ItemImportance} from '../../enums/item-importance.enum';
import {Connection} from '@reactflow/core/dist/esm/types/general';
import ReactJson from 'react-json-view'

const FlowRenderer = () => {
    const [isAddNodeModalOpen, setIsAddNodeModalOpen] = useState<boolean>(false);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [json, setJson] = useState({});
    const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
    const [rfInstance, setRfInstance] = useState<ReactFlowInstance<any, any> | null>(null);

    const onConnect = useCallback((params: Connection) => {
        setEdges((eds) => addEdge(params, eds));
    }, []);

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            setJson(flow);
        }
    }, [rfInstance]);

    const addNode = (label:string, importance: ItemImportance) => {
        const id = (nodes.length + 1).toString();
        const node: Node = {
            data: {label, importance: importance},
            id: id,
            position: {
                x: 0,
                y: (nodes.length + 1) * 50
            },
            type:'custom'
        }
        setNodes((nodes) => [...nodes, node]);
    }


    // @ts-ignore
    return (<div className='flex flex-row pt-6'>
            <div className='h-full w-1/3 space-y-4'>
                <button className='justify-end bg-blue-600 px-4 py-2 text-white rounded-md' onClick={onSave}>Refresh</button>
                <ReactJson src={json as any} theme='hopscotch' displayDataTypes={false} displayObjectSize={false} collapsed={2}  />
            </div>
        <div className=' flex flex-row w-full h-full justify-center space-x-4'>
            <div className='w-[1568px] h-[1200px] border'>
                <ReactFlow
                    nodes={nodes}
                    connectionMode={ConnectionMode.Loose}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes= {nodeTypes}
                    onConnect={onConnect}
                    onInit={(instance) => setRfInstance(instance)}
                    connectionLineType={ConnectionLineType.SmoothStep}
                    fitView
                />
            </div>

            <div className='flex flex-col space-y-4 pt-4'>
                <button className='bg-blue-600 px-4 py-2 text-white rounded-md' onClick={() => setIsAddNodeModalOpen(true)}>Add Node</button>
            </div>
        <AddNode onSave={(label, importance) => addNode(label, importance)} isOpen={isAddNodeModalOpen} setOpen={(value) => setIsAddNodeModalOpen(value)} />
        </div></div>
    );
};
export default FlowRenderer;
