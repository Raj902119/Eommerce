
//It returns a Promise that performs a POST request to the specified endpoint 
export function CreateUser(userData) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/users',{
        method:"POST",
        //we convert the data to json format
        body: JSON.stringify(userData),
        //It will understand that what type of data is expected
        headers:{'content-type':'application/json'},
      }) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function CheckUser(logData) {
    return new Promise(async (resolve, reject) => {
      const email = logData.email;
      const password = logData.password;
  
      try {
        const response = await fetch(`http://localhost:3000/users?email=${email}`);
        const data = await response.json();
        if (data.length) {
          if (password === data[0].password) {
            resolve({ data: data[0] });
          } else {
            reject({ message: "Wrong credentials" });
          }
        } else {
          reject({ message: "User not found" });
        }
      } catch (error) {
        reject({ message: "Error checking user" });
      }
    });
  }


  export function UpdateUser(user) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/users/'+user.id,{
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

  export function signout(userid) {
    return new Promise(async (resolve) =>{
      
      //will handle it in server
      resolve({data:'success'})
    }
    );
  }
