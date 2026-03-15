type NavLink = {
  href: string
  label: string
}

export const links: NavLink[] = [
  { href: "/", label: "მთავარი" },
  { href: "/about", label: "ჩვენ შესახებ" },
  { href: "/products", label: "პროდუქტები" },
  { href: "/favorites", label: "ფავორიტები" },
  { href: "/reviews", label: "მიმოხილვა" },
  { href: "/cart", label: "კალათა" },
  { href: "/orders", label: "შეკვეთები" },
  { href: "/admin/sales", label: "მართვა" },
]

export const aboutText = `
  ჩვენ არ ვამზადებთ უბრალოდ ბურგერებს —
ჩვენ ვქმნით გემოს გამოცდილებას.

ყოველი ბურგერი მზადდება ხარისხიანი ინგრედიენტებით, იდეალურად დაბალანსებული გემოთი და დეტალებზე ზრუნვით. ჩვენი მიზანია, რომ თითოეულ სტუმარს შევთავაზოთ კრიპსი ტექსტურა, წვნიანი ხორცი და გემო, რომელიც დაგაბრუნებს ისევ და ისევ.

ეს არის ადგილი მათთვის, ვისაც ნამდვილი ბურგერი უყვარს.
გემო, რომელიც ლაპარაკობს თავად.
`

export const adminLinks: NavLink[] = [
  { href: "/admin/sales", label: "გაყიდვები" },
  { href: "/admin/products", label: "ჩემი პროდუქტები" },
  { href: "/admin/products/create", label: "პროდუქტის დამატება" },
]
