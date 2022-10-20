const Rank = ({ name, entries})=>{
    return (
        <div>
            <div className="white f3">
                {`${name}, tu actual ranking es ...`}
            </div>
            <div className="white f1">
                {entries}
            </div>
        </div>
    )
}

export default Rank;