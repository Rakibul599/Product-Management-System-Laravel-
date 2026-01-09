import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';


import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';


interface Product{
    id:number,
    name:string,
    price:number,
    description:string
}
interface Props{
    product:Product,
}

export default function Edit({product}:Props) {
    const { data, setData, put, errors } = useForm({
        name:product.name,
        price:product.price,
        description:product.description
    })
    const handleUpdate=(e:React.FormEvent)=>{
        e.preventDefault();
        console.log(data);
        put(route('product.update', { product: product.id })); // Pass the parameter as an object
    }
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Edit a Product',
            href: `/product/${product.id}/edit`,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product" />
            <div className="p-4 ">
                <form className='space-y-3' onSubmit={handleUpdate}>
                    <div className="flex w-2xl flex-col gap-1.5">
                        <label htmlFor="product name">Name</label>
                        <input
                            type="text"
                            placeholder="product name"
                            className="rounded-md p-2 border border-black"
                            value={data.name}
                            onChange={(e)=>{setData('name',e.target.value)}}
                        />
                    </div>
                    <div className="flex w-2xl flex-col gap-1.5">
                        <label htmlFor="product Price">Price</label>
                        <input
                            type="text"
                            placeholder="product name"
                            className="rounded-md p-2 border border-black"
                            value={data.price}
                            onChange={(e)=>{setData('price',e.target.value)}}
                        />
                    </div>
                    <div className="flex w-2xl flex-col gap-1.5">
                        <label htmlFor="product Description">Description</label>
                        <textarea
                            name="Description"
                            id=""
                            placeholder="Description"
                            className="rounded-md p-2 border border-black"
                            value={data.description}
                            onChange={(e)=>{setData('description',e.target.value)}}
                        ></textarea>
                    </div> 
                    {Object.keys(errors).length > 0 && (
                        <div className='text-red-500'>
                            
                            <ul>
                                {Object.entries(errors).map(([index, message]) => (
                                    <li key={index}>{message}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className='mt-3'>
                    <Button type='submit'>Update Product</Button>
                    </div>
                    
                </form>
            </div>
        </AppLayout>
    );
}
