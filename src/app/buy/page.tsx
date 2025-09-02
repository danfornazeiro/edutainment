"use client";

import Card from "./components/card";

const ShopPage = () => {
  const products = [
    {
      title: "Tênis Esportivo",
      description: "Tênis confortável para corrida e caminhada.",
      price: "R$ 299,90",
      image:
        "https://cdn.pixabay.com/photo/2016/03/27/19/47/sport-shoes-1284433_960_720.jpg",
    },
    {
      title: "Fones de Ouvido",
      description: "Fones com cancelamento de ruído e ótima bateria.",
      price: "R$ 499,90",
      image:
        "https://cdn.pixabay.com/photo/2016/11/29/03/48/headphones-1868018_960_720.jpg",
    },
  ];

  const handleBuy = (title: string) => {
    alert(`Comprou ${title}`);
  };

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <Card
          key={index}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
          onBuy={() => handleBuy(product.title)}
        />
      ))}
    </div>
  );
};

export default ShopPage;
