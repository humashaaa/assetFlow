import useAuth from "../Hooks/useAuth";

const Profile = () => {
    const {user} = useAuth()
    return (
        <div>
            <h1 className="text-center font-bold text-3xl">Profile of {user}</h1>
        </div>
    );
};

export default Profile;