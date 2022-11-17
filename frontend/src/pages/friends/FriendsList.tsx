import { useGetFriendsQuery } from "../../middleware/context/friendsSlice";
import { UserInfo } from '../../@types/user'

const FriendsList = () => {
    const {
        data: data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetFriendsQuery(null)

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        let friends = data.data.friends
        content = friends.length !== 0 ? (
            <section className="friends">
                <h1>Friends List</h1>
                {friends.map((friend, i) => {
                    return (<div key={friend.short_slug}>
                        <p>{i}.</p>
                        <p>{friend.first_name} {friend.last_name}</p>
                        <p><b>Email:</b> {friend.email}</p>
                        <p><b>Username:</b> {friend.username}</p>
                        <p><b>ID:</b> {friend.short_slug}</p>
                    </div>
                    )
                })}
            </section>
        ) : (<p>Not Found any Friends! Add some.</p>)
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content
}
export default FriendsList