import { useShopCarStore } from "stores/shop-car";
import { TicketProduct } from "./ticket-product";

export const ShopCar = () => {
    const shopCarProducts = useShopCarStore((state) => state.products);

    return (
        <ul>
            {shopCarProducts.map((product) => (
                <TicketProduct key={product.id} {...product} />
            ))}
        </ul>
    )
}