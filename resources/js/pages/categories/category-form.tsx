import { Category } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from 'sonner';
import { Dialog, DialogHeader, DialogTitle, DialogContent } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import InputError from "@/components/input-error";


interface Props {
    category: Category | null;
    onClose: () => void;
}


export default function CategoryForm({ category, onClose } : Props ) {
    const {data, setData, post, put, processing, errors, reset} = useForm({
        name: category?.name ?? '',
        description: category?.description ?? '',
    });

    
    function submit(e: FormEvent){
        e.preventDefault();
        const opts = {
            forceFormData: true, // to submit data in multipart instead of JSON
            onSuccess: () => {
                toast.success(category ? 'Category updated' : 'Category created');
                reset();
                onClose();
            }
        };
        category ? put(`/category/${category.id}`, opts) : post('/category', opts);
    }

    return (
        <Dialog open onOpenChange={onClose}>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>{category ? 'Edit Category' : 'Create Category'}</DialogTitle>
                        </DialogHeader>
        
                        <form onSubmit={submit} className="space-y-4 ">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                <InputError message={errors.name} />
                            </div>
        
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                <InputError message={errors.description} />
                            </div>
        
                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : category ? 'Update' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>    
                </Dialog>
    );
}