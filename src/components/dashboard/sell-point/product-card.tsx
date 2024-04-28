import type { products } from "db/schema";
import { useRef } from "react";
import { useShopCarStore } from "stores/shop-car";



export const priceFormmater = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
});

export const ProductCard = (product: typeof products.$inferSelect) => {
    const { description, name, price, stock, discount } = product;

    const formattedPrice = priceFormmater.format(price);
    const formattedDiscount = priceFormmater.format(discount);
    const addProduct = useShopCarStore((state) => state.addProduct)
    const $quantityInput = useRef<HTMLInputElement>(null)

    return (
        <form className="bg-white/30 p-4 rounded-md shadow-md h-fit"
            onSubmit={(e) => {
                e.preventDefault();

                const data = new FormData(e.currentTarget);

                const newProduct = {
                    ...product,
                    quantity: Number(data.get("quantity"))
                };

                if (newProduct.quantity > stock) {
                    alert("No hay suficiente stock")
                    return
                }

                addProduct(newProduct)

                if ($quantityInput.current != null) $quantityInput.current.value = "1"
                $quantityInput.current?.focus()
            }}
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{name}</h2>
                <span className="text-lg font-semibold">{formattedPrice}</span>
            </div>
            <p className="text-sm ">{description}</p>
            <p className="text-sm ">Stock: {stock}</p>
            <p className="text-sm ">Descuento: {formattedDiscount}</p>
            <div className="flex justify-between items-center mt-4">
                <input
                    type="number"
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                    placeholder="Quantity"
                    name="quantity"
                    defaultValue={1}
                    ref={$quantityInput}
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Add to cart
                </button>
            </div>
        </form>
    );
}

