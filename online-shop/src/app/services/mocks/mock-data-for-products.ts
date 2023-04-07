import { Product } from 'src/product';

export function getAllMockProducts(): Product[] {
    return [getMockProduct(1), getMockProduct(2)];
}

export function getMockProduct(id = 1): Product {
    return {
        id,
        name: 'Logitech mouse',
        description: 'Logitech wireless mouse',
        price: 350,
        weight: 100.0,
        imgUrl: 'www.logitech.com',
        supplier: {
            id: 1,
            name: 'eMag'
        },
        productCategory: {
            id: 2,
            name: 'Electronics',
            description: 'This category is about electronics.'
        }
    };
}
