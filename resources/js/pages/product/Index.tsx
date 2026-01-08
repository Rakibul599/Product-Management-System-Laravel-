import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js'; // Import the route function from Ziggy

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/product',
    },
];

export default function Index() {
    const { flash } = usePage<{ flash: { message: string } }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4'>
                <Link href={route('product.create')}>
                    <Button>Create a Product</Button>
                </Link>
            </div>

            <div className='m-4'>
            {flash.message && (<p>{flash.message}</p>)}
                
            </div>
        </AppLayout>
    );
}
