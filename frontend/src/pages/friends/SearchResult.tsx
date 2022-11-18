import "./SearchResult.css"

interface Props {
    username: string,
    fullName: string
}

const SearchResult: React.FC<Props> = ({username, fullName}) => {
    return(
        <>
            <p>{fullName}</p>
            <p style={{fontWeight: 'normal' }}><b>{username}</b> </p>
            <button className="button">+</button>
            
        </>
    )
}

export default SearchResult;