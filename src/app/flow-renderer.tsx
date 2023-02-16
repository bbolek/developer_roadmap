'use client';

import React, {useCallback, useMemo, useState} from 'react';
import ReactFlow, {addEdge, ConnectionLineType, ConnectionMode, Node, ReactFlowInstance, useEdgesState, useNodesState} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '@/app/custom-node';
import AddNode from '@/app/add-node';
import {Connection} from '@reactflow/core/dist/esm/types/general';
import ReactJson from 'react-json-view'
import {Item} from '../../models/item.model';
import Draggable from 'react-draggable';

const FlowRenderer = () => {
    const [isAddNodeModalOpen, setIsAddNodeModalOpen] = useState<boolean>(false);
    const [selectedNode, setSelectedNode] = useState<Item |  null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [json, setJson] = useState({});

    const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
    const [rfInstance, setRfInstance] = useState<ReactFlowInstance<any, any> | null>(null);

    const onConnect = useCallback((params: Connection) => {
        setEdges((eds) => addEdge(params, eds));
    }, [setEdges]);

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            setJson(flow);
        }
    }, [rfInstance]);

    const upsertNode = (item: Item) => {
        const isNew = !item.id;
        const id = item.id ?? (nodes.length + 1).toString();
        let currrentNode = null;
        if (!isNew) {
            currrentNode = nodes.find(a => a.data.id === id);
        }
        const node: Node = {
            data: {
                ...item,
                id: id
            },
            id: id,
            position: !!currrentNode ? currrentNode.position : {
                x: nodes && nodes.length > 0 ? (nodes[nodes.length -1].position.x) : 0,
                y: nodes && nodes.length > 0 ? (nodes[nodes.length -1].position.y + 50) : 0
            },
            type:'custom'
        }
        let newNodes = nodes.filter(a => a.data.id !== id);
        setNodes([...newNodes, node]);
        setSelectedNode(null);
    }

    const editNode = (node: Node) => {
        setSelectedNode(node.data);
        setIsAddNodeModalOpen(true);
    }

    const onDelete = (id : string) => {
        let newNodes = nodes.filter(a => a.id !== id);
        let newEdges = edges.filter(a => a.source !== id && a.target !== id);
        setNodes([...newNodes]);
        setEdges(newEdges);
        setSelectedNode(null);
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
                    onNodeDoubleClick={(_, node) => editNode(node)}
                    connectionLineType={ConnectionLineType.SmoothStep}
                    fitView
                />
            </div>

            <div className='flex flex-col space-y-4 pt-4'>
                <button className='bg-blue-600 px-4 py-2 text-white rounded-md' onClick={() => setIsAddNodeModalOpen(true)}>Add Node</button>
            </div>
            {isAddNodeModalOpen && <AddNode
                        onSave={(item) => upsertNode(item)}
                        isOpen={isAddNodeModalOpen}
                        onDelete={(id) => onDelete(id)}
                        setOpen={(value) => setIsAddNodeModalOpen(value)} item={selectedNode}/>}
        </div></div>
    );
};
export default FlowRenderer;
