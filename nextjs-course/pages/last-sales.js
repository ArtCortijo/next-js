import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
  // props.sales -> pre-rendered sales from the server (or the build process) are the initial state
  const [sales, setSales] = useState(props.sales);
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
        <li className="sale-item" key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  // return fetch('https://nextjs-course-53e50-default-rtdb.firebaseio.com/sales.json')
  // .then(response => response.json())
  // .then(data => {
  //   const transformedSales = [];

  //   for (const key in data) {
  //     transformedSales.push({
  //       id: key, 
  //       username: data[key].username, 
  //       volume: data[key].volume
  //     });
  //   }

  //   return {
  //     props: {
  //       sales: transformedSales
  //     }, 
  //     revalidate: 60
  //   }
  // });

  // We could also use the await keyword
  const response = await fetch('https://nextjs-course-53e50-default-rtdb.firebaseio.com/sales.json');
  const data = await response.json();
  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key, 
      username: data[key].username, 
      volume: data[key].volume
    });
  }

  return {
    props: {
      sales: transformedSales
    }, 
    revalidate: 60
  }
}

export default LastSalesPage;