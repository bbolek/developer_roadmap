import {Dialog} from '@headlessui/react';
import classNames from 'classnames';
import {ItemImportance} from '../../enums/item-importance.enum';
import {FormEvent, useState} from 'react';

export interface AddNodeProps {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    onSave: (label: string, importance: ItemImportance) => void;
}

const AddNode = ({isOpen, setOpen, onSave} : AddNodeProps) => {
    const [label, setLabel] = useState<string>('');
    const [importance, setImportance] = useState<ItemImportance>(ItemImportance.Suggested);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(label, importance);
        setLabel('');
        setImportance(ItemImportance.Suggested);
        setOpen(false);
    }

    const onClose= () => {
        setLabel('');
        setImportance(ItemImportance.Suggested);
        setOpen(false);
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            as="div"
            className={classNames(
                "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
            )}
        >
            <div className="flex flex-col bg-gray-100 text-gray-700 border w-96 py-8 px-4 text-center">
                <Dialog.Overlay />

                <Dialog.Title className="text-blue-500 text-3xl pb-6">
                    Create new node
                </Dialog.Title>
                    <form className="space-y-8" onSubmit={(e) => onSubmit(e)}>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4sm:pt-5">
                            <label htmlFor="label" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Label
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    type="text"
                                    name="label"
                                    value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                    id="label"
                                    className="px-4 py-2 block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="importance" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Importance
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select
                                    id="importance"
                                    value={importance}
                                    onChange={(e) => setImportance(+e.target.value)}
                                    name="importance"
                                    className="px-4 py-2 block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                >
                                    <option value={ItemImportance.Suggested}>Suggested</option>
                                    <option value={ItemImportance.BetterToKnow}>Better to know</option>
                                    <option value={ItemImportance.MustKnow}>Must know</option>
                                </select>
                            </div>
                        </div>
                        <div className='w-full flex flex-col space-y-2'>

                            <button
                                type='submit'
                                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Save
                            </button>
                        <button
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => onClose()}
                        >
                            Cancel
                        </button>
                        </div>
                    </form>
            </div>
        </Dialog>
    )
}

export default AddNode;
