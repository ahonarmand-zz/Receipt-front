import React, {Component} from 'react';  

class MemberExpenseShare extends Component { 
    constructor(props) {
        super(props)
        this.members = [
                {email: "a@b.com", name: "Ali", expense_shares:[{expense_name: "a", expense_share: 10}, {expense_name: "b", expense_share: 20}] },
                {email: "c@d.com", name: "Cristian", expense_shares:[{expense_name: "a", expense_share: 80}, {expense_name: "b", expense_share: 30}] }
            ]
        this.expense_names = this.extract_expense_names(this.members)
        this.email_expense_to_share = this.create_email_expense_map(this.members)
        console.log(this.email_expense_to_share)
    }

    extract_expense_names(members) {
        var expenses = new Set();

        for (const member of members){
            const member_expense_names = member.expense_shares.map(e => e.expense_name)
            member_expense_names.forEach(expense => expenses.add(expense))
        }
        return Array.from(expenses)
    }

    create_email_expense_tuple(email, expense){
        //TODO: is there really no way to use an object as the key of a map?? :o
        return [email, expense].join('-')
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
        const key = this.create_email_expense_tuple(email, expense_name)

        if (key in this.email_expense_to_share){
            return this.email_expense_to_share[key]
        } else {
            return ""
        }
            
    }

    render() {
        return (
        <div>
            <table>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        {this.expense_names.map(
                            e => <th> {e.expense_name} </th>
                        )}
                        {/* <th>expense category</th> */}
                    </tr>
                {
                    this.members.map(member => 
                        <tr>
                            <td>{ member.name || "" }</td>
                            <td>{ member.email || "" }</td>
                            {
                                this.expense_names.map(e => <td>{this.get_member_share(member.email, e)}</td>)
                            }
                        </tr>
                    )
                }
                </table>
        </div>
        )
    }
}

export default MemberExpenseShare