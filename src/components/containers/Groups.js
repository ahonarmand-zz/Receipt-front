import React, {Component} from 'react';  
import FormContainer from '../../components/containers/FormContainer';
import { Group } from '../../components/containers/Pages';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';

class Groups extends Component { 
    constructor() {
        super()

        this.state = {
            current_groups: []
        }
    }

    componentDidMount() {
        console.log("here")
        this.update_groups()
    }

    update_groups() {
        fetch('http://localhost:5000/api/member/groups',
        {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    ).then(response => {
        if (response.ok) {
        response.json().then(json => {
            console.log(json);
            this.setState({current_groups: json })
        });
        }
    })
    }


    render(){
        return (
            <div>
                <Route path={ `${this.props.match.url}/group/:group_id/:group_name` } component={ Group }/>
                
                <h1>
                    Current Groups
                </h1>

                <FormContainer 
                    name="create group" 
                    form_data={{"group_name": ''}} 
                    postUrl="http://localhost:5000/api/group"
                    handleResponse={
                        (data) => {
                            console.log(JSON.stringify(data))
                            this.update_groups()
                    }
                    }
                />

                <h2>Current Groups</h2>
                {
                    this.state.current_groups ? this.state.current_groups.map(
                    g => <h4> 
                            <Link to={`/group/${g.id}/${g.name}`} className="link">{g.name}</Link>
                        </h4>
                        ) : <h4>You are not currently part of any group</h4>
                }
            </div>
            
        )
    }
}

export default Groups;