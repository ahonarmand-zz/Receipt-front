import React, {Component} from 'react';  
import FormContainer from '../../components/containers/FormContainer';

class Login extends Component { 
    render(){
        return (
            <div>
                <h1>
                    Login
                </h1>
                <FormContainer 
                    name="login" 
                    fields={["email", "password"]} 
                    postUrl="http://localhost:5000/api/user/login" 
                    handleResponse={(data) => {
                    console.log("here");
                    console.log(JSON.stringify(data))
                    //TODO: explore the security implementations of this
                    localStorage.setItem('token', data.auth_token);
                    }
                    }
                />
            </div>
            
        )
    }
}

export default Login;