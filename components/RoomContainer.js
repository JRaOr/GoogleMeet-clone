export default function RoomContainer( { children }) {
    return(
        <div className="h-[100vh] w-[100vw] flex flex-col bg-[#202124] text-white">
            {children}
        </div>
    )
}       