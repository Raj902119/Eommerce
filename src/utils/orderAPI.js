export function CreateOrder(orderDate) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/orders',{
        method:"POST",
        //we convert the data to json format
        body: JSON.stringify(orderDate),
        //It will understand that what type of data is expected
        headers:{'content-type':'application/json'},
      }) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function updateOrder(order) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/orders/'+order.id, {
        method: 'PATCH',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    });
  }

  export function fetchAllOrders(sort,pagination) {
    let queryString ="";
    for(let key in sort){
      queryString += `${key}=${sort[key]}&`
    }

    for(let key in pagination){
      queryString += `${key}=${pagination[key]}&`
    }
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/orders?' + queryString);
      //TODO : check pagination error
      const totalItemsHeader = response.headers.get('X-Total-Count');
      let totalItems = 0;
      if (totalItemsHeader) {
        totalItems = parseInt(totalItemsHeader, 10);
      }
    
      const data = await response.json();
      resolve({ data: { orders: data, totalItems } });
    });
  }

