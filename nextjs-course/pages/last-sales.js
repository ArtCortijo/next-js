import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
  const [sales, setSales] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     'https://nextjs-course-53e50-default-rtdb.firebaseio.com/sales.json'
  //     ).then(response => response.json())
  //     .then(data => {
  //       const transformedSales = [];
  //       for (const key in data) {
  //         transformedSales.push({id: key, username: data[key].username, volume: data[key].volume});
  //       }
  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return (
  //     <p>Loading...</p>
  //   )
  // }

  // if (!sales) {
  //   return (
  //     <p>No data yet</p>
  //   )
  // }

  // Data fetching on the client side
  // Another way to fetch the data is with the react hook SWR
  // SWR (stale-while-revalidate) is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    'https://nextjs-course-53e50-default-rtdb.firebaseio.com/sales.json', 
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key, 
          username: data[key].username, 
          volume: data[key].volume
        });
      }

      setSales(transformedSales);
    }
  }, [data]);
  
  if (error) return <div>failed to load</div>
  if (!data || !sales) return <div>loading...</div>

  return (
    <ul>
      {sales.map(sale => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  )
}

export default LastSalesPage;