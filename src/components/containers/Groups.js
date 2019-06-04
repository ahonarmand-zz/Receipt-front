import React, {Component} from 'react';  
import FormContainer from '../../components/containers/FormContainer';

class Groups extends Component { 
    constructor() {
        super()

        this.state = {
            current_groups: []
        }
    }

    componentDidMount() {
        console.log("here")
        fetch('http://localhost:5000/api/member/groups',
            {
                method: "GET",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
        
        .then(response => {
            if (response.ok) {
              response.json().then(json => {
                console.log(json);
                this.setState({current_groups: json.group_names })
              });
            }
          }
        )
    }


    render(){
        return (
            <div>
                <h1>
                    Current Groups
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

                {this.state.current_groups ? this.state.current_groups.map(g => <h1>{g}</h1>) : <h1>hi</h1>}
            </div>
            
        )
    }
}

export default Groups;