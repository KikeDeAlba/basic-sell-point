import { useShopCarStore, type Product } from "stores/shop-car";

export const TicketProduct = (product: Product) => {
    return (
        <li key={product.id}
            className="flex justify-between items-center p-4 bg-white/30 rounded-md shadow-md"
        >
            <p>{product.name}</p>
            <Counter id={product.id} quantity={product.quantity} stock={product.stock} />
        </li>
    )
}

export const Counter = ({ id, quantity, stock }: { id: number, quantity: number, stock: number }) => {
    const { addOneProduct, removeOneProduct } = useShopCarStore(state => ({
        addOneProduct: state.addOneProduct,
        removeOneProduct: state.removeOneProduct
    }))

    return (
        <div className="flex items-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => {
                    if (stock < quantity) return
                    addOneProduct(id)
                }}
            >
                +
            </button>
            <p className={`px-4 py-2 ${stock < quantity ? 'text-red-500' : ''}`}>{quantity}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => removeOneProduct(id)}
            >
                -
            </button>
        </div>
    )
}