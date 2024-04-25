import { useShopCarStore } from "stores/shop-car";
import { TicketProduct } from "./ticket-product";
import { priceFormmater } from "./product-card";

export const ShopCar = () => {
    const shopCarProducts = useShopCarStore((state) => state.products);

    const total = shopCarProducts.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

    return (
        <section className="flex-1 h-full flex flex-col justify-between gap-2">
            <ul className="flex flex-col gap-2 flex-1 overflow-y-auto">
                {shopCarProducts.map((product) => (
                    <TicketProduct key={product.id} {...product} />
                ))}
            </ul>

            <form
                className="flex"
                onSubmit={(e) => {
                    e.preventDefault();

                    fetch("/api/sales/sell", {
                        method: "POST",
                    })
                }}
            >
                <p className="text-white/80">Total: {
                    priceFormmater.format(
                        total
                    )
                }</p>

                <button className="w-full p-4 bg-blue-500 text-white rounded-md">
                    Checkout
                </button>
            </form>
        </section>
    )
}