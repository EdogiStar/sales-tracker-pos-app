import { Head, router } from '@inertiajs/react';
import { Category } from "@/types";
import { useState } from "react";
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge, Pencil, Plus, Trash2 } from 'lucide-react';
import CategoryForm from './category-form';


interface Props {
    categories: Category[];
};

export default function CategoryIndex({ categories }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Category | null>(null);

    function handleEdit(category: Category){
        setEditing(category)
        setShowForm(true);
    }

    function handleDelete(category: Category){
        if(!confirm(`Delete "${category.name}"?`)) return;
        router.delete(`/categories/${category.id}`, {
            onSuccess: () => toast.success('Category deleted'),
        });  
    }

    function handleClose(){
        setShowForm(false);
        setEditing(null);
    }

    return (
                <>
                    <Head title="Categories" />
                    <div className='p-4'>
                        <div className='mb-4 flex items-center justify-between'>
                            <h1 className='text-2xl font-bold'>Categories</h1>
                            <Button onClick={() => { setEditing(null); setShowForm(true); }}>
                                <Plus className='mr-2 h-4 w-4' />
                                Add Category
                            </Button>
                        </div>
                        <div className='rounded-lg border'>
                            <table className='w-full text-sm'>
                                <thead className='border-b bg-muted/50'>
                                    <tr>
                                        <th className='px-4 py-3 text-left'>Name</th>
                                        <th className='px-4 py-3 text-left'>Description</th>
                                        <th className='px-4 py-3 text-right'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className='px-4 py-8 text-center text-muted-foreground'>
                                                No categories yet. Click "Add Category" to get started!
                                            </td>
                                        </tr>
                                    )}
                                    {categories.map((category) => (
                                        <tr key={category.id} className='border-b last-border-0 bg-muted/25'>
                                            <td className='px-4 py-3 font-medium'>{category.name}</td>
                                            <td className='px-4 py-3 text-right'>${category.description}</td>
                                            <td className='px-4 py-3 text-right'>
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                                                    <Pencil className='h-4 w-4' />
                                                </Button>
                                                <Button variant="outline" size="sm" className="ml-2" onClick={() => handleDelete(category)}>
                                                    <Trash2 className='h-4 w-4 text-destructive' />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}   
                                </tbody>  
                            </table>
                        </div>
                    </div>
                    {
                        showForm && (
                            <CategoryForm category={editing} onClose={handleClose} /> 
                        )
                    }
                </>
    );

}

CategoryIndex.layout = {
    breadcrumbs:[
        { 
            title: 'Categories', 
            href: '/categories' 
        }
    ],
};