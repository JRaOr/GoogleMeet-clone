export default function RoomComponent( { room, participants } ) {
    if(participants.length === 0) return null;
    return(
        <div>
            {participants.map(participant => {
                return(
                    <div key={participant.sid}>
                        {participant.identity}
                    </div>
                )
            })}
        </div>
    )
}