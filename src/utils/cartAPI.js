export function AddItem(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/cart',{
      method:"POST",
      //we convert the data to json format
      body: JSON.stringify(item),
      //It will understand that what type of data is expected
      headers:{'content-type':'application/json'},
    }) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchAllUserItems(userinfo) {
  return new Promise(async (resolve) => {
    const email = userinfo.email;
    const response = await fetch('http://localhost:3000/cart?user.email=' + email);
    const data = await response.json();
    resolve({ data });
  });
}

export function UpdateCart(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/cart/'+update.id,{
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

export function DeleteCart(delId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/cart/'+delId,{
      method:"DELETE",
      headers:{'content-type':'application/json'},
    }) 
    const data = await response.json()
    resolve({data:{id:delId}})
  }
  );
}

export async function resetCart(userinfo) {
  try {
    const response = await fetchAllUserItems(userinfo);
    const items = await response.data;
    for (let item of items) {
      await DeleteCart(item.id);
    }

    return { status: 'success' };
  } catch (error) {
    console.error('Error resetting cart:', error);
    return { status: 'error', error: error.message };
  }
}