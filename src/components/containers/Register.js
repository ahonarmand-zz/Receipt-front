import React, {Component} from 'react';  
import FormContainer from '../../components/containers/FormContainer';

class Register extends Component { 
    render(){
        return (
            <div>
                <h1>Register</h1>

                <FormContainer
                    name="register"
                    fields={["name", "email", "password"]}
                    postUrl="http://localhost:5000/api/user/register"
                    handleResponse={(data) => console.log(JSON.stringify(data))}
                />
            </div>
            
        )
    }
}

export default Register;