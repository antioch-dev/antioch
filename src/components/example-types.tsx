import { useState } from "react"

type ProductType = {
  id: number
  name: string
  price: number
}
const products: ProductType[] = [
  { id: 1, name: "Product 1", price: 12 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
]

export function Page() {
  const [items, setItems] = useState<ProductType[]>(products)
  function addItem() {
    setItems([...items, { id: items.length + 1, name: `Product ${items.length + 1}`, price: (items.length + 1) * 10 }])
  }
  return (
    <div>
      Some Items
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
        <button onClick={addItem}>Add Item</button>
      </ul>
    </div>
  )
}
