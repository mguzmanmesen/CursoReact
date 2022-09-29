import React from 'react';


export const Homework2 = () => { 
    const [items, setItems] = React.useState(
        [
            {
                userId: -1,
                id: 'loading',
                title: 'loading',
                completed: true
                
            }
        ]
    );

    const [users, setUsers] = React.useState(
        [
            {
                id: -1,
                name: 'loading user'
            }
        ]
    );

    const [photos, setPhotos] = React.useState(
        [
            {
                albumId: -1,
                id: -1,
                title: 'loading user',
                url: 'loading user'
            }
        ]
    );

    const [albums, setAlbums] = React.useState(
        [
            {
                userId: -1,
                id: -1,
                title: 'loading user'
            }
        ]
    );

    async function getData() {
        try {
            const [all, allusers, allPhotos, allAlbums] = await Promise.all([
                fetch("https://jsonplaceholder.typicode.com/posts"),
                fetch("https://jsonplaceholder.typicode.com/users"),
                fetch("https://jsonplaceholder.typicode.com/photos"),
                fetch("https://jsonplaceholder.typicode.com/albums"),
            ]);
    
            const [allData, usersData, photos, albums] = await Promise.all([
                all.json(),
                allusers.json(),
                allPhotos.json(),
                allAlbums.json(),
            ]);
    
            setItems(allData);
            setUsers(usersData);
            setAlbums(albums);
            setPhotos(photos);

            console.log(albums);
            console.log(photos);

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

    
    const getphoto = (id) => {
        let album = albums.find((album) => album.userId === id);
        let photo = photos.find((photo) => photo.albumId === album.id);
        
        return <p>{ album.title}<img src={photo.url} alt={photo.title} height="40" width="40"/></p>;
      };

    return (
        <ul>
            {users.map((user, i) => (
                <li>
                    key = {user.id}
                    {getphoto(user.id)}
                    <p>{user.name}</p>
                </li>

            )
            )}
        </ul>
    )
}
