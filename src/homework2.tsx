import React from 'react';
import { IUser } from './models/IUser';
import { IPhoto } from './models/IPhoto';
import { IAlbum } from './models/IAlbum';


export const Homework2 = () => { 
    const [users, setUsers] = React.useState<IUser[] | undefined>(undefined);
    const [photos, setPhotos] = React.useState<IPhoto[] | undefined>(undefined);
    const [albums, setAlbums] = React.useState<IAlbum[] | undefined>(undefined);

    async function getData() {
        try {
            const [allusers, allPhotos, allAlbums] = await Promise.all([
                fetch("https://jsonplaceholder.typicode.com/users"),
                fetch("https://jsonplaceholder.typicode.com/photos"),
                fetch("https://jsonplaceholder.typicode.com/albums"),
            ]);
    
            const [usersData, photos, albums] = await Promise.all([
                allusers.json(),
                allPhotos.json(),
                allAlbums.json(),
            ]);
    
            setUsers(usersData);
            setAlbums(albums);
            setPhotos(photos);

            console.log(usersData);
            console.log(albums);
            console.log(photos);
        }catch (error) {
            console.log(error);
        }
    }


    React.useEffect(() => {
        getData();
    }, []);


    const getphoto = (id:number | undefined) => {
        let album = albums?.find((album) => album.userId === id);
        let photo = photos?.find((photo) => photo.albumId === album?.id);
        
        return <p>{ album?.title }<img src={photo?.url} alt={photo?.title} height="40" width="40"/></p>;
      };

    return (
        <ul>
            {users?.map((user, i) => (
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
