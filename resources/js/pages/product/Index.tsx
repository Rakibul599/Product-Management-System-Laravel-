import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js'; // Import the route function from Ziggy
import { JSX } from 'react/jsx-runtime';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/product',
    },
];
interface Product {
    map(arg0: (product: Product) => JSX.Element): import("react").ReactNode;
    length: ReactNode;
    id: number;
    name: string;
    price: number;
    description: string;
}
interface pageProps {
    flash: { message: string };
    products: Product;
}

export default function Index() {
    const { products, flash } = usePage().props as unknown as pageProps;

    const {processing,delete: destroy}=useForm();
    const handleDelete=(id:number,name:string)=>{
        // alert(`Do you want to delete this? ${name}`)
        if(confirm(`Do you want to delete a product ${id} ${name}`))
        {
        //    destroy(`/product/${id}`);
           destroy(route('product.destroy',id));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="m-4">
                <Link href={route('product.create')}>
                    <Button>Create a Product</Button>
                </Link>
            </div>

            <div className="m-4">{flash.message && <p>{flash.message}</p>}</div>

            {products.length > 0 && (
                <div className='m-4'>
                    <Table>
                        <TableCaption>
                            A list of your recent products.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    Id
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product:Product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">
                                        {product.id}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell  >{product.price}</TableCell>
                                    <TableCell>
                                        {product.description}
                                    </TableCell>
                                    <TableCell className='text-center space-x-2'>
                                        <Button className='bg-slate-600 hover:bg-slate-800'>Edit</Button>
                                       <Button disabled={processing} onClick={()=>handleDelete(product.id,product.name)} className='bg-red-500 hover:bg-red-800 *:'>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}
