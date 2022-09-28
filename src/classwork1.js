import React from 'react';


export const Classwork1 = () => { 
    const [items, setItems] = React.useState(
        [
            {
                userId: 123,
                id: 'loading',
                title: 'loading',
                completed: true
                
            }
        ]
    );

    const [users, setUsers] = React.useState(
        [
            {
                id: 123,
                name: 'loading user'
            }
        ]
    );



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


    const getuser = (id) => {
        return users.find((user) => user.id === id).name;
      };


    return (
        <ul>
            {items.map((item, i) => (
                <li>
                    key = {item.id}
                    <p>{getuser(item.userId)}</p>
                    <p>{item.id}</p>
                    <p>{item.title}</p>
                    <input type="checkbox" id="completed" name="completed" checked={item.completed}></input>
                </li>

            )
            )}
        </ul>
    )
}
