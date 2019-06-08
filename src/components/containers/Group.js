import React, {Component} from 'react';  
import FormContainer from '../../components/containers/FormContainer';
import { matchPath } from 'react-router';

class Group extends Component { 
    constructor(props) {
        super(props)
        const match = matchPath(this.props.history.location.pathname, {
            path: '/group/:group_id/:group_name',
            exact: true,
            strict: false
          })
        
        this.group_id = match.params.group_id
        this.group_name = match.params.group_name
        console.log(this.group_id)
        console.log(this.group_name)
        this.state = {
            members: []
        }
    }

    componentDidMount() {
        console.log("here")
        
        this.get_members()
    }

    get_members() {
        fetch(`http://localhost:5000/api/group/${this.group_id}/members`,
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
            this.setState({members: json })
        });
        }
    })
    }

    render(){
        return (
            <div>
                <h1> {`Group: ${this.group_name}`} </h1>
                <h3>Members:</h3>
                {
                    
                    <table>
                        <tr>
                            <th>name</th>
                            <th>email</th>
                        </tr>
                    {
                        this.state.members.map(member => 
                            <tr>
                                <td>{ member.name || "" }</td>
                                <td>{ member.email || "" }</td>
                            </tr>
                        )
                    }
                    </table>
                    

                    
                }
            </div>
            
            
        )
    }
}

export default Group;