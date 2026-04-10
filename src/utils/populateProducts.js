import { db } from "../firebase/config.js";
import { collection, addDoc } from "firebase/firestore";

const shirts = [
  {
    name: "Urban Classic Tee",
    description: "Camiseta básica com design urbano minimalista",
    price: 49.99,
    category: "Basic",
    image: "https://via.placeholder.com/300x400?text=Urban+Classic",
    stock: 50,
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },
  {
    name: "Street Art Hoodie",
    description: "Moletom com arte de rua exclusiva",
    price: 89.99,
    category: "Hoodie",
    image: "https://via.placeholder.com/300x400?text=Street+Art",
    stock: 30,
    sizes: ["M", "L", "XL"],
    featured: false,
  },
  {
    name: "Graffiti Tee",
    description: "Camiseta com design graffiti autêntico",
    price: 59.99,
    category: "Graphic",
    image: "https://via.placeholder.com/300x400?text=Graffiti",
    stock: 40,
    sizes: ["S", "M", "L"],
    featured: true,
  },
  {
    name: "Minimal Black Tee",
    description: "Camiseta preta minimalista para o dia a dia",
    price: 39.99,
    category: "Basic",
    image: "https://via.placeholder.com/300x400?text=Minimal+Black",
    stock: 60,
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: false,
  },
];

export async function populateProducts() {
  try {
    for (const shirt of shirts) {
      await addDoc(collection(db, "shirts"), shirt);
    }
    console.log("Produtos populados com sucesso!");
  } catch (error) {
    console.error("Erro ao popular produtos:", error);
  }
}
