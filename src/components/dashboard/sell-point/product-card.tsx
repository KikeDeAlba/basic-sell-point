import type { products } from "db/schema";
import { useShopCarStore } from "stores/shop-car";



const priceFormmater = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
});

export const ProductCard = (product: typeof products.$inferSelect) => {
    const { description, name, price, stock } = product;

    const formattedPrice = priceFormmater.format(price);
    const { addProduct, currentProducts } = useShopCarStore((state) => ({
        addProduct: state.addProduct,
        currentProducts: state.products,
    }))

    return (
        <form className="bg-white/30 p-4 rounded-md shadow-md h-fit"
            onSubmit={(e) => {
                e.preventDefault();

                const data = new FormData(e.currentTarget);

                const newProduct = {
                    ...product,
                    quantity: Number(data.get("quantity"))
                };

                addProduct(newProduct)
            }}
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{name}</h2>
                <span className="text-lg font-semibold">{formattedPrice}</span>
            </div>
            <p className="text-sm text-white/80">{description}</p>
            <p className="text-sm text-white/80">Stock: {stock}</p>
            <div className="flex justify-between items-center mt-4">
                <input
                    type="number"
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                    placeholder="Quantity"
                    name="quantity"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Add to cart
                </button>
            </div>
        </form>
    );
}

