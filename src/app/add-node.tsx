import {Dialog} from '@headlessui/react';
import classNames from 'classnames';
import {ItemImportance} from '../../enums/item-importance.enum';
import {useForm} from 'react-hook-form';
import {Item} from '../../models/item.model';
import React from 'react';
import Draggable from 'react-draggable';

export interface AddNodeProps {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    onSave: (item: Item) => void;
    item: Item | null;
    onDelete: (id: string) => void;
}

const AddNode = ({isOpen, setOpen, onSave, item, onDelete} : AddNodeProps) => {
    const { register, handleSubmit, reset } = useForm<Item>({
        defaultValues: {
            label: item?.label,
            importance: item?.importance,
            id: item?.id,
            shortCode: item?.shortCode
        }
    });
    const onSubmit = (values: any) => {
        onSave({
            ...values,
            importance: Number.parseInt(values.importance)
        })
        reset();
        setOpen(false);
    }

    const onClose= () => {
        reset();
        setOpen(false);
    }

    const deleteItem = (id: string) => {
        onDelete(id);
        setOpen(false);
    }

    return (<Dialog
            open={isOpen}
            onClose={onClose}
            as="div"
            className={classNames(
                "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
            )}
        ><Draggable>
            <div className="flex flex-col bg-gray-100 text-gray-700 border w-96 py-8 px-4 text-center rounded-xl border-2 border-gray-300">
                <Dialog.Overlay />
                <Dialog.Title className="text-blue-500 text-3xl pb-6">
                    Create new node
                </Dialog.Title>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col items-start w-full space-y-2">
                            <label htmlFor="label" className="block text-sm font-medium text-gray-700 sm:mt-px">
                                Label
                            </label>
                            <div className="w-full">
                                <input
                                    {...register("label")}
                                    type="text"
                                    required={true}
                                    className="px-4 py-2 block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-start w-full space-y-2">
                            <label htmlFor="shortCode" className="block text-sm font-medium text-gray-700 sm:mt-px">
                                Short Code
                            </label>
                            <div className="w-full">
                                <input
                                    {...register("shortCode")}
                                    type="text"
                                    required={true}
                                    className="py-2 px-4 block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-start w-full space-y-2">
                            <label htmlFor="importance" className="block text-sm font-medium text-gray-700 sm:mt-px">
                                Importance
                            </label>
                            <div className="w-full">
                                <select
                                    {...register("importance")}
                                    className="px-4 py-2 block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                            <button type='button'
                                className="w-full inline-flex justify-center rounded-md border border-red-600 shadow-sm py-2 bg-white text-base font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => onClose()}
                            >
                                Cancel
                            </button>

                            {!!item?.id && <div className='pt-4'><button type='button'
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => deleteItem(item?.id)}
                            >
                                Delete
                            </button></div>}
                        </div>
                    </form>
            </div>
    </Draggable>
        </Dialog>
    )
}

export default AddNode;
