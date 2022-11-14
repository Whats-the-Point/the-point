const CompleteProfile: React.FC = () => {

    return (
        <div>
            <form >
                <label className="">Username</label>
                <input type="text" name="username" className="mb-2 px-2 py-1"/>
                <label className="text-white">Name</label>
                <input type="text" name="name" className="mb-2 px-2 py-1"/>
                <button type="button" className="">Save</button>
            </form>
        </div>
    );
}

export default CompleteProfile;