export function fetchAllProducts() {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('http://localhost:3000/product') 
      const data = await response.json()
      resolve({data})
    }
    );
  }
  
  export function fetchAllCategories() {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('http://localhost:3000/category')
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function fetchAllBrands() {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('http://localhost:3000/brand') 
      const data = await response.json()
      resolve({data})
    }
    );
  }  

  export function fetchProductById(id) {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('http://localhost:3000/product/'+id) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function createProduct(product) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/product', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  

  export function fetchProductsByFilters(filter,sort,Pagination) {
    // filter = {"category":"smartphone"}
    //posts?_page=1&_per_page=25
    // TODO : on server we will support multi values
    // TODO : server will filter deleted products in case of user
    let queryString = '';
    for(let key in filter){
      const categoryValues = filter[key];
      if(categoryValues.length){
        const lastCategoryValue = categoryValues[categoryValues.length-1]
        queryString += `${key}=${lastCategoryValue}&`
      }
    }
    for(let key in sort){
      queryString += `${key}=${sort[key]}&`
    }
    for(let key in Pagination){
      queryString += `${key}=${Pagination[key]}&`
    }
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/product?' + queryString);
      //TODO : check pagination error
      const totalItemsHeader = response.headers.get('X-Total-Count');

      let totalItems = 0;
      if (totalItemsHeader) {
        totalItems = parseInt(totalItemsHeader, 10);
      }
    
      const data = await response.json();
      // console.log({ data: { products: data, totalItems } });
      resolve({ data: { products: data, totalItems } });
    });
  }

  
export function UpdateProduct(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/product/'+update.id,{
      method:"PATCH",
      //we convert the data to json format
      body: JSON.stringify(update),
      //It will understand that what type of data is expected
      headers:{'content-type':'application/json'},
    }) 
    const data = await response.json()
    resolve({data})
  }
  );
}