import React from 'react';
import { IUser } from './models/IUser';
import { IItem } from './models/IItem';

export const Classwork1 = () => { 
    const [items, setItems] = React.useState<IItem[] | undefined>(undefined);
    const [users, setUsers] = React.useState<IUser[] | undefined>(undefined);



    async function getData() {
        try {
            const [all, allusers] = await Promise.all([
                fetch("https://jsonplaceholder.typicode.com/posts"),
                fetch("https://jsonplaceholder.typicode.com/users"),
            ]);
    
            const [allData, usersData] = await Promise.all([
                all.json(),
                allusers.json(),
            ]);
    
            setItems(allData);
            setUsers(usersData);
        }catch (error) {
            console.log(error);
        }
    }


    React.useEffect(() => {
        getData();
    }, []);


    const getusername = (id: number) => {
        return users?.find((user) => user.id === id);
      };


    return (
        <ul>
            {items &&
                items?.map((item, i) => (
                <li>
                    key = {item.id}
                    <p>{getusername(item.userId)?.name}</p>
                        <p>{item.id}</p>
                        <p>{item.userId}</p>
                    <p>{item.title}</p>
                    <input type="checkbox" id="completed" name="completed" checked={item.completed}></input>
                </li>

            )
            )}
        </ul>
    )
}
