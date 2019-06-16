import React, {Component} from 'react';  
import Input from '../components/Input'; 
import Button from '../components/Button';

class MemberExpenseShare extends Component { 
    constructor(props) {
        super(props)
        // this.members_expenses = [
        //         {email: "a@b.com", name: "Ali", expense_shares:[{expense_name: "a", expense_share: 10}, {expense_name: "b", expense_share: 20}] },
        //         {email: "c@d.com", name: "Cristian", expense_shares:[{expense_name: "a", expense_share: 80}, {expense_name: "b", expense_share: 30}] }
        //     ]
        this.state = {
            expense_shares: {}
        }
        this.handleProps(this.props.members_expenses)
    }

    componentDidUpdate(prevProps) {
        if (this.props != prevProps){
            this.handleProps(this.props.members_expenses) 
        }
      }

    handleProps(members_expenses){
        this.setState({
            expense_shares: this.get_expense_shares(members_expenses)
        })
    }

    get_expense_shares(members){
        const m = {}
        for (const member of members){
            m[member.email] = {}
            m[member.email].name = member.name
            m[member.email].shares = {}
            for (const e of member.expense_shares){
                m[member.email].shares[e.expense_name] = e.expense_share
            }
        }
        return m
    }

    handle_input(email, expense_name){
        return (event) => {
            let new_share_value = (event.target.value*100).toString();

            const prev_shares = this.state.expense_shares
            prev_shares[email].shares[expense_name] = new_share_value
            this.setState({expense_shares: prev_shares})
        }
    }

    get_expense_names(){
        const email1 = Object.keys(this.state.expense_shares)[0]
        if (!email1){
            return []
        }
        return Object.keys(this.state.expense_shares[email1].shares)
    }

    post_new_ratios(){

    }

    table_header(){
        return (
            <tr>
                <th>name</th>
                <th>email</th>
                {this.get_expense_names().map(
                    e => <th> {e} </th>
                )}
            </tr>
        )
    }

    table_content(){
        const expense_shares = this.state.expense_shares
        return Object.keys(expense_shares).map( email => {
            const name = expense_shares[email].name
            const shares = expense_shares[email].shares
            return (
                <tr>
                    <td>{ name || "" }</td>
                    <td>{ email || "" }</td>

                    {Object.keys(shares).map(expense_name =>
                            <td>
                                <Input inputType={'text'}
                                    name={[email, expense_name].join('-')} 
                                    value={parseFloat(this.state.expense_shares[email].shares[expense_name])/100}
                                    handleChange = {this.handle_input(email, expense_name)}
                                />
                            </td>
                    )}

                </tr>
            )
        }
        )                                
    }

    table_buttons(){
        return (
            <tr>
                <td></td>
                <td></td>
                {this.get_expense_names().map(expense_name => 
                    <td>
                        <Button 
                            action = {() => console.log("hi")}
                            title={"change expense ratio"}
                        />
                    </td>
                )}
            </tr>
        )
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        {this.table_header()}
                        {this.table_content()}
                        {this.table_buttons()}
                    </tbody>

                </table>
            </div>
        )
    }
}

export default MemberExpenseShare