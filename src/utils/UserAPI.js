export function fetchLoggedInUserOrders() {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/order/own/') 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function UpdateUserProfile(user) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/user/'+user.id,{
        method:"PATCH",
        //we convert the data to json format
        body: JSON.stringify(user),
        //It will understand that what type of data is expected
        headers:{'content-type':'application/json'},
      }) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function fetchLoggedInUser() {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/user/own') 
      const data = await response.json()
      resolve({data})
    }
    );
  }