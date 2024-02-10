
//It returns a Promise that performs a POST request to the specified endpoint 
export function CreateUser(userData) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:3000/auth/signup',{
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

  export function loginUser(logData) {
    return new Promise(async (resolve, reject) => {

      try {
        const response = await fetch(`http://localhost:3000/auth/login`,{
        method:"POST",
        //we convert the data to json format
        body: JSON.stringify(logData),
        //It will understand that what type of data is expected
        headers:{'content-type':'application/json'},
        });
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          // Check for HTTP error status and throw an error
          const errMessage = await response.text();
        reject(new Error(errMessage));
        }
        }
      catch (error) {
        reject(new Error("Error checking user"));
      }
    });
  }

  export function signout(userid) {
    return new Promise(async (resolve) =>{
      
      //will handle it in server
      resolve({data:'success'})
    }
    );
  }

  export function checkAuth() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://localhost:3000/auth/check');
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
      // TODO: on server it will only return some info of user (not password)
    });
  }