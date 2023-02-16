import React from 'react';

export interface NodeDetailsProps {
    shortCode: string
}

const NodeDetails = React.forwardRef<HTMLDivElement, NodeDetailsProps>((props: NodeDetailsProps, forwardedRef) => {
    return <div ref={forwardedRef} className='border border-gray-400 w-[32rem] pt-4 pb-16 top-96 bg-white justify-left text-slate-900 px-4 overflow-auto rounded-xl drop-shadow-lg'>
        <h3 className='w-full text-2xl sm:text-2xl font-bold'>Resources you can use</h3>
         <p className='text-slate-600'>You can find the resources below:</p>
        <div className='pl-4'>
            <ol className="list-decimal text-sm underline">
                <li><a href='https://www.vox.com/2014/6/16/18076282/the-internet' rel='noopener noreferrer' target='_blank'>The Internet Explained</a></li>
                <li><a href='http://web.stanford.edu/class/msande91si/www-spr04/readings/week1/InternetWhitepaper.htm' rel='noopener noreferrer' target='_blank'>How Does the Internet Work?</a></li>
                <li><a href='https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work' rel='noopener noreferrer' target='_blank'>How Does the Internet Work? MDN Docs</a></li>
                <li><a href='https://roadmap.sh/guides/what-is-internet' rel='noopener noreferrer' target='_blank'>Introduction to Internet</a></li>
            </ol>
        </div>
        <div className='divide-y'>

        </div>
        <div className='pt-4 text-sm text-slate-500'>
            You can get more information from here...
        </div>
    </div>
});

NodeDetails.displayName = "NodeDetails";
export default NodeDetails;
