'use client';
import FlowRenderer from '@/app/flow-renderer';
import { ReactFlowProvider } from 'reactflow';

export default function Home() {
  return (
    <main className='w-full h-full'>
        <ReactFlowProvider>
            <FlowRenderer/>
        </ReactFlowProvider>
    </main>
  )
}
