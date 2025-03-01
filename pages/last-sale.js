import { useEffect, useState } from "react";

function LastSale() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://nxt-sales-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        const convertedSales = [];
        for (const key in data) {
          convertedSales.push({
            id: key,
            billNo: data[key].billno,
            product: data[key].product,
            amount: data[key].amount,
          });
        }
        setSales(convertedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!sales) {
    return <p>No transactions...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.product}- ${sale.amount}
        </li>
      ))}
    </ul>
  );
}
export default LastSale;
