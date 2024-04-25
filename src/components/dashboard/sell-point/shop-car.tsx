import { useShopCarStore } from "stores/shop-car";
import { TicketProduct } from "./ticket-product";

export const ShopCar = () => {
    const shopCarProducts = useShopCarStore((state) => state.products);

    return (
        <section className="flex-1 h-full flex flex-col justify-between">
            <ul className="flex flex-col gap-2">
                {shopCarProducts.map((product) => (
                    <TicketProduct key={product.id} {...product} />
                ))}
            </ul>

            <div className="flex">
                <p className="text-white/80">Total: {
                    shopCarProducts.reduce((acc, { price, quantity }) => acc + price * quantity, 0)
                }</p>

                <button className="w-full p-4 bg-blue-500 text-white rounded-md">
                    Checkout
                </button>
            </div>
        </section>
    )
}