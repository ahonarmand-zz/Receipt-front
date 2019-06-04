import React, {Component} from 'react';  
import FormContainer from '../../components/containers/FormContainer';

class Groups extends Component { 
    render(){
        return (
            <div>
                <h1>
                    Groups
                </h1>
                <FormContainer 
                    name="create group" 
                    fields={["group_name"]} 
                    postUrl="http://localhost:5000/api/group"
                    handleResponse={
                        (data) => {
                            console.log(JSON.stringify(data))
                            if(!data.successful){
                                alert(data.message)
                            }
                    }
                    }
                />
            </div>
            
        )
    }
}

export default Groups;