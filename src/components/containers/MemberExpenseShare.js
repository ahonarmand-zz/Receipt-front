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
            expense_shares: {},
            members_expenses: []
        }
        this.handleProps(this.props.members_expenses)
    }

    componentDidUpdate(prevProps) {
        console.log("****in componenetDidUpdate")
        if (this.props != prevProps){
            this.handleProps(this.props.members_expenses) 
        }

      }

    handleProps(members_expenses){
        console.log(`members_expenses: ${members_expenses}`)
        this.expense_names = this.extract_expense_names(members_expenses)
        console.log(`expense_names: ${this.expense_names}`)
        this.setState({
            expense_shares: this.get_expense_shares(members_expenses),
            members_expenses: members_expenses
        })
    }

    get_expense_shares(members){
        const m = {}
        for (const member of members){
            m[member.email] = {}
            for (const e of member.expense_shares){
                m[member.email][e.expense_name] = e.expense_share
            }
        }
        return m
    }

    extract_expense_names(members) {


        var expenses = new Set();

        for (const member of members){
            const member_expense_names = member.expense_shares.map(e => e.expense_name)
            member_expense_names.forEach(expense => expenses.add(expense))
        }
        
        return Array.from(expenses)
    }

    create_email_expense_map(members) {
        const m = {}
        for (const member of members){
            for (const e of member.expense_shares){
                m[this.create_email_expense_tuple(member.email, e.expense_name)] = e.expense_share
                console.log(`size: ${m.size}`)
            }
        }
        return m
    }

    get_member_share(email, expense_name){
        if (expense_name in this.state.expense_shares[email]){
            return this.state.expense_shares[email][expense_name]
        } else {
            return ""
        }
    }

    handle_input(email, expense_name){
        return (event) => {
            let new_share_value = event.target.value;

            const prev_shares = this.state.expense_shares
            prev_shares[email][expense_name] = new_share_value
            this.setState({expense_shares: prev_shares})
            console.log(this.state.expense_shares)
        }
    }

    render() {
        return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        {this.expense_names.map(
                            e => <th> {e} </th>
                        )}
                    </tr>
                </tbody>
                    
                {
                    <tbody>
                        {
                        this.state.members_expenses.map(member => 
                                <tr>
                                    <td>{ member.name || "" }</td>
                                    <td>{ member.email || "" }</td>
                                    {
                                        this.expense_names.map(expense_name =>
                                        <td>
                                            <Input inputType={'text'}
                                                name={[member.email, expense_name].join('-')}
                                                value={
                                                    expense_name in this.state.expense_shares[member.email] ? 
                                                    this.state.expense_shares[member.email][expense_name] : 0
                                                } 
                                                handleChange = {this.handle_input(member.email, expense_name)}
                                            />
                                        </td>)
                                    }
                                </tr>
                            
                        )}
                        <tr>
                            <td></td>
                            <td></td>
                            {this.expense_names.map(expense_name => 
                                <td>
                                    <Button 
                                        action = {() => console.log("hi")}
                                        title={"change expense ratio"}
                                    />

                                </td>
                            )}
                        </tr>
                    </tbody>
                }
                </table>
        </div>
        )
    }
}

export default MemberExpenseShare