import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSale(props) {
  const [sales, setSales] = useState(props.sales);
  const [isLoading, setIsLoading] = useState(false);

  /* useEffect(() => {
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
  
  */
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://nxt-sales-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
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
    }
  }, [data]);

  if (error) {
    return <p>Error Occurred. Failed to load</p>;
  }
  if (!data || !sales) {
    return <p>Loading...</p>;
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

export async function getStaticProps() {
    
  const response = await fetch(
    "https://nxt-sales-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();
  const convertedSales = [];

  for (const key in data) {
    convertedSales.push({
      id: key,
      billNo: data[key].billno,
      product: data[key].product,
      amount: data[key].amount,
    });
  }

  return {
    props: { sales: convertedSales },
    revalidate: 10,
  };
}

export default LastSale;
